export const deviceApplyModel = [
  {
    id: 1,
    deviceName: 'CNC1',
    // 'rawData.id': '1', // 외래키, device에 대한 정보(위치, 설치 공장 등) 가져오기 위함
    connectedEdgeId: 1,
    connectedEdgeName: 'Edge-01',
    // 'machineLearningModel.id': '', // 외래키, 적용된 모델id // 미적용??
    applyModelName: '',
    applyModelAlgorithm: '',
    applyDate: '',
    edgeOn: true
  },
  {
    id: 2,
    deviceName: 'CNC3',
    // 'rawData.id': '3',
    connectedEdgeId: 1,
    connectedEdgeName: 'Edge-01',
    // 'machineLearningModel.id': '',
    applyModelAlgorithm: '',
    applyModelName: '',
    applyDate: '',
    edgeOn: true
  },
  {
    id: 3,
    deviceName: 'CNC4',
    // 'rawData.id': '4',
    connectedEdgeId: 1,
    connectedEdgeName: 'Edge-01',
    // 'machineLearningModel.id': '4',
    applyModelAlgorithm: 'LogisticRegression',
    applyModelName: 'CNC4_speed_test_model_1',
    applyDate: '2021-04-23',
    edgeOn: false
  },
  {
    id: 4,
    deviceName: 'CNC4',
    // 'rawData.id': '4',
    connectedEdgeId: 1,
    connectedEdgeName: 'Edge-01',
    // 'machineLearningModel.id': '5',
    applyModelAlgorithm: 'RandomForest',
    applyModelName: 'CNC4_speed_test_model_2',
    applyDate: '2021-04-24',
    edgeOn: false
  }
]
