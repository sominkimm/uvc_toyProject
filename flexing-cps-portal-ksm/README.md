# flexing-cps-portal

Hello, flexing-cps-portal

## 1. Features

    - commit 규칙
    ADD⚡(:zap:),
    FIX🔨(:hammer:),
    UPDATE🖊️(:pen:),
    DELETE🗑️(:wastebasket:)

## 2. Contributor

- [HuyunLee] lhy@uvc.co.kr
- [korjsh] korjsh@uvc.co.kr
- [Heo Hojin] lowell@uvc.co.kr
- [jhj0955] jhj@uvc.co.kr
- [jieb777] jieb@uvc.co.kr
- [kalosdo] kalosdo@uvc.co.kr
- [leegandhi] leegandhi@uvc.co.kr

## 3. Structure

- update 22.09.16

```
├── public                          # index.html 관련 파일이 들어가는 공간
│   └── ...
├── src                             # .
│   ├── assets                      # 정적파일 서비스 공간 (공용 css 파일이나 image 파일 등)
│   │   ├── ...
│   │   ├── images                  # image 파일 모음 폴더
│   │   ├── styles                  # css 파일 모음 폴더
│   │   │   ├── ...
│   │   │   ├── sass                # .
│   │   │   │   ├── ...
│   │   │   │   ├── plus            # gull templeate css 가 아닌 추가 css 정리 파일
│   │   │   │   ├── themes          # .
│   │   │   │   └── ...             # .
│   │   │   └── ...                 # .
│   │   └── ...
│   ├── auth                        # 사용 안함
│   ├── components                  # 공통 component 공간
│   │   ├── ...
│   │   ├── toast                   # toast (알람 창 - 사용 안함)
│   │   ├── vueChart                # vue-chart.js 관련 파일
│   │   ├── breadcumb.vue           # 메뉴 페이지 타이틀
│   │   ├── customPagination.vue    # 페이징
│   │   └── ...
│   ├── containers                  # 공통 layout (좌측 및 상단 메뉴 layout)
│   │   └── layout                  # .
│   │       ├── common              # 사용 안함
│   │       └── sideBar             # 좌측 및 상단 메뉴 layout
│   ├── data                        # 임시 데이터 파일 (가데이터)
│   │   └── rawData                 # .
│   │   └── ...                     # .
│   ├── filters                     # 사용 안함
│   ├── lang                        # 언어별 번역 설정 ex) kr, en
│   │   ├── i18n
│   │   │   ├── en.json             # 영어 - 정리되지 않음
│   │   │   └── ko.json             # 한국어 - 정리중
│   │   └── lang.js                 # 언어 설정 파일
│   ├── lib                         # axios, api 및 공통 js 함수
│   │   ├── api                     # axios 설정 및 api 정의 (메뉴별 정의)
│   │   │   ├── client.js           # axios setting of default
│   │   │   └── clientFile.js       # axios setting of file
│   │   ├── utils                   # 실 사용 utils
│   │   │   ├── ...
│   │   │   ├── mixinUtils.js       # 공통으로 사용하는 상수 등 mixin된 파일
│   │   │   └── ...                 # .
│   │   ├── apiUtil.js              #  api js 파일
│   │   ├── common.js               # 사용 안함
│   │   ├── fncUtil.js              # 공통 js 파일
│   │   └── globalVariable.js       # global 사용 변수 정의 (color 만 사용중)
│   ├── plugins                     # 플러그인 관련 파일 (파일 생성 후 src/main.js 와 직접 연결필요)
│   ├── routes                      # 라우터 관련 정의 디텍토리
│   │   └── router.js               # 사이드바 메뉴도 router.js 파일의 데이터로 만들어짐
│   ├── store                       # .
│   │   ├── modules                 # .
│   │   ├── getters.js              # .
│   │   └── index.js                # .
│   ├── views                       # 메뉴를 기준으로 디렉토리 설정
│   │   ├── analysis                # 데이터 분석 
│   │   │   ├── anomaly             # 이상감지 모델 만들기
│   │   │   ├── dataFlow            # .
│   │   │   ├── dataPreprocessing   # 데이터 전처리
│   │   │   ├── eda                 # EDA 시작하기
│   │   │   └── machineLearning     # 머신러닝 학습하기 
│   │   ├── certificationSetting    # 인증서 관리
│   │   ├── dashboards              # 대시보드
│   │   ├── dataCollect             # 데이터 수집
│   │   ├── dataMarket              # 데이터 공유
│   │   ├── dataRetrieve            # 데이터 조회
│   │   ├── deviceSetting           # 디바이스 관리
│   │   ├── edgeSetting             # 엣지 설정
│   │   ├── pages                   # 단일 페이지 (404, not permision)
│   │   ├── product                 # 메인 페이지
│   │   ├── sessions                # 로그인/로그아웃/회원가입
│   │   ├── sysmng                  # 시스템 관리 
│   │   │   ├── authorization       # 사용자 권한
│   │   │   ├── authorization       # provider 전용 사용자(business) 권한
│   │   │   ├── license             # 라이선스 관리
|   |   │   ├── mngUserResource     # provider 전용 사용자 리소스
|   |   │   ├── temporary           # 임시 페이지
|   |   │   ├── user                # 사용자 관리
│   │   │   ├── userResource        # 사용자 리소스 현황
│   │   └── ...                     # .
│   ├── App.vue                     # .
│   ├── main.js                     # index 파일 (서버 최초 실행 파일)
│   └── vue-wrapper.js              # .
├── .env                            # default 환경설정 파일
├── .env.demo                       # demo 환경설정 파일 (ssl)
├── .env.dev                        # dev 환경설정 파일
├── .eslintrc.js
├── .gitignore
├── babel.config.js                 # babel 관련 설정 파일
├── debug.log
├── package.json
├── package-lock.json               #
├── package-old.json                # 사용 안함
├── package-old-2.json              # 사용 안함
├── README.md
├── vue.config.js                   # .
└── yarn.lock

```

