<template>
  <main>
    <div class="sub_visual">
      <div class="visual_bg" />
    </div><!--sub_visual-->
    <section style="padding: 80px 0 0 0">
      <div class="inner">
        <div class="box-container">
          <div class="box">
            <div class="img_box cpsmain" />
            <div class="text_box head">
              <h2>
                <span>Digital Twin</span>
                <b>Flexing CPS Solution</b>
              </h2>
              <h3>
                (주)유비씨의 Flexing CPS 플랫폼으로 다양한 CPS 어플리케이션을 만들 수 있습니다.
              </h3>
              <div
                class="button-wrap-free"
                style="position: relative; display: block; padding:100px 0 10px 0;margin-left: -40px;"
              >
                <router-link
                  tag="a"
                  :to="{ name: 'signIn' }"
                >
                  <span>CPS 무료 체험</span>
                </router-link>
              </div>
            </div>
          </div> <!--box-->
        </div> <!--box-container-->
        <div class="info_box">
          <div
            class="box"
            style="margin-bottom: 20px;"
          >
            <div class="diagram-container">
              <div class="diagram_head">
                <h3>Flexing CPS Block Diagram</h3>
              </div>
              <div class="diagram">
                <img
                  :src="require('@/assets/images/ko/product/solution_flexing_cps.png')"
                  alt="국내 유일 Flexing OPC UA 솔루션"
                >
                <img
                  :src="require('@/assets/images/ko/product/cps_diagram.png')"
                  alt="Flexing CPS 다이어그램"
                >
              </div>
            </div>
            <div class="text_box cps">
              <dl>
                <dt>그래픽 기반 모델링</dt>
                <dd>표준 정보모델링으로 OPC UA 모델링 설계</dd>
                <dd>실시간 Address Space 추가 변경 삭제 / NodesetXML 파일 생성</dd>
                <dd>그래픽 기반의 드래그 방식으로 손쉬운 모델링 작성 지원</dd>
                <dd>모델링 가져오기 및 수정으로 쉬운 모델 생성 기능 제공</dd>
              </dl>
            </div>
            <div class="text_box cps">
              <dl>
                <dt>Centralized Address Space</dt>
                <dd>표준 OPC UA Address Space 스펙</dd>
                <dd>공장의 통합된 하나의 Address Space 로 관리</dd>
                <dd>공장 필드의 여러 개의 OPC UA Server를 계층적 구조로 하나로 통합</dd>
                <dd>수평적 데이터 교환시 외부 시스템은 중앙 Address Space 만 필요</dd>
              </dl>
            </div>
            <div class="text_box cps">
              <dl>
                <dt>3rd Party들과의 상호 운영성 증대</dt>
                <dd>표준 OPC UA 프로토콜을 적용한 산업용 네트워크의 통합</dd>
                <dd>서로 다른 Fieldbus들을 상호 연결하는 Gateway System</dd>
                <dd>OPC UA 프로토콜을 Rest API로 변환 지원</dd>
                <dd>클라우드 연동, 확장성을 고려한 MQTT 신호 발생</dd>
              </dl>
            </div>
            <div class="text_box cps">
              <dl>
                <dt>실시간 데이터 수집 및 데이터 분석</dt>
                <dd>실시간 데이터 EDA 처리 및 관리</dd>
                <dd>수집 데이터를 활용하여 다양한 알고리즘의 모델 생성 기능</dd>
                <dd>실시간 이상 감지 및 Alarm</dd>
                <dd>판단 모델 Edge 전송 및 CPS 반영</dd>
              </dl>
            </div>
          </div>
        </div>
      </div><!--inner-->
      <div class="story_container">
        <div class="inner">
          <div class="cps_story">
            <div class="car_company">
              <h3>안산 자동차부품 공장에 적용 사례</h3>
              <h4>A사 중견 제조 업체</h4>
              <ul>
                <li>매출 2000억원</li>
                <li>년 순이익 20억</li>
                <li>10개 라인 보유</li>
                <li>완전한 자동화 기술 구축</li>
              </ul>
            </div>
            <div class="cps_arrow">
              <p>스마트팩토리<br>컨설팅 추진</p>
              <span><img
                :src="require('@/assets/images/ko/product/arrow.png')"
                alt="스마트팩토리 컨설팅 추진"
              ></span>
            </div>
            <div class="table_box">
              <table class="cps">
                <legend>기존 컨설팅 결과 대비</legend>
                <colgroup>
                  <col>
                  <col>
                  <col>
                  <col>
                </colgroup>
                <thead>
                  <tr>
                    <th class="th_left">
                      기존 CPS 컨설팅
                    </th>
                    <th class="th_right">
                      Flexing CPS 컨설팅
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>구축비용 40억</td>
                    <td>구축비용 4억</td>
                  </tr>
                  <tr>
                    <td>데이터 통합 문제</td>
                    <td>OPC UA 및 Edge 기술을 통한 데이터 통합 가능</td>
                  </tr>
                  <tr>
                    <td class="td_left">
                      결과 확신성 및 구축 전문성 부족
                    </td>
                    <td class="td_right">
                      CPS 전문 기술 보유
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="inner">
        <div class="box-container">
          <div class="info_box">
            <div class="box">
              <div class="dl_box cps">
                <dl>
                  <dt>데이터 통합과 상호연동</dt>
                  <dd>다양한 메이커 로봇, 설비 혼재 등으로 데이터 통합과 상호연동 문제 해결</dd>
                </dl>
                <dl>
                  <dt>비용 감소</dt>
                  <dd>과다한 스마트팩토리 구축 비용에 대한 부담이 감소</dd>
                </dl>
                <dl>
                  <dt>전문 기술 보유</dt>
                  <dd>불확실성과 전문성 부족으로 인한 도입 의사결정 문제 해결</dd>
                </dl>
              </div> <!--dl-->
              <div class="slide_box">
                <ul>
                  <li>
                    <img
                      :src="require('@/assets/images/ko/product/solution_flexing_cps_dashboard_1.png')"
                      alt="FLEXING_CPS_dashboard_모니터링"
                    ><span>FLEXING CPS 모니터링</span>
                  </li>
                  <li>
                    <img
                      :src="require('@/assets/images/ko/product/solution_flexing_cps_dashboard_2.png')"
                      alt="FLEXING_CPS_dashboard_모델러"
                    ><span>FLEXING CPS 모델러</span>
                  </li>
                  <li>
                    <img
                      :src="require('@/assets/images/ko/product/solution_flexing_cps_dashboard_3.png')"
                      alt="FLEXING_CPS_dashboard_프로파일 메이커"
                    ><span>FLEXING CPS 프로파일 메이커</span>
                  </li>
                  <li>
                    <img
                      :src="require('@/assets/images/ko/product/solution_flexing_cps_dashboard_4.png')"
                      alt="FLEXING_CPS_dashboard_머신러닝 학습"
                    ><span>FLEXING CPS 머신러닝 학습</span>
                  </li>
                </ul>
              </div>
            </div> <!--box-->
          </div> <!--info_box-->
        </div> <!--box-container-->
      </div><!--inner-->
      <div class="video_box cps">
        <div class="inner">
          <div>
            <video
              id="cps_video"
              :src="cpsVideo"
              height="380"
              controls
              type="video/mp4"
            />
          </div>
          <p>Flexing CPS Solution 소개 영상</p>
        </div>
      </div>
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
    font-family: "Noto Sans KR", Lato, 돋움, Dotum, Helvetica, AppleGothic, sans-serif;
}
h4, dt, h3{
  font-size: 24px;
    font-family: "Noto Sans KR", Lato, 돋움, Dotum, Helvetica, AppleGothic, sans-serif;
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

