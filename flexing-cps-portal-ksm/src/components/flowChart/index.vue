<template>
  <div
    id="chart"
    :style="{
      width: isNaN(width) ? width : width + 'px',
      height: isNaN(height) ? height : height + 'px',
      cursor: cursor
    }"
    @mousemove="handleChartMouseMove"
    @mouseup="handleChartMouseUp"
    @dblclick="handleChartDblClick($event)"
    @mousewheel="handleChartMouseWheel"
    @mousedown="handleChartMouseDown($event)"
  >
    <slot name="append" />
    <svg id="svg">
      <rect
        class="selection"
        height="0"
        width="0"
      />
    </svg>
  </div>
</template>

<script>
import { line2, lineTo } from '@/components/flowChart/utils/svg'
import * as d3 from 'd3'
import {
  between,
  distanceOfPointToLine,
  getEdgeOfPoints,
  pointRectangleIntersection
} from '@/components/flowChart/utils/math'
import render from '@/components/flowChart/render'

export default {
  name: 'FlowChart',
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    connections: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: 800
    },
    height: {
      type: [String, Number],
      default: 600
    },
    readonly: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: render
    }
  },
  data () {
    return {
      internalNodes: [],
      internalConnections: [],
      connectingInfo: {
        source: null,
        sourcePosition: null
      },
      selectionInfo: null,
      currentNodes: [],
      currentConnections: [],
      /**
       * Mouse position(relative to chart div)
       */
      cursorToChartOffset: { x: 0, y: 0 },
      clickedOnce: false,
      pathClickedOnce: false,
      /**
       * lines of all internalConnections
       */
      lines: []
    }
  },
  computed: {
    hoveredConnector () {
      for (const node of this.internalNodes) {
        const connectorPosition = this.getConnectorPosition(node)
        for (const prop in connectorPosition) {
          const entry = connectorPosition[prop]
          if (
            Math.hypot(
              entry.x - this.cursorToChartOffset.x,
              entry.y - this.cursorToChartOffset.y
            ) < 10
          ) {
            return { position: prop, node: node }
          }
        }
      }
      return null
    },
    hoveredConnection () {
      for (const line of this.lines) {
        const distance = distanceOfPointToLine(
          line.sourceX,
          line.sourceY,
          line.destinationX,
          line.destinationY,
          this.cursorToChartOffset.x,
          this.cursorToChartOffset.y
        )
        if (
          distance < 5 &&
          between(
            line.sourceX - 2,
            line.destinationX + 2,
            this.cursorToChartOffset.x
          ) &&
          between(
            line.sourceY - 2,
            line.destinationY + 2,
            this.cursorToChartOffset.y
          )
        ) {
          const connections = this.internalConnections.filter(
            item => item.id === line.id
          )
          return connections.length > 0 ? connections[0] : null
        }
      }
      return null
    },
    cursor () {
      if (this.connectingInfo.source || this.hoveredConnector) {
        return 'crosshair'
      }
      if (this.hoveredConnection != null) {
        return 'pointer'
      }
      return null
    }
  },
  watch: {
    internalNodes: {
      immediate: true,
      deep: true,
      handler () {
        this.renderNodes()
        this.renderConnections()
      }
    },
    internalConnections: {
      immediate: true,
      deep: true,
      handler () {
        this.renderConnections()
      }
    },
    selectionInfo: {
      immediate: true,
      deep: true,
      handler () {
        this.renderSelection()
      }
    },
    currentNodes: {
      immediate: true,
      deep: true,
      handler () {
        this.renderNodes()
      }
    },
    currentConnections: {
      immediate: true,
      deep: true,
      handler () {
        this.renderConnections()
      }
    },
    cursorToChartOffset: {
      immediate: true,
      deep: true,
      handler () {
        if (this.selectionInfo) {
          this.renderSelection()
        }
      }
    },
    connectingInfo: {
      immediate: true,
      deep: true,
      handler () {
        this.renderConnections()
      }
    },
    nodes: {
      immediate: true,
      deep: true,
      handler () {
        this.init()
      }
    },
    connections: {
      immediate: true,
      deep: true,
      handler () {
        this.init()
      }
    }
  },
  mounted () {
    const that = this
    that.init()
    document.onkeydown = function (event) {
      switch (event.keyCode) {
      case 37:
        that.moveCurrentNode(-10, 0)
        break
      case 38:
        that.moveCurrentNode(0, -10)
        break
      case 39:
        that.moveCurrentNode(10, 0)
        break
      case 40:
        that.moveCurrentNode(0, 10)
        break
      case 27:
        that.currentNodes.splice(0, that.currentNodes.length)
        that.currentConnections.splice(0, that.currentConnections.length)
        break
      case 65:
        if (document.activeElement === document.getElementById('chart')) {
          that.currentNodes.splice(0, that.currentNodes.length)
          that.currentConnections.splice(0, that.currentConnections.length)
          that.currentNodes.push(...that.internalNodes)
          that.currentConnections.push(...that.internalConnections)
          event.preventDefault()
        }
        break
      case 46:
        that.remove()
        break
      default:
        break
      }
    }
  },
  created () {},
  methods: {
    add (node) {
      if (this.readonly) {
        return
      }
      this.internalNodes.push(node)
      this.$emit('add', node, this.internalNodes, this.internalConnections)
    },
    editCurrent () {
      if (this.currentNodes.length === 1) {
        this.editNode(this.currentNodes[0])
      } else if (this.currentConnections.length === 1) {
        this.editConnection(this.currentConnections[0])
      }
    },
    editNode (node) {
      if (this.readonly) {
        return
      }
      this.$emit('editnode', node)
    },
    editConnection (connection) {
      if (this.readonly) {
        return
      }
      this.$emit('editconnection', connection)
    },
    handleChartMouseWheel (event) {
      event.stopPropagation()
      event.preventDefault()
      if (event.ctrlKey) {
        const svg = document.getElementById('svg')
        let zoom = parseFloat(svg.style.zoom || 1)
        if (event.deltaY > 0 && zoom === 0.1) {
          return
        }
        zoom -= event.deltaY / 100 / 10
        svg.style.zoom = zoom
      }
    },
    async handleChartMouseUp () {
      if (this.connectingInfo.source) {
        if (this.hoveredConnector) {
          if (this.connectingInfo.source.id !== this.hoveredConnector.node.id) {
            // Node can't connect to itself
            const tempId = +new Date() // uuidv4()
            const conn = {
              source: {
                id: this.connectingInfo.source.id,
                position: this.connectingInfo.sourcePosition
              },
              destination: {
                id: this.hoveredConnector.node.id,
                position: this.hoveredConnector.position
              },
              id: tempId,
              type: 'HasComponent',
              name: 'HasComponent'
              // type: 'pass',
              // name: 'Pass'
            }
            this.internalConnections.push(conn)
            this.$emit(
              'connect',
              conn,
              this.internalNodes,
              this.internalConnections
            )
          }
        }
        this.connectingInfo.source = null
        this.connectingInfo.sourcePosition = null
      }
      if (this.selectionInfo) {
        this.selectionInfo = null
      }
    },
    async handleChartMouseMove (event) {
      // calc offset of cursor to chart
      const boundingClientRect = event.currentTarget.getBoundingClientRect()
      const actualX = event.pageX - boundingClientRect.left - window.scrollX
      this.cursorToChartOffset.x = Math.trunc(actualX)
      const actualY = event.pageY - boundingClientRect.top - window.scrollY
      this.cursorToChartOffset.y = Math.trunc(actualY)
      if (this.connectingInfo.source) {
        await this.renderConnections()
        d3.selectAll('#svg .connector').classed('active', true)
        const sourceOffset = this.getNodeConnectorOffset(
          this.connectingInfo.source.id,
          this.connectingInfo.sourcePosition
        )
        const destinationPosition = this.hoveredConnector
          ? this.hoveredConnector.position
          : null
        this.arrowTo(
          sourceOffset.x,
          sourceOffset.y,
          this.cursorToChartOffset.x,
          this.cursorToChartOffset.y,
          this.connectingInfo.sourcePosition,
          destinationPosition
        )
      }
    },
    handleChartDblClick (event) {
      if (this.readonly) {
        return
      }
      this.$emit('dblclick', { x: event.offsetX, y: event.offsetY })
    },
    handleChartMouseDown (event) {
      if (event.ctrlKey) {
        return
      }
      this.selectionInfo = { x: event.offsetX, y: event.offsetY }
    },
    getConnectorPosition (node) {
      const halfWidth = node.width / 2
      const halfHeight = node.height / 2
      const top = { x: node.x + halfWidth, y: node.y }
      const left = { x: node.x, y: node.y + halfHeight }
      const bottom = { x: node.x + halfWidth, y: node.y + node.height }
      const right = { x: node.x + node.width, y: node.y + halfHeight }
      return { left, right, top, bottom }
    },
    renderSelection () {
      const that = this
      // render selection rectangle
      if (that.selectionInfo) {
        that.currentNodes.splice(0, that.currentNodes.length)
        that.currentConnections.splice(0, that.currentConnections.length)
        const edge = getEdgeOfPoints([
          { x: that.selectionInfo.x, y: that.selectionInfo.y },
          { x: that.cursorToChartOffset.x, y: that.cursorToChartOffset.y }
        ])
        const svg = d3.select('#svg')
        const rect = svg.select('.selection').classed('active', true)
        rect
          .attr('x', edge.start.x)
          .attr('y', edge.start.y)
          .attr('width', edge.end.x - edge.start.x)
          .attr('height', edge.end.y - edge.start.y)
        that.internalNodes.forEach(item => {
          const points = [
            { x: item.x, y: item.y },
            { x: item.x, y: item.y + item.height },
            { x: item.x + item.width, y: item.y },
            { x: item.x + item.width, y: item.y + item.height }
          ]
          if (points.every(point => pointRectangleIntersection(point, edge))) {
            that.currentNodes.push(item)
          }
        })
        that.lines.forEach(line => {
          const points = [
            { x: line.sourceX, y: line.sourceY },
            { x: line.destinationX, y: line.destinationY }
          ]
          if (
            points.every(point => pointRectangleIntersection(point, edge)) &&
            that.currentConnections.every(item => item.id !== line.id)
          ) {
            const connection = that.internalConnections.filter(
              conn => conn.id === line.id
            )[0]
            that.currentConnections.push(connection)
          }
        })
      } else {
        d3.selectAll('#svg > .selection').classed('active', false)
      }
    },
    renderConnections () {
      const that = this
      return new Promise(function (resolve) {
        that.$nextTick(function () {
          d3.selectAll('#svg > g.connection').remove()
          // render lines
          that.lines = []
          that.internalConnections.forEach(conn => {
            const sourcePosition = that.getNodeConnectorOffset(
              conn.source.id,
              conn.source.position
            )
            const destinationPosition = that.getNodeConnectorOffset(
              conn.destination.id,
              conn.destination.position
            )
            let colors = {
              HasComponent: '#ff4800',
              HasProperty: 'red',
              HasTypeDefinition: 'black',
              HasSubtype: 'blue',
              HasEventSource: 'green'
            }
            if (
              that.currentConnections.filter(item => item === conn).length > 0
            ) {
              colors = {
                // HasComponent: '#ffffff',
                // HasProperty: 'darkred'
                HasComponent: '#ff4800',
                HasProperty: 'red',
                HasTypeDefinition: 'black',
                HasSubtype: 'blue',
                HasEventSource: 'green'
              }
            }
            const result = that.arrowTo(
              sourcePosition.x,
              sourcePosition.y,
              destinationPosition.x,
              destinationPosition.y,
              conn.source.position,
              conn.destination.position,
              colors[conn.type],
              conn.type
            )
            for (const path of result.paths) {
              path.on('mousedown', function (d) {
                d.stopPropagation()
                if (that.pathClickedOnce) {
                  that.editConnection(conn)
                } else {
                  const timer = setTimeout(function () {
                    that.pathClickedOnce = false
                    clearTimeout(timer)
                  }, 300)
                  that.pathClickedOnce = true
                }
                that.currentNodes.splice(0, that.currentNodes.length)
                that.currentConnections.splice(
                  0,
                  that.currentConnections.length
                )
                that.currentConnections.push(conn)
              })
            }
            for (const line of result.lines) {
              that.lines.push({
                sourceX: line.sourceX,
                sourceY: line.sourceY,
                destinationX: line.destinationX,
                destinationY: line.destinationY,
                id: conn.id
              })
            }
          })
          resolve()
        })
      })
    },
    renderNodes () {
      const that = this
      return new Promise(function (resolve) {
        d3.selectAll('#svg > g.node').remove()
        // render nodes
        that.internalNodes.forEach(node => {
          that.renderNode(
            node,
            that.currentNodes.filter(item => item === node).length > 0
          )
        })
        resolve()
      })
    },
    getNodeConnectorOffset (nodeId, connectorPosition) {
      const node = this.internalNodes.filter(item => item.id === nodeId)[0]
      return this.getConnectorPosition(node)[connectorPosition]
    },
    append (element) {
      const svg = d3.select('#svg')
      return svg.insert(element, '.selection')
    },
    guideLineTo (x1, y1, x2, y2) {
      const g = this.append('g')
      g.classed('guideline', true)
      lineTo(g, x1, y1, x2, y2, 1, '#a3a3a3', [5, 3])
    },
    arrowTo (x1, y1, x2, y2, startPosition, endPosition, color, type) {
      const g = this.append('g')
      g.classed('connection', true)

      line2(
        g,
        x1,
        y1,
        x2,
        y2,
        startPosition,
        endPosition,
        1,
        color || '#a3a3a3',
        true,
        type
      )
      // a 5px cover to make mouse operation conveniently
      return line2(
        g,
        x1,
        y1,
        x2,
        y2,
        startPosition,
        endPosition,
        5,
        'transparent',
        false,
        type
      )
    },
    renderNode (node, isSelected) {
      const that = this
      const g = that
        .append('g')
        .attr('cursor', 'move')
        .attr('class', 'drop-zone')
        .classed('node', true)
      node.render = that.render
      node.render(g, node, isSelected)

      if (that.currentNodes.length !== 1) {
        that.$emit('click', null)
      }
      const drag = d3
        .drag()
        .on('start', function () {
          // handle mousedown
          const isNotCurrentNode =
            that.currentNodes.filter(item => item === node).length === 0
          if (isNotCurrentNode) {
            that.currentConnections.splice(0, that.currentConnections.length)
            that.currentNodes.splice(0, that.currentNodes.length)
            that.currentNodes.push(node)
            that.$emit('click', node)
          }
          if (that.clickedOnce) {
            that.currentNodes.splice(0, that.currentNodes.length)
            that.editNode(node)
          } else {
            const timer = setTimeout(function () {
              that.clickedOnce = false
              clearTimeout(timer)
            }, 300)
            that.clickedOnce = true
          }
        })
        .on('drag', async function (d) {
          if (that.readonly) {
            return
          }
          const zoom = parseFloat(
            document.getElementById('svg').style.zoom || 1
          )
          for (const currentNode of that.currentNodes) {
            let x = d.dx / zoom
            if (currentNode.x + x < 0) {
              x = -currentNode.x
            }
            currentNode.x += x
            let y = d.dy / zoom
            if (currentNode.y + y < 0) {
              y = -currentNode.y
            }
            currentNode.y += y
          }
          d3.selectAll('#svg > g.guideline').remove()
          const edge = that.getCurrentNodesEdge()
          const expectX = Math.round(Math.round(edge.start.x) / 10) * 10
          const expectY = Math.round(Math.round(edge.start.y) / 10) * 10
          that.internalNodes.forEach(item => {
            if (
              that.currentNodes.filter(currentNode => currentNode === item)
                .length === 0
            ) {
              if (item.x === expectX) {
                // vertical guideline
                if (item.y < expectY) {
                  that.guideLineTo(
                    item.x,
                    item.y + item.height,
                    expectX,
                    expectY
                  )
                } else {
                  that.guideLineTo(
                    expectX,
                    expectY + item.height,
                    item.x,
                    item.y
                  )
                }
              }
              if (item.y === expectY) {
                // horizontal guideline
                if (item.x < expectX) {
                  that.guideLineTo(
                    item.x + item.width,
                    item.y,
                    expectX,
                    expectY
                  )
                } else {
                  that.guideLineTo(
                    expectX + item.width,
                    expectY,
                    item.x,
                    item.y
                  )
                }
              }
            }
          })
        })
        .on('end', function () {
          d3.selectAll('#svg > g.guideline').remove()
          for (const currentNode of that.currentNodes) {
            currentNode.x = Math.round(Math.round(currentNode.x) / 10) * 10
            currentNode.y = Math.round(Math.round(currentNode.y) / 10) * 10
          }
        })
      g.call(drag)
      g.on('mousedown', function (d) {
        // handle ctrl+mousedown
        if (!d.ctrlKey) {
          return
        }
        const isNotCurrentNode =
          that.currentNodes.filter(item => item === node).length === 0
        if (isNotCurrentNode) {
          that.currentNodes.push(node)
        } else {
          that.currentNodes.splice(that.currentNodes.indexOf(node), 1)
        }
      })
      const connectors = []
      const connectorPosition = this.getConnectorPosition(node)

      for (const position in connectorPosition) {
        const positionElement = connectorPosition[position]
        const connector = g
          .append('circle')
          // .attr('cx', connectorPosition.bottom.x)
          // .attr('cy', connectorPosition.bottom.y - 25)

          .attr('cx', positionElement.x)
          .attr('cy', positionElement.y)
          // .attr('r', 20)
          .attr('r', 10)
          .attr('class', 'connector')
        connector
          .on('mousedown', function (d) {
            d.stopPropagation()
            if (node.type === 'end' || that.readonly) {
              return
            }
            that.connectingInfo.source = node
            that.connectingInfo.sourcePosition = position
            // that.connectingInfo.sourcePosition = 'bottom'
          })
          .on('mouseup', function (d) {
            d.stopPropagation()
            if (that.connectingInfo.source) {
              if (that.connectingInfo.source.id !== node.id) {
                // Node can't connect to itself
                const tempId = +new Date() // uuidv4()
                const conn = {
                  source: {
                    id: that.connectingInfo.source.id,
                    position: that.connectingInfo.sourcePosition
                  },
                  destination: {
                    id: node.id,
                    position: position
                    // position: 'bottom'
                  },
                  id: tempId,

                  type: 'HasComponent'
                  // name: 'HasComponent'
                }
                that.internalConnections.push(conn)
                that.$emit(
                  'connect',
                  conn,
                  that.internalNodes,
                  that.internalConnections
                )
              }
              that.connectingInfo.source = null
              that.connectingInfo.sourcePosition = null
            }
          })
          .on('mouseover', function () {
            connector.classed('active', true)
          })
          .on('mouseout', function () {
            connector.classed('active', false)
          })
        connectors.push(connector)
      }
      g.on('mouseover', function () {
        connectors.forEach(conn => conn.classed('active', true))
      }).on('mouseout', function () {
        connectors.forEach(conn => conn.classed('active', false))
      })
    },
    getCurrentNodesEdge () {
      const points = this.currentNodes.map(node => ({
        x: node.x,
        y: node.y
      }))
      points.push(
        ...this.currentNodes.map(node => ({
          x: node.x + node.width,
          y: node.y + node.height
        }))
      )
      return getEdgeOfPoints(points)
    },
    save () {
      if (this.readonly) {
        return
      }
      this.$emit('save', this.internalNodes, this.internalConnections)
    },
    async remove () {
      if (this.readonly) {
        return
      }
      if (this.currentConnections.length > 0) {
        for (const conn of this.currentConnections) {
          this.removeConnection(conn)
        }
        this.currentConnections.splice(0, this.currentConnections.length)
      }
      if (this.currentNodes.length > 0) {
        for (const node of this.currentNodes) {
          this.removeNode(node)
        }
        this.currentNodes.splice(0, this.currentNodes.length)
      }
    },
    removeNode (node) {
      const connections = this.internalConnections.filter(
        item => item.source.id === node.id || item.destination.id === node.id
      )
      for (const connection of connections) {
        this.internalConnections.splice(
          this.internalConnections.indexOf(connection),
          1
        )
      }
      this.internalNodes.splice(this.internalNodes.indexOf(node), 1)
      this.$emit('delete', node, this.internalNodes, this.internalConnections)
    },
    removeConnection (conn) {
      const index = this.internalConnections.indexOf(conn)
      this.internalConnections.splice(index, 1)
      this.$emit(
        'disconnect',
        conn,
        this.internalNodes,
        this.internalConnections
      )
    },
    moveCurrentNode (x, y) {
      if (this.currentNodes.length > 0 && !this.readonly) {
        for (const node of this.currentNodes) {
          if (node.x + x < 0) {
            x = -node.x
          }
          node.x += x
          if (node.y + y < 0) {
            y = -node.y
          }
          node.y += y
        }
      }
    },
    init () {
      const that = this
      that.internalNodes.splice(0, that.internalNodes.length)
      that.internalConnections.splice(0, that.internalConnections.length)
      that.nodes.forEach(node => {
        const newNode = Object.assign({}, node)
        newNode.width = newNode.width || 120
        newNode.height = newNode.height || 60
        that.internalNodes.push(newNode)
      })
      that.connections.forEach(connection => {
        that.internalConnections.push(JSON.parse(JSON.stringify(connection)))
      })
    }
  }
}
</script>

<style src="./index.css"></style>
