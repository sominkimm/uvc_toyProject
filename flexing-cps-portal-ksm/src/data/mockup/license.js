export const license = [
  {
    id: 44,
    name: 'free',
    grantList: [
      {
        tableName: 'groups',
        grantList: [
          'SELECT'
        ]
      },
      {
        tableName: 'alarm_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'alarm_settings',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'anomalies',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'dashboards',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_analysis_flows',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_collect_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_preprocessing',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'datamarkets',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'devices',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edas',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edges',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'intelligence_decisions',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'license_types',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'licenses',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'machine_learning_models',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'modeler_projects',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'nodes',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'profiles',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'users',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'ALL SEQUENCES IN SCHEMA public',
        grantList: [
          'ALL PRIVILEGES'
        ]
      }
    ],
    menuAuth: [
      {
        monitoring: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        deviceSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        certificationSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        edgeSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        profileMaker: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        opcuaModeler: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataPreprocessing: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        eda: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        machineLearning: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataFlow: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        anomaly: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataMarket: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        tableRetrieve: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        user: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        authorization: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        userResource: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        }
      }
    ],
    price: 0,
    description: 'FREE LICENSE는 미리 설정된 디바이스 및 엣지의 데이터를 무료로 사용해볼 수 있습니다.',
    volume: 0,
    edgeQuantity: 0,
    createdAt: '2022-11-08T02:51:32.398Z',
    updatedAt: '2022-11-08T02:51:32.398Z'
  },
  {
    id: 43,
    name: 'lite',
    grantList: [
      {
        tableName: 'groups',
        grantList: [
          'SELECT'
        ]
      },
      {
        tableName: 'alarm_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'alarm_settings',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'anomalies',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'dashboards',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_analysis_flows',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_collect_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_preprocessing',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'datamarkets',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'devices',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edas',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edges',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'intelligence_decisions',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'license_types',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'licenses',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'machine_learning_models',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'modeler_projects',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'nodes',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'profiles',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'users',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'ALL SEQUENCES IN SCHEMA public',
        grantList: [
          'ALL PRIVILEGES'
        ]
      }
    ],
    menuAuth: [
      {
        monitoring: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        deviceSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        certificationSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        edgeSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        profileMaker: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        opcuaModeler: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataPreprocessing: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        eda: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        machineLearning: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataFlow: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        anomaly: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataMarket: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        tableRetrieve: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        user: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        authorization: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        userResource: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        }
      }
    ],
    price: 400000,
    description: 'LITE LICENSE는 데이터 분석 및 데이터 공유의 기능을 제외한 모든 메뉴를 사용해 볼 수 있습니다.',
    volume: 5,
    edgeQuantity: 5,
    createdAt: '2022-11-08T02:51:27.901Z',
    updatedAt: '2022-11-08T02:51:27.901Z'
  },
  {
    id: 42,
    name: 'pro',
    grantList: [
      {
        tableName: 'groups',
        grantList: [
          'SELECT'
        ]
      },
      {
        tableName: 'alarm_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'alarm_settings',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'anomalies',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'dashboards',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_analysis_flows',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_collect_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_preprocessing',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'datamarkets',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'devices',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edas',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edges',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'intelligence_decisions',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'license_types',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'licenses',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'machine_learning_models',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'modeler_projects',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'nodes',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'profiles',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'users',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'ALL SEQUENCES IN SCHEMA public',
        grantList: [
          'ALL PRIVILEGES'
        ]
      }
    ],
    menuAuth: [
      {
        monitoring: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        deviceSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        certificationSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        edgeSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        profileMaker: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        opcuaModeler: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataPreprocessing: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        eda: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        machineLearning: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataFlow: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        anomaly: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataMarket: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        tableRetrieve: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        user: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        authorization: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        userResource: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        }
      }
    ],
    price: 500000,
    description: 'PRO LICENSE는 FLEXiNG CPS 플랫폼의 모든 기능을 사용해 볼 수 있습니다.',
    volume: 15,
    edgeQuantity: 5,
    createdAt: '2022-11-08T02:51:23.237Z',
    updatedAt: '2022-11-08T02:51:23.237Z'
  },
  {
    id: 41,
    name: 'business',
    grantList: [
      {
        tableName: 'groups',
        grantList: [
          'SELECT'
        ]
      },
      {
        tableName: 'alarm_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'alarm_settings',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'anomalies',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'dashboards',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_analysis_flows',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_collect_histories',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'data_preprocessing',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'datamarkets',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'devices',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edas',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'edges',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'intelligence_decisions',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'license_types',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'licenses',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'machine_learning_models',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'modeler_projects',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'nodes',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'profiles',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'users',
        grantList: [
          'ALL PRIVILEGES'
        ]
      },
      {
        tableName: 'ALL SEQUENCES IN SCHEMA public',
        grantList: [
          'ALL PRIVILEGES'
        ]
      }
    ],
    menuAuth: [
      {
        monitoring: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        deviceSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        certificationSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        edgeSetting: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        profileMaker: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        opcuaModeler: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataPreprocessing: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        eda: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        machineLearning: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataFlow: {
          auth: {
            menu: false,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        anomaly: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        dataMarket: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        tableRetrieve: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        user: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        authorization: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        },
        userResource: {
          auth: {
            menu: true,
            create: true,
            read: true,
            update: true,
            delete: true
          }
        }
      }
    ],
    price: -1,
    description: 'BUSINESS LICENSE는 FLEXiNG CPS 플랫폼의 모든 기능을 용량 제한 없이 사용해 볼 수 있습니다.',
    volume: 50,
    edgeQuantity: -1,
    createdAt: '2022-11-08T02:51:18.036Z',
    updatedAt: '2022-11-08T02:51:18.036Z'
  }
]
