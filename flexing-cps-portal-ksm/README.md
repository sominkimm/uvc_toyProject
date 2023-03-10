# flexing-cps-portal

Hello, flexing-cps-portal

## 1. Features

    - commit κ·μΉ
    ADDβ‘(:zap:),
    FIXπ¨(:hammer:),
    UPDATEποΈ(:pen:),
    DELETEποΈ(:wastebasket:)

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
βββ public                          # index.html κ΄λ ¨ νμΌμ΄ λ€μ΄κ°λ κ³΅κ°
β   βββ ...
βββ src                             # .
β   βββ assets                      # μ μ νμΌ μλΉμ€ κ³΅κ° (κ³΅μ© css νμΌμ΄λ image νμΌ λ±)
β   β   βββ ...
β   β   βββ images                  # image νμΌ λͺ¨μ ν΄λ
β   β   βββ styles                  # css νμΌ λͺ¨μ ν΄λ
β   β   β   βββ ...
β   β   β   βββ sass                # .
β   β   β   β   βββ ...
β   β   β   β   βββ plus            # gull templeate css κ° μλ μΆκ° css μ λ¦¬ νμΌ
β   β   β   β   βββ themes          # .
β   β   β   β   βββ ...             # .
β   β   β   βββ ...                 # .
β   β   βββ ...
β   βββ auth                        # μ¬μ© μν¨
β   βββ components                  # κ³΅ν΅ component κ³΅κ°
β   β   βββ ...
β   β   βββ toast                   # toast (μλ μ°½ - μ¬μ© μν¨)
β   β   βββ vueChart                # vue-chart.js κ΄λ ¨ νμΌ
β   β   βββ breadcumb.vue           # λ©λ΄ νμ΄μ§ νμ΄ν
β   β   βββ customPagination.vue    # νμ΄μ§
β   β   βββ ...
β   βββ containers                  # κ³΅ν΅ layout (μ’μΈ‘ λ° μλ¨ λ©λ΄ layout)
β   β   βββ layout                  # .
β   β       βββ common              # μ¬μ© μν¨
β   β       βββ sideBar             # μ’μΈ‘ λ° μλ¨ λ©λ΄ layout
β   βββ data                        # μμ λ°μ΄ν° νμΌ (κ°λ°μ΄ν°)
β   β   βββ rawData                 # .
β   β   βββ ...                     # .
β   βββ filters                     # μ¬μ© μν¨
β   βββ lang                        # μΈμ΄λ³ λ²μ­ μ€μ  ex) kr, en
β   β   βββ i18n
β   β   β   βββ en.json             # μμ΄ - μ λ¦¬λμ§ μμ
β   β   β   βββ ko.json             # νκ΅­μ΄ - μ λ¦¬μ€
β   β   βββ lang.js                 # μΈμ΄ μ€μ  νμΌ
β   βββ lib                         # axios, api λ° κ³΅ν΅ js ν¨μ
β   β   βββ api                     # axios μ€μ  λ° api μ μ (λ©λ΄λ³ μ μ)
β   β   β   βββ client.js           # axios setting of default
β   β   β   βββ clientFile.js       # axios setting of file
β   β   βββ utils                   # μ€ μ¬μ© utils
β   β   β   βββ ...
β   β   β   βββ mixinUtils.js       # κ³΅ν΅μΌλ‘ μ¬μ©νλ μμ λ± mixinλ νμΌ
β   β   β   βββ ...                 # .
β   β   βββ apiUtil.js              #  api js νμΌ
β   β   βββ common.js               # μ¬μ© μν¨
β   β   βββ fncUtil.js              # κ³΅ν΅ js νμΌ
β   β   βββ globalVariable.js       # global μ¬μ© λ³μ μ μ (color λ§ μ¬μ©μ€)
β   βββ plugins                     # νλ¬κ·ΈμΈ κ΄λ ¨ νμΌ (νμΌ μμ± ν src/main.js μ μ§μ  μ°κ²°νμ)
β   βββ routes                      # λΌμ°ν° κ΄λ ¨ μ μ λνν λ¦¬
β   β   βββ router.js               # μ¬μ΄λλ° λ©λ΄λ router.js νμΌμ λ°μ΄ν°λ‘ λ§λ€μ΄μ§
β   βββ store                       # .
β   β   βββ modules                 # .
β   β   βββ getters.js              # .
β   β   βββ index.js                # .
β   βββ views                       # λ©λ΄λ₯Ό κΈ°μ€μΌλ‘ λλ ν λ¦¬ μ€μ 
β   β   βββ analysis                # λ°μ΄ν° λΆμ 
β   β   β   βββ anomaly             # μ΄μκ°μ§ λͺ¨λΈ λ§λ€κΈ°
β   β   β   βββ dataFlow            # .
β   β   β   βββ dataPreprocessing   # λ°μ΄ν° μ μ²λ¦¬
β   β   β   βββ eda                 # EDA μμνκΈ°
β   β   β   βββ machineLearning     # λ¨Έμ λ¬λ νμ΅νκΈ° 
β   β   βββ certificationSetting    # μΈμ¦μ κ΄λ¦¬
β   β   βββ dashboards              # λμλ³΄λ
β   β   βββ dataCollect             # λ°μ΄ν° μμ§
β   β   βββ dataMarket              # λ°μ΄ν° κ³΅μ 
β   β   βββ dataRetrieve            # λ°μ΄ν° μ‘°ν
β   β   βββ deviceSetting           # λλ°μ΄μ€ κ΄λ¦¬
β   β   βββ edgeSetting             # μ£μ§ μ€μ 
β   β   βββ pages                   # λ¨μΌ νμ΄μ§ (404, not permision)
β   β   βββ product                 # λ©μΈ νμ΄μ§
β   β   βββ sessions                # λ‘κ·ΈμΈ/λ‘κ·Έμμ/νμκ°μ
β   β   βββ sysmng                  # μμ€ν κ΄λ¦¬ 
β   β   β   βββ authorization       # μ¬μ©μ κΆν
β   β   β   βββ authorization       # provider μ μ© μ¬μ©μ(business) κΆν
β   β   β   βββ license             # λΌμ΄μ μ€ κ΄λ¦¬
|   |   β   βββ mngUserResource     # provider μ μ© μ¬μ©μ λ¦¬μμ€
|   |   β   βββ temporary           # μμ νμ΄μ§
|   |   β   βββ user                # μ¬μ©μ κ΄λ¦¬
β   β   β   βββ userResource        # μ¬μ©μ λ¦¬μμ€ νν©
β   β   βββ ...                     # .
β   βββ App.vue                     # .
β   βββ main.js                     # index νμΌ (μλ² μ΅μ΄ μ€ν νμΌ)
β   βββ vue-wrapper.js              # .
βββ .env                            # default νκ²½μ€μ  νμΌ
βββ .env.demo                       # demo νκ²½μ€μ  νμΌ (ssl)
βββ .env.dev                        # dev νκ²½μ€μ  νμΌ
βββ .eslintrc.js
βββ .gitignore
βββ babel.config.js                 # babel κ΄λ ¨ μ€μ  νμΌ
βββ debug.log
βββ package.json
βββ package-lock.json               #
βββ package-old.json                # μ¬μ© μν¨
βββ package-old-2.json              # μ¬μ© μν¨
βββ README.md
βββ vue.config.js                   # .
βββ yarn.lock

