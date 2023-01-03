<template>
  <main>
    <div class="sub_visual">
      <div class="visual_bg_edge" />
    </div><!--sub_visual-->
    <section>
      <div class="inner">
        <div class="box-container">
          <div class="box">
            <div class="img_box edge" />
            <div class="text_box head">
              <h2>
                <span>Embedded OPC UA Device</span>
                <b>Flexing EDGE</b>
              </h2>
              <h3>
                Flexing Edge는 OPC UA Server을 통하여 실시간으로 자동 모델링합니다. 쉽고 빠르게 설치할 수 있으며 작동법도 간편합니다.
                Edge를 사용하여 클러스터링을 통한 분산처리와 다중화 기술을 경험해보세요.
              </h3>
            </div>
          </div> <!--box-->
        </div> <!--box-container-->
        <div class="info_box">
          <div class="box">
            <div class="diagram-container">
              <div class="diagram_head">
                <h3>Flexing EDGE Block Diagram</h3>
              </div>
              <div class="diagram">
                <img
                  :src="require('@/assets/images/ko/product/diagram_edge.png')"
                  alt="Flexing EDGE 다이어그램 이미지"
                >
                <ul>
                  <li>OPC UA Framework 기반 Historian, Alarm, Method 탑재</li>
                  <li>클라우드 연계 기능과 MQTT , PubSub@TSN 기반의 통신</li>
                  <li>Modbus 통신, 사설 비표준 통신 모두 OPC UA 변환</li>
                  <li>데이터 필터링으로 전송대역 절약</li>
                  <li>다른 엣지 컴퓨터로 P2P 통신 가능</li>
                  <li>엣지가 컴퓨터 기능을 하여 네트워크 단절 시 단독 작동</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="install_box">
          <div class="install_head">
            <div>
              <h3>쉽고 빠른 설치</h3>
              <p>변수가 많아 오래 있기 힘든 현장에서 EDGE를 간편하게 작동시켜 보세요.</p>
            </div>
            <table>
              <legend>Edge Device</legend>
              <colgroup>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
                <tr>
                  <th class="th_left">
                    구분
                  </th>
                  <th class="th_right">
                    기능
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>터치 모니터</th>
                  <td>부착 된 모니터로 OPC UA Server 실시간 확인 가능</td>
                </tr>
                <tr>
                  <th>스크린 확장</th>
                  <td>외부 HDMI, VGA로 확장 가능</td>
                </tr>
                <tr>
                  <th>인터페이스</th>
                  <td>넉넉한 외부 인터페이스로 현장의 다양한 장비 연결 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>
              <div>
                <img
                  :src="require('@/assets/images/ko/product/install_edge_1.png')"
                  alt=""
                >
              </div>
              <h3>STEP 1</h3>
              <p>전원 넣기</p>
            </li>
            <li>
              <div>
                <img
                  :src="require('@/assets/images/ko/product/install_edge_2.png')"
                  alt=""
                >
              </div>
              <h3>STEP 2</h3>
              <p>LAN 선 꽂기</p>
            </li>
            <li>
              <div>
                <img
                  :src="require('@/assets/images/ko/product/install_edge_3.png')"
                  alt=""
                >
              </div>
              <h3>STEP 3</h3>
              <p>전원 버튼 ON</p>
            </li>
            <li>
              <div>
                <img
                  :src="require('@/assets/images/ko/product/install_edge_4.png')"
                  alt=""
                >
              </div>
              <h3>STEP 4</h3>
              <p>PROCESS 자동로드</p>
            </li>
          </ul>
        </div>
        <div class="categories_box">
          <ul>
            <li class="pro">
              <div>
                <h3><span>스마트팩토리 EDGE / 태양광</span>Flexing EDGE PRO</h3>
                <p />
              </div>
              <table>
                <legend>스마트팩토리 EDGE / 태양광용 Flexing EDGE PRO</legend>
                <colgroup>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th class="th_left">
                      구분
                    </th>
                    <th class="th_right">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>CPU</th>
                    <td>Intel Core4 4200,2.5Ghz 4G SSD 64G</td>
                  </tr>
                  <tr>
                    <th>OS</th>
                    <td>Windows 10 IO : RS232 * 4, Rs422/485 *2 HDMI*1</td>
                  </tr>
                  <tr>
                    <th>Communication</th>
                    <td>TCP/IP , Wifi, Bluetooth, Ethernet</td>
                  </tr>
                  <tr>
                    <th>Protocol</th>
                    <td>OPC UA, Modbus, Fanuc, KuKa, etc ..</td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>237 * 204 * 68 (L*W*H) 6kg</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li class="beige">
              <div>
                <h3><span>태양광 / SCADA</span>Flexing EDGE Lite</h3>
                <p />
              </div>
              <table>
                <legend>태양광 / SCADA용 Flexing EDGE Lite</legend>
                <colgroup>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th class="th_left">
                      구분
                    </th>
                    <th class="th_right">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>CPU</th>
                    <td>ARM Cortex-A9 Quad-Core 2G 8MMC 8G</td>
                  </tr>
                  <tr>
                    <th>OS</th>
                    <td>Lynux IO : HDMI*1 RS232*1, Di 4/Do 2/ AI 1</td>
                  </tr>
                  <tr>
                    <th>Communication</th>
                    <td> TCP/IP , Wifi, Bluetooth, Ethernet, Nb-Iot</td>
                  </tr>
                  <tr>
                    <th>Protocol</th>
                    <td>OPC UA, Modbus, 표준인버터</td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>180 * 110 * 40 (L*W*H)</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li class="lite">
              <div>
                <h3><span>스마트팩토리 EDGE / 태양광</span>Flexing EDGE Lite</h3>
                <p />
              </div>
              <table>
                <legend>스마트팩토리 EDGE / 태양광용 Flexing EDGE Lite</legend>
                <colgroup>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th class="th_left">
                      구분
                    </th>
                    <th class="th_right">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>CPU</th>
                    <td>Intel Bay Traill J1900 Quad Core 2.0Ghz 4G SSD 32G</td>
                  </tr>
                  <tr>
                    <th>OS</th>
                    <td>Windows 10 IO : LAN HDMI*1</td>
                  </tr>
                  <tr>
                    <th>Communication</th>
                    <td> CP/IP , Wifi, Bluetooth, Ethernet</td>
                  </tr>
                  <tr>
                    <th>Protocol</th>
                    <td>OPC UA, Modbus, Fanuc, KuKa, etc ..</td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>126* 134 * 38 (L*W*H) 0.55kg</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div><!--inner-->
    </section>
  </main>
