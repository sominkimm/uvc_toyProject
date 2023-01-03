import fanucData from '@/data/rawData/fanucData.json'
import fanuc0id from '@/data/rawData/fanuc0id.json'
import fanuc30id from '@/data/rawData/fanuc30id.json'

export default [
  {
    id: 1,
    img: require('@/assets/images/products/fanuc-30i.png'),
    deviceName: 'CNC1',
    deviceType: 'Fanuc30id',
    location: ['41.40338', '2.17403.'], // TO-DO 좌표값으로 지도 표시
    locationName: '경주공장',
    createdAt: '2019-10-29',
    tagdata: fanuc30id,
    rawdata: fanucData,
    rowsCount: 12031,
    typesCount: 12,
    dataCapacityMb: 1300,
    shared: true,
    rating: 5,
    productPrice: 1,
    discount: '20% off',
    badgeColor: 'badge-info',
    brand: 'fanuc'
  },
  {
    id: 2,
    img: require('@/assets/images/products/fanuc-30i.png'),
    deviceName: 'CNC2',
    deviceType: 'Fanuc30id',
    createdAt: '2021-3-10',
    tagdata: fanuc30id,
    rawdata: fanucData,
    location: ['41.40338', '2.17403.'], // TO-DO 좌표값으로 지도 표시
    locationName: '경주공장',
    rowsCount: 1300,
    typesCount: 10,
    dataCapacityMb: 300,
    shared: true,
    rating: 3,
    productPrice: 10,
    discount: '10% off',
    badgeColor: 'badge-warning',
    brand: 'fanuc'
  },
  {
    id: 3,
    img: require('@/assets/images/products/fs0ifcover.png'),
    deviceName: 'CNC3',
    deviceType: 'Fanuc0id',
    createdAt: '2021-3-10',
    tagdata: fanuc0id,
    rawdata: fanucData,
    location: ['41.40338', '2.17403.'], // TO-DO 좌표값으로 지도 표시
    locationName: '경주공장',
    rowsCount: 1300,
    typesCount: 10,
    dataCapacityMb: 300,
    shared: true,
    rating: 2,
    productPrice: 1,
    discount: '40% off',
    badgeColor: 'badge-danger',
    brand: 'fanuc'
  },
  {
    id: 4,
    img: require('@/assets/images/products/fs0ifcover.png'),
    deviceName: 'CNC4',
    deviceType: 'Fanuc0id',
    createdAt: '2021-3-10',
    tagdata: fanuc0id,
    rawdata: fanucData,
    location: ['41.40338', '2.17403.'], // TO-DO 좌표값으로 지도 표시
    locationName: '경주공장',
    rowsCount: 1300,
    typesCount: 10,
    dataCapacityMb: 700,
    shared: false,
    rating: 1,
    productPrice: 5,
    discount: '4% off',
    badgeColor: 'badge-info',
    brand: 'fanuc'
  },
  {
    id: 5,
    img: require('@/assets/images/products/fs0ifcover.png'),
    deviceName: 'CNC5-철판가공',
    deviceType: 'Fanuc0id',
    createdAt: '2021-3-10',
    location: ['41.40338', '2.17403.'], // TO-DO 좌표값으로 지도 표시
    locationName: '경주공장',
    tagdata: fanuc0id,
    rawdata: fanucData,
    rowsCount: 1300,
    typesCount: 10,
    dataCapacityMb: 200,
    shared: false,
    rating: 0,
    productPrice: 12,
    discount: '20% off',
    badgeColor: 'badge-primary',
    brand: 'fanuc'
  }
]