```

## 4. Common

### 1. toast

λ¦¬ν©ν λ§ μμ  (μ¬μ© μν¨)

```
      store.dispatch('toast/setToast', {
        id: String(new Date().getTime()),         // toast id - toastλ₯Ό μ€λ³΅μΌλ‘ λμ°κΈ° μν΄ μ¬μ©
        title: 'update anomaly',                  // toast title
        content: i18n.t('modal.processMes'),      // toast content
        timeout: 3000,                            // toast μ μ§ μκ°
        variant: 'success'                        // toast thema
      })
```

### 2. Sidebar (μ’μΈ‘ λ©λ΄)

- λ©λ΄ μμ± κ·μΉ
  - λΌμ°ν°λ₯Ό μμ±ν λ νμ μ±μ μν΄ λ©λ΄κ° νλλ§ μ‘΄μ¬νλλΌλ children κΈ°μ€μΌλ‘ μμ±
  - step κΈ°μ€
    - 0 : λ©λ΄ λΉνμ± (λ©λ΄λ§ λΉνμ± - url μ κ·Όμ λ§μ§ μμ - μΆν κ°λ° μμ )
    - 1 : 2deps κΉμ§ λ©λ΄ νμ±ν (ex λ°μ΄ν° μμ§, λ°μ΄ν° λΆμ λ±)
    - 2 : 1deps κΉμ§ λ©λ΄ νμ±ν (ex μ»€μ€ν λμλ³΄λ, λλ°μ΄μ€ κ΄λ¦¬ λ±)

* example code (router/admin.js)

      {
        path: '/app/dashboards',
        meta: {
          step: 1,                     // 0μΌ κ²½μ° λΉνμ±, 1μΌ κ²½μ° children νμ±ν, 2μΌ κ²½μ° children λΉνμ±
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
              step: 2,                // 0κ³Ό 2μ κ²½μ°λ§ μ¬μ©. 0μΌ κ²½μ° λΉνμ±, 2μΌ κ²½μ° νμ±ν
              title: i18n.t('monitoring.index'),
              description: i18n.t('monitoring.description.monitoring'),
              icon: '<i class="i-Bar-Chart text-19" />'
            },
            component: () => import('@/views/app/dashboards/monitoring')
          }
        ]
      },

### 3. i18n (λ€κ΅­μ΄)

- κ³΅ν΅ μ¬μ©

  - "common": {}
    - κ³΅ν΅μΌλ‘ μ¬μ©
  - "columns": {}
    - νμ΄λΈ columns μ λ¦¬
  - "button": {}
    - κ³΅ν΅μΌλ‘ μ¬μ©ν  button μ λ¦¬
  - "modal": {}
    - κ³΅ν΅μΌλ‘ μ¬μ©ν  modal μ λ¦¬

### 4. html pattern (validation)

| -      | λ΄μ©                                                                       | μ€λͺ        |
| ------ | -------------------------------------------------------------------------- | ----------- |
| Number | [0-9]+                                                                     | μ«μλ§ μλ ₯ |
| Ip     | ((^&#124;\.)((25[0-5])&#124;(2[0-4]\d)&#124;(1\d\d)&#124;([1-9]?\d))){4}\$ | νμ€νΈ3     |

ex) pattern="[0-9]+"

### 5. Store(Vuex)

μμ§ μμ ν μ λ¦½λμ§ μμ

- modules

  - --

- actions

  - --

- mutations
  - --

## 5. λΌμ΄μ μ€/μ¬μ©μ κΆν