</template>
<script>
export default {
  data () {
    return {
      cpsVideo: require('@/assets/video/cps.mp4')
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="scss">
 @import "@/assets/styles/uvc-scss/app_default/common.scss";
 @import "@/assets/styles/uvc-scss/app_default/solution.scss";

 *:focus { outline:none; }

body, input, textarea, select, button, table{margin:0; font-family:'Noto Sans KR', Noto Sans KR, 'Lato','돋움', Dotum, Helvetica, AppleGothic, Sans-serif;}
body, h1, h2, h3, h4, h5, dl, dt, dd, ul, li, ol, th, td, p, form, fieldset, legend, button { margin: 0; padding: 0; }

h2{
  font-size:50px;
}
h4, dt, h3{
  font-size: 24px;
}

img {max-width:100%;}
img, fieldset{border:0 none}
dl, ul, ol, li {list-style: none outside none;}
button{border:0 none; cursor:pointer; display: block;}
table {border-collapse:collapse;}

img {vertical-align:top;}
li img { vertical-align:top;}
td img { vertical-align:middle;}
.cursor { cursor: pointer;}

strong, .strong , b { font-weight: 600;}
address, caption, cite, code, dfn, em, var {font-style:normal;}

hr { clear:both; display: none; }
.blind, legend, caption {display:none;}

a {text-decoration:none;}
a:hover, a:active, a:focus {text-decoration:none;}
table a:hover, table a:active {text-decoration:underline;}
table a.nonehoverline { text-decoration:none; }

input, select, textarea {vertical-align:middle; line-height:130%}
input, textarea, select { border-width:1px; border-style: solid; border-color:#dfdfdf; background:#fff; outline:0;}
input[type=button],
input[type=submit],
textarea {border-radius:0; -webkit-border-radius:0; appearance:none; -webkit-appearance:none;}
select {height:42px; box-sizing:border-box; border-radius:0; -webkit-border-radius:0;}
input.text {padding:0px 10px; height:42px; font-weight:300; box-sizing:border-box; border-radius:0; -webkit-border-radius:0; appearance:none; -webkit-appearance:none; box-sizing:border-box;}
input.file {border:1px solid #dfdfdf;}
input.check	{border:none; background:none;}
input.radio	{border:0 none; background:none;}
textarea.textarea {height:120px; padding:10px; box-sizing:border-box;}
label {cursor:pointer;}

.button {border:0 none; cursor:pointer}

</style>

