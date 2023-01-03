/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function requestExceptionHandler (exception) {
  if (exception.response) {
    // Expected: RequestException
    const { status, data /*, statusText */ } = exception.response
    const isServerFault = status >= 500

    if (isServerFault) {
      // TODO: Send the {statusText} and {data} to logger server.
      return `Error ${status}: The fetching server has been a something wrong case.`
    } else {
      // This is the client fault
      return `Error ${status}: ${data}`
    }
  } else {
    // Unexpected: UnknownException
    return exception.message
  }
}


/***
 * 패스워드 조건
 * - 영문자, 숫자, 특수문자 포함
 * - 8~16 문자
 ***/
export function checkPasswordPattern (pass) {
  let message = ''

  // 비밀번호 문자열에 숫자 존재 여부 검사
  const pattern1 = /[0-9]/ // 숫자
  if (pattern1.test(pass) === false) {
    message = '* 비밀번호에 숫자가 입력되지 않았습니다!'
  }

  // 비밀번호 문자열에 영문 소문자 존재 여부 검사
  const pattern2 = /[a-z]/
  if (pattern2.test(pass) === false) {
    message = '* 비밀번호에 영문 소문자가 입력되지 않았습니다!'
  }

  // 비밀번호 문자열에 특수문자 존재 여부 검사
  const pattern4 = /[~!@#$%^&*()_+|<>?:{}]/ // 특수문자
  if (pattern4.test(pass) === false) {
    message = '* 비밀번호에 특수문자가 입력되지 않았습니다!'
  }

  // 비밀번호 문자열의 입력 길이 검사
  if (pass.length < 8 || pass.length > 16) {
    message = '* 비밀번호는 8자리 이상 16자리 이하만 가능합니다!'
  }

  return message
}

export function checkNumberZero (val) {
  return Number(val) === 0
}

export function checkEmpty (val) {
  if (val === null || val === undefined) {
    return true
  } else {
    return false
  }
}

export function checkHHLL (type, val) {
  let reDate = true

  switch (type) {
  case 'LL':
    if (!checkNumberZero(val.inL)) {
      if (val.inLL > val.inL) {
        reDate = 'LL Level Value is higher than L Level.'
        break
      }
    }

    if (!checkNumberZero(val.inH)) {
      if (val.inLL > val.inH) {
        reDate = 'LL Level Value is higher than H Level.'
        break
      }
    }

    if (!checkNumberZero(val.inHH)) {
      if (val.inLL > val.inHH) {
        reDate = 'LL Level Value is higher than HH Level.'
        break
      }
    }
    reDate = true
    break
  case 'L':
    if (!checkNumberZero(val.inLL)) {
      if (val.inL < val.inLL) {
        reDate = 'L Level Value is rower than LL Level.'
        break
      }
    }

    if (!checkNumberZero(val.inH)) {
      if (val.inL > val.inH) {
        reDate = 'L Level Value is higher than H Level.'
        break
      }
    }

    if (!checkNumberZero(val.inHH)) {
      if (val.inL > val.inHH) {
        reDate = 'L Level Value is higher than HH Level.'
        break
      }
    }
    reDate = true
    break
  case 'H':
    if (!checkNumberZero(val.inLL)) {
      if (val.inH < val.inLL) {
        reDate = 'H Level Value is rower than LL Level.'
        break
      }
    }

    if (!checkNumberZero(val.inL)) {
      if (val.inH < val.inL) {
        reDate = 'H Level Value is rower than H Level.'
        break
      }
    }

    if (!checkNumberZero(val.inHH)) {
      if (val.inH > val.inHH) {
        reDate = 'H Level Value is higher than HH Level.'
        break
      }
    }
    reDate = true
    break
  case 'HH':
    if (!checkNumberZero(val.inLL)) {
      if (val.inHH < val.inLL) {
        reDate = 'HH Level Value is rower than LL Level.'
        break
      }
    }

    if (!checkNumberZero(val.inL)) {
      if (val.inHH < val.inL) {
        reDate = 'HH Level Value is rower than H Level.'
        break
      }
    }

    if (!checkNumberZero(val.inH)) {
      if (val.inHH < val.inH) {
        reDate = 'HH Level Value is rower than HH Level.'
        break
      }
    }
    reDate = true
    break
  }

  return reDate
}

export function checkAnomalyHyperParameter (name, algorithmName, val) {
  const patternNum = '[0-9]+' // 숫자
  const patternAll = '[a-zA-Z0-9._-]+'
  const patternDecimal = '^[0-9]+(.[0-9]+)?$'

  let reDate = null
  let checkNum = []
  let checkString = []
  let checkDecimal = []
  switch (algorithmName) {
  case 'RandomForest':
    checkNum = [
      'n_estimators', 'max_depth', 'min_samples_split', 'min_samples_leaf',
      'min_weight_fraction_leaf', 'max_leaf_nodes', 'min_impurity_decrease',
      'min_impurity_split', 'n_jobs', 'random_state', 'verbose', 'ccp_alpha',
      'max_samples']
    checkString = []
    checkDecimal = []
    break
  case 'XgBoost':
    checkNum = ['n_estimators', 'max_depth', 'learning_rate', 'verbosity', 'n_jobs',
      'gamma', 'min_child_weight', 'max_delta_step', 'subsample', 'colsample_bytree',
      'colsample_bylevel', 'colsample_bynode', 'reg_alpha', 'reg_lambda', 'scale_pos_weight',
      'base_score', 'random_state', 'num_parallel_tree', 'gpu_id']

    checkString = ['objective', 'booster', 'tree_method', 'monotone_constraints',
      'interaction_constraints', 'importance_type']
    checkDecimal = []
    break
  case 'LogisticRegression':
    checkNum = ['tol', 'C', 'intercept_scaling', 'random_state', 'max_iter',
      'verbose', 'n_jobs', 'l1_ratio', 'class_weight']
    checkString = []
    checkDecimal = []
    break
  case 'DBScan':
    checkNum = ['checkNum', 'min_samples', 'metric_params', 'leaf_size', 'p', 'n_jobs']
    checkString = ['metric']
    checkDecimal = ['eps']
    break
  case 'Kmeans':
    checkNum = ['n_clusters', 'n_init', 'max_iter', 'tol', 'verbose', 'random_state', 'n_jobs']
    checkString = []
    checkDecimal = []
    break
  }

  if (checkNum.indexOf(name) !== -1) {
    reDate = patternNum
  } else if (checkString.indexOf(name) !== -1) {
    reDate = patternAll
  } else if (checkDecimal.indexOf(name) !== -1) {
    reDate = patternDecimal
  }
  return reDate
}