## 4. Common

### 1. toast

리팩토링 예정 (사용 안함)

```
      store.dispatch('toast/setToast', {
        id: String(new Date().getTime()),         // toast id - toast를 중복으로 띄우기 위해 사용
        title: 'update anomaly',                  // toast title
        content: i18n.t('modal.processMes'),      // toast content
        timeout: 3000,                            // toast 유지 시간
        variant: 'success'                        // toast thema
      })
```

### 2. Sidebar (좌측 메뉴)

- 메뉴 생성 규칙
  - 라우터를 생성할때 확정성을 위해 메뉴가 하나만 존재하더라도 children 기준으로 생성
  - step 기준
    - 0 : 메뉴 비활성 (메뉴만 비활성 - url 접근은 막지 않음 - 추후 개발 예정)
    - 1 : 2deps 까지 메뉴 활성화 (ex 데이터 수집, 데이터 분석 등)
    - 2 : 1deps 까지 메뉴 활성화 (ex 커스텀 대시보드, 디바이스 관리 등)

* example code (router/admin.js)

      {
        path: '/app/dashboards',
        meta: {
          step: 1,                     // 0일 경우 비활성, 1일 경우 children 활성화, 2일 경우 children 비활성
          title: i18n.t('monitoring.index'),
          icon: '<i class="i-Bar-Chart text-19" />'
        },
        component: () => import('@/views/app/dashboards'),
        redirect: '/app/dashboards/monitoring',
        children: [
          {
            path: '/app/dashboards/monitoring',
            name: 'monitoring',
            meta: {
              step: 2,                // 0과 2의 경우만 사용. 0일 경우 비활성, 2일 경우 활성화
              title: i18n.t('monitoring.index'),
              description: i18n.t('monitoring.description.monitoring'),
              icon: '<i class="i-Bar-Chart text-19" />'
            },
            component: () => import('@/views/app/dashboards/monitoring')
          }
        ]
      },

### 3. i18n (다국어)

- 공통 사용

  - "common": {}
    - 공통으로 사용
  - "columns": {}
    - 테이블 columns 정리
  - "button": {}
    - 공통으로 사용할 button 정리
  - "modal": {}
    - 공통으로 사용할 modal 정리

### 4. html pattern (validation)

| -      | 내용                                                                       | 설명        |
| ------ | -------------------------------------------------------------------------- | ----------- |
| Number | [0-9]+                                                                     | 숫자만 입력 |
| Ip     | ((^&#124;\.)((25[0-5])&#124;(2[0-4]\d)&#124;(1\d\d)&#124;([1-9]?\d))){4}\$ | 테스트3     |

ex) pattern="[0-9]+"

### 5. Store(Vuex)

아직 완전히 정립되지 않음

- modules

  - --

- actions

  - --

- mutations
  - --

## 5. 라이선스/사용자 권한

