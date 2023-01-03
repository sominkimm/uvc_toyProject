import * as d3 from 'd3'
import { roundTo20 } from '@/components/flowChart/utils/math'

function render (g, node, isSelected) {
  node.width = node.width || 120
  node.height = node.height || 60
  const borderColor = isSelected ? '#7c00ff' : '#a5a4a4'
  const borderWidth = isSelected ? '2px' : '1px'
  if (node.type === 'Object') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })
    const body = g.append('rect').attr('class', 'body')
    body
      .style('width', node.width + 'px')
      .style('fill', 'white')
      .style('stroke-width', borderWidth)
    body.attr('x', node.x).attr('y', node.y + 20)
    body.style('height', roundTo20(node.height - 20) + 'px')
    body.attr('stroke', borderColor)
  } else if (node.type === 'ObjectType') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })

    g.append('rect')
      .style('width', node.width - 10 + 'px')
      .style('fill', 'gray')
      .style('stroke-width', borderWidth)
      .attr('x', node.x + 10)
      .attr('y', node.y + 25)
      .style('height', roundTo20(node.height - 20) + 'px')
      .attr('stroke', borderColor)

    const body = g.append('rect').attr('class', 'body')
    body
      .style('width', node.width - 8 + 'px')
      .style('fill', 'white')
      .style('stroke-width', borderWidth)
    body.attr('x', node.x).attr('y', node.y + 20)
    body.style('height', roundTo20(node.height - 23) + 'px')
    body.attr('stroke', borderColor)
  } else if (node.type === 'Variable') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })
    const body = g.append('rect').attr('class', 'body')
    body
      .style('width', node.width + 'px')
      .style('fill', 'white')
      .style('stroke-width', borderWidth)
    body.attr('x', node.x).attr('y', node.y + 20)
    body.attr('rx', 20).attr('ry', 12)
    body.style('height', roundTo20(node.height - 20) + 'px')
    body.attr('stroke', borderColor)
  } else if (node.type === 'VariableType') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })

    g.append('rect')
      .style('width', node.width - 10 + 'px')
      .style('fill', 'gray')
      .style('stroke-width', borderWidth)
      .attr('x', node.x + 10)
      .attr('y', node.y + 25)
      .attr('rx', 20)
      .attr('ry', 8)
      .style('height', roundTo20(node.height - 20) + 'px')
      .attr('stroke', borderColor)

    const body = g.append('rect').attr('class', 'body')
    body
      .style('width', node.width - 8 + 'px')
      .style('fill', 'white')
      .style('stroke-width', borderWidth)
    body.attr('x', node.x).attr('y', node.y + 20)
    body.attr('rx', 20).attr('ry', 8)
    body.style('height', roundTo20(node.height - 23) + 'px')
    body.attr('stroke', borderColor)
  } else if (node.type === 'DataType') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })

    var dataTypeS32s = Math.sqrt(3) / 5
    var dataType = 60
    var dataTypeXDiffs = node.x + node.width / 2 + 7
    var dataTypeYDiffs = node.y + node.height / 2 + 19
    var dataTypePointData = [
      [dataType + dataTypeXDiffs - 4, 0 + dataTypeYDiffs],
      [
        dataType / 1.3 + dataTypeXDiffs - 4,
        dataType * dataTypeS32s + dataTypeYDiffs
      ],
      [
        -dataType / 1.3 + dataTypeXDiffs,
        dataType * dataTypeS32s + dataTypeYDiffs
      ],
      [-dataType + dataTypeXDiffs, 0 + dataTypeYDiffs],
      [
        -dataType / 1.3 + dataTypeXDiffs,
        -dataType * dataTypeS32s + dataTypeYDiffs
      ],
      [
        dataType / 1.3 + dataTypeXDiffs - 4,
        -dataType * dataTypeS32s + dataTypeYDiffs
      ]
    ]
    g.append('polygon')
      .attr('points', dataTypePointData)
      .style('fill', 'gray')
      .style('stroke', borderColor)
      .style('stroke-width', borderWidth)

    var shadeDataTypeS32 = Math.sqrt(3) / 5
    var shadeDataType = 60
    var shadeDataTypeXDiff = node.x + node.width / 2
    var shadeDataTypeYDiff = node.y + node.height / 2 + 10
    var shadeDataTypePointData = [
      [shadeDataType + shadeDataTypeXDiff, 0 + shadeDataTypeYDiff],
      [
        shadeDataType / 1.3 + shadeDataTypeXDiff,
        shadeDataType * shadeDataTypeS32 + shadeDataTypeYDiff
      ],
      [
        -shadeDataType / 1.3 + shadeDataTypeXDiff,
        shadeDataType * shadeDataTypeS32 + shadeDataTypeYDiff
      ],
      [-shadeDataType + shadeDataTypeXDiff, 0 + shadeDataTypeYDiff],
      [
        -shadeDataType / 1.3 + shadeDataTypeXDiff,
        -shadeDataType * shadeDataTypeS32 + shadeDataTypeYDiff
      ],
      [
        shadeDataType / 1.3 + shadeDataTypeXDiff,
        -shadeDataType * shadeDataTypeS32 + shadeDataTypeYDiff
      ]
    ]
    g.append('polygon')
      .attr('points', shadeDataTypePointData)
      .style('fill', 'white')
      .style('stroke', borderColor)
      .style('stroke-width', borderWidth)
  } else if (node.type === 'ReferenceType') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })

    var referenceTypes32s = Math.sqrt(3) / 5
    var referenceType = 60
    var referenceTypeXDiffs = node.x + node.width / 2 + 9
    var referenceTypeYDiffs = node.y + node.height / 2 + 19
    var referenceTypePointDatas = [
      [referenceType + referenceTypeXDiffs - 10, 0 + referenceTypeYDiffs],
      [
        referenceType / 2 + referenceTypeXDiffs + 30,
        referenceType * referenceTypes32s + referenceTypeYDiffs
      ],
      [
        -referenceType / 2 + referenceTypeXDiffs,
        referenceType * referenceTypes32s + referenceTypeYDiffs
      ],
      [-referenceType + referenceTypeXDiffs, 0 + referenceTypeYDiffs],
      [
        -referenceType / 2 + referenceTypeXDiffs,
        -referenceType * referenceTypes32s + referenceTypeYDiffs
      ],
      [
        referenceType / 2 + referenceTypeXDiffs + 30,
        -referenceType * referenceTypes32s + referenceTypeYDiffs
      ]
    ]
    g.append('polygon')
      .attr('points', referenceTypePointDatas)
      .style('fill', 'gray')
      .style('stroke', borderColor)
      .style('stroke-width', borderWidth)

    var shadeReferenceTypeS32 = Math.sqrt(3) / 5
    var shadeReferenceType = 60
    var shadeReferenceTypeXDiff = node.x + node.width / 2
    var shadeReferenceTypeYDiff = node.y + node.height / 2 + 10
    var shadeReferenceTypePointData = [
      [
        shadeReferenceType + shadeReferenceTypeXDiff - 10,
        0 + shadeReferenceTypeYDiff
      ], // 오른쪽 가운데
      [
        shadeReferenceType / 2 + shadeReferenceTypeXDiff + 30,
        shadeReferenceType * shadeReferenceTypeS32 + shadeReferenceTypeYDiff
      ], // 오른쪽 아래
      [
        -shadeReferenceType / 1.3 + shadeReferenceTypeXDiff,
        shadeReferenceType * shadeReferenceTypeS32 + shadeReferenceTypeYDiff
      ], // 왼쪽 아래
      [
        -shadeReferenceType + shadeReferenceTypeXDiff,
        0 + shadeReferenceTypeYDiff
      ], // // 왼쪽 가운데
      [
        -shadeReferenceType / 1.3 + shadeReferenceTypeXDiff,
        -shadeReferenceType * shadeReferenceTypeS32 + shadeReferenceTypeYDiff
      ], // 왼쪽 위
      [
        shadeReferenceType / 2 + shadeReferenceTypeXDiff + 30,
        -shadeReferenceType * shadeReferenceTypeS32 + shadeReferenceTypeYDiff
      ] // 오른쪽 위
    ]
    g.append('polygon')
      .attr('points', shadeReferenceTypePointData)
      .style('fill', 'white')
      .style('stroke', borderColor)
      .style('stroke-width', borderWidth)
  } else if (node.type === 'Method') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })
    const body = g.append('rect').attr('class', 'body')
    body
      .style('width', node.width + 'px')
      .style('fill', 'white')
      .style('stroke-width', borderWidth)
    body.attr('x', node.x).attr('y', node.y + 20)
    body.attr('rx', 50).attr('ry', 30)
    body.style('height', roundTo20(node.height - 20) + 'px')
    body.attr('stroke', borderColor)
  } else if (node.type === 'View') {
    g.append('rect')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('stroke', borderColor)
      .attr('class', 'title')
      .style('height', '20px')
      .style('fill', '#263238')
      .style('stroke-width', borderWidth)
      .style('width', node.width + 'px')
    g.append('text')
      .attr('x', node.x + 4)
      .attr('y', node.y + 15)
      .style('fill', 'white')
      .style('font-size', '13px')
      .attr('class', 'unselectable')
    // .text(() => node.name)
      .text(() => node.type)

      .each(function wrap () {
        const self = d3.select(this)
        let textLength = self.node().getComputedTextLength()
        let text = self.text()
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...')
          textLength = self.node().getComputedTextLength()
        }
      })
    var viewS32 = Math.sqrt(3) / 5
    var view = 60
    var viewXDiff = node.x + node.width / 2
    var viewYDiff = node.y + node.height / 2 + 10
    var viewPointData = [
      [view + viewXDiff, view * viewS32 + viewYDiff], // 오른쪽 아래
      [-view + viewXDiff, view * viewS32 + viewYDiff], // 왼쪽 아래
      [-view / 1.3 + viewXDiff, -view * viewS32 + viewYDiff], // 왼쪽 위
      [view / 1.3 + viewXDiff, -view * viewS32 + viewYDiff] // 오른쪽 위
    ]
    g.append('polygon')
      .attr('points', viewPointData)
      .style('fill', 'white')
      .style('stroke', borderColor)
      .style('stroke-width', borderWidth)
  }
  const bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2

  g.append('text')
    .attr('x', node.x + node.width / 2)
    .attr('y', bodyTextY)
    .attr('class', 'unselectable')
    .attr('text-anchor', 'middle')
    .text(function () {
      return node.name
    })
    .each(function wrap () {
      const self = d3.select(this)
      let textLength = self.node().getComputedTextLength()
      let text = self.text()
      while (textLength > node.width - 2 * 4 && text.length > 0) {
        text = text.slice(0, -1)
        self.text(text + '...')
        textLength = self.node().getComputedTextLength()
      }
    })
}

export default render
