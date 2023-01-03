export const algorithm = [
  {
    id: 1,
    img: require('@/assets/images/algorithm/RandomForest.png'),
    algorithmName: 'RandomForest',
    algorithmType: 'Supervised Learning',
    hyperparams_auto: false,
    hyperparams: {
      n_estimators: 100,
      criterion: 'gini',
      max_depth: 'null',
      min_samples_split: 2,
      min_samples_leaf: 1,
      // min_weight_fraction_leaf: '0.0',
      max_features: 'auto',
      max_leaf_nodes: null,
      // min_impurity_decrease: '0.0',
      min_impurity_split: null,
      bootstrap: true,
      oob_score: false,
      n_jobs: null,
      random_state: null,
      verbose: 0,
      warm_start: false,
      class_weight: null,
      // ccp_alpha: '0.0',
      max_samples: null
    }
  },
  {
    id: 2,
    img: require('@/assets/images/algorithm/XgBoost.png'),
    algorithmName: 'XgBoost',
    algorithmType: 'Supervised Learning',
    hyperparams_auto: false,
    hyperparams: {
      n_estimators: 100,
      objective: null,
      max_depth: null,
      learning_rate: null,
      verbosity: null,
      booster: null,
      tree_method: null,
      n_jobs: null,
      gamma: null,
      min_child_weight: null,
      max_delta_step: null,
      subsample: null,
      colsample_bytree: null,
      colsample_bylevel: null,
      colsample_bynode: null,
      reg_alpha: null,
      reg_lambda: null,
      scale_pos_weight: null,
      base_score: null,
      random_state: null,
      num_parallel_tree: null,
      monotone_constraints: null,
      interaction_constraints: null,
      importance_type: 'gain',
      gpu_id: null,
      validate_parameters: null
    }
  },
  {
    id: 3,
    img: require('@/assets/images/algorithm/LogisticRegression.png'),
    algorithmName: 'LogisticRegression',
    algorithmType: 'Supervised Learning',
    hyperparams_auto: false,
    hyperparams: {
      penalty: 'l2',
      dual: false,
      tol: '0.0001',
      C: '1.0',
      fit_intercept: true,
      intercept_scaling: 1,
      class_weight: null,
      random_state: null,
      solver: 'lbfgs',
      max_iter: 100,
      multi_class: 'auto',
      verbose: 0,
      warm_start: false,
      n_jobs: null,
      l1_ratio: null
    }
  },
  {
    id: 4,
    img: require('@/assets/images/algorithm/DBScan.png'),
    algorithmName: 'DBScan',
    algorithmType: 'unSupervised Learning',
    hyperparams_auto: false,
    hyperparams: {
      eps: '0.5',
      min_samples: 5,
      metric: 'euclidean',
      metric_params: null,
      algorithm: 'auto',
      leaf_size: 30,
      p: null,
      n_jobs: null
    }
  },
  {
    id: 5,
    img: require('@/assets/images/algorithm/K-means.png'),
    algorithmName: 'K-means',
    algorithmType: 'unSupervised Learning',
    hyperparams_auto: false,
    hyperparams: {
      n_clusters: 8,
      init: 'k-means++',
      n_init: 10,
      max_iter: 300,
      tol: '0.0001',
      precompute_distances: 'deprecated',
      verbose: 0,
      random_state: null,
      copy_x: true,
      n_jobs: 'deprecated',
      algorithm: 'auto'
    }
  }
]
