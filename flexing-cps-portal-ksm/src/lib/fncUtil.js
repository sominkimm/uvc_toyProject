// 어디에도 소속되지 못할 일반적인 함수/변수 모음
import PasswordValidator from 'password-validator'

// api용 응답 result 세팅
const setApiResult = (responseData) => {
  const result = {
    status: responseData.status,
    code: responseData.code,
    message: responseData.message
  }

  return result
}

// noAuth용 응답 result 세팅
const setNoAuthResult = () => {
  const result = {
    status: 403,
    code: 'NOAUTH',
    message: null
  }

  return result
}

// 토큰 만료 응답 result 세팅
const setExpiredTokenResult = () => {
  const result = {
    status: 401,
    code: 'UNAUTHORIZED_ACCESSTOKEN',
    message: null
  }

  return result
}

// 패스워드 validation
const checkPasswordValidator = (value) => {
  const schema = new PasswordValidator()
  schema
    .is()
    .min(8) // 최소 8자리
    .is()
    .max(50) // 최대 50자리
    .has()
    .uppercase() // 영문 대문자 반드시 포함
    .has()
    .lowercase() // 영문 소문자 반드시 포함
    .has()
    .digits(1) // 숫자 최소 1개 반드시 포함
    .has()
    .symbols(1) // 특수문자 최소 1개 반드시 포함
    .has()
    .not()
    .spaces() // 공백 허용 안함

  return schema.validate(value)
}

// 접속 코드 validation
const checkAccessCodeValidator = (value) => {
  const schema = new PasswordValidator()
  schema
    .is()
    .max(100) // 최대 100자리
    .has()
    .not()
    .spaces() // 공백 허용 안함

  const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 한글 제한
  const checkChar = /[`~!@#$%^&*()_|+\-=?;:'",.<>\\{\\}\\[\]\\\\/ ]/gim // 특수 문자 제한
  if (checkKo.test(value)) {
    return false
  } else if (checkChar.test(value)) {
    return false
  } else {
    return schema.validate(value)
  }

  // return schema.validate(value)
}

// 목업 데이터 여부
const isMockupData = () => {
  if (process.env.VUE_APP_MOCKUP_DATA === 'true') {
    return true
  } else {
    return false
  }
}

// 중복 데이터 여부
const isDuplicatedData = (val) => {
  if (val === 'BAD_REQUEST_DUPLICATED') {
    return true
  } else {
    return false
  }
}

export default {
  setApiResult,
  setNoAuthResult,
  setExpiredTokenResult,
  checkPasswordValidator,
  checkAccessCodeValidator,
  isMockupData,
  isDuplicatedData
}
