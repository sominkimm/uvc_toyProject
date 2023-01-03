<template>
  <main>
    <div class="sub_visual">
      <div class="visual_bg_modeler" />
    </div><!--sub_visual-->
    <section>
      <div class="inner">
        <div class="box-container">
          <div class="box">
            <div class="img_box modeler" />
            <div class="text_box head">
              <h2>
                <span>OPC Address Space Editor</span>
                <b>OPC UA Modeler</b>
              </h2>
              <h3>Flexing Modeler는 세계 최초 OPC UA Address Space 기반으로 CPS를 구현한 모델링 툴(Tool)입니다. Drag & Drop GUI 방식으로 간편한 디바이스 설정을 경험해보실 수 있습니다.</h3>
            </div>
          </div> <!--box-->
        </div> <!--box-container-->
        <div class="info_box modeler">
          <div class="box">
            <div class="diagram-container">
              <div class="diagram_head">
                <h3>Flexing CPS - OPC UA Modeler diagram</h3>
              </div>
              <div
                class="diagram"
                style="background-color: white;"
              >
                <img
                  :src="require('@/assets/images/ko/product/modeler_info.png')"
                  alt="OPC UA Modeler"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modeler_box">
          <section>
            <dl>
              <dt>장치/공정 모델링 데이터 무중단 CPS Server 전달</dt>
              <dd>그래픽 환경에서 장치를 국제표준 산업프로토콜인 OPC UA로 모델링</dd>
              <dd>모델러의 장치 모델링과 공정모델링은 즉시 CPS Server에 반영</dd>
              <dd>CPS Server내의 모든 Address Space 데이터 즉시 HTTP 프로토콜로 변환, 웹브라우저 내에서 서비스</dd>
            </dl>
            <dl>
              <dt>OPC NodeSetXML 표준사용 정의</dt>
              <dd>표준 XML 정의로 다른 모델러 XML과 Import / export 가능</dd>
              <dd>OPC 표준에 따른 노드, 메소드, 알람 정의</dd>
            </dl>
            <dl>
              <dt>모델링을 통한 산업용 프로토콜 컨버팅</dt>
              <dd>Modbus, Fanuc, LS XGT 디바이스 OPC UA 프로토콜로 변환</dd>
              <dd>비표준 프로토콜 데이터 파싱 후 OPC UA 프로토콜로 변환 가능</dd>
            </dl>
          </section>
          <section class="img_section">
            <img
              :src="require('@/assets/images/ko/product/solution_flexing_cps_dashboard_2.png')"
              alt="Flexing CPS Modeler"
            >
            <p>실시간 Address Space 반영</p>
          </section>
        </div>
        <div class="dl_box modeler">
          <dl>
            <dt>간편한 GUI</dt>
            <dd>Drag & Drop 방식의 간편한 GUI 방식으로 수집할 Device를 셋팅</dd>
          </dl>
          <dl>
            <dt>실시간 Address Space</dt>
            <dd>타사 OPC UA Modeler와 달리 OPC UA Address Space를 실시간으로 자동 구성/추가/변경</dd>
          </dl>
          <dl>
            <dt>실시간 모니터링</dt>
            <dd>기계/로봇 등의 모델을 생성 후 서버로 실시간 적용, OPC 통신을 동적으로 확인</dd>
          </dl>
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

