
// 商户类型
const MerchantType = {
  // 意向商户
  INTENDED_TYPE: 'INTENDED_TYPE',
  // 非意向商户
  NON_INTENDED_TYPE: 'NON_INTENDED_TYPE',
  // 线索商户
  CLUE_TYPE: 'CLUE_TYPE',
  // 标准店商户
  STANDARD_MERCHANT_TYPE: 'STANDARD_MERCHANT_TYPE'
}

// 获取商户类型中文描述
function getMerchantTypeDesc(type) {
  switch (type || '') {
    case MerchantType.INTENDED_TYPE:
      return "意向商户"
    case MerchantType.NON_INTENDED_TYPE:
      return "非意向商户"
    case MerchantType.CLUE_TYPE:
      return "线索商户"
    case MerchantType.STANDARD_MERCHANT_TYPE:
      return "标准店商户"
    default:
      return ""
  }
}

// 商户分级
const MerchantIntentionRank = {
  // 意向商户
  A: 'INTENTION_RANK_A',
  // 非意向商户
  B: 'INTENTION_RANK_B',
  // 线索商户
  C: 'INTENTION_RANK_C'
}

// 获取商户类型中文描述
function getMerchantIntentionRankDesc(type) {
  switch (type || '') {
    case MerchantIntentionRank.A:
      return "A"
    case MerchantIntentionRank.B:
      return "B"
    case MerchantIntentionRank.C:
      return "C"
    default:
      return ""
  }
}

// 分类
const OrderCategory = {
    CrowdFunding: 'CrowdFunding',
    PreSale: 'PreSale',
    Normal: 'Normal'
};

/// 获取订单类型 CrowdFunding: '众筹进货',PreSale: '预售进货',Normal: '常规进货'
function getOrderCategoryDesc(category) {
    switch (category || '') {
      case OrderCategory.CrowdFunding:
          return "众筹进货"
      case OrderCategory.PreSale:
          return "预售进货"
      case OrderCategory.Normal:
          return "常规进货"
      default:
          return ""
    }
}

// 订单状态
const OrderStatus = {

  /// 待审核放款
  WaitLoan: "WAIT_LOAN",

  /// 待支付
  Paying: "PAYING",

  /// 已取消
  Canceled: "CANCELED",

  /// 待支付定金
  AwaitingFrontMoney: "AWAITING_FRONTMONEY",

  /// 待支付尾款
  AwaitingRestMoney: "AWAITING_RESTMONEY",

  /// 已完成
  Finished: "FINISHED",

  /// 处理中
  Processing: "PROCESSING",
};

/// 状态
/// Paying：待支付，AwaitingVehicle：待交车，VehicleReceived：已收车，PostSale：售后，Canceled：已取消
function getOrderStatusDesc(status) {
  if (status === OrderStatus.Processing) {
    return "处理中"
  }
  switch (status || '') {
    case OrderStatus.WaitLoan:
      return "待审核放款"
    case OrderStatus.Paying:
      return "待支付"
    case OrderStatus.AwaitingFrontMoney:
      return "待支付定金"
    case OrderStatus.AwaitingRestMoney:
      return "待支付尾款"
    case OrderStatus.Canceled:
      return "已取消"
    case OrderStatus.AwaitingVehicle:
      return "待收货"
    case OrderStatus.Finished:
      return "订单完成"
    default:
      return ""
  }
}

/// 状态颜色
function getOrderStatusColor(status) {
  if (status === OrderStatus.Processing) {
    return '#ff0000'
  }
  switch (status || '') {
    case OrderStatus.Finished, OrderStatus.Canceled:
      return '#4a4a4a'
    default:
      return '#ff0000'
  }
}

/**
 *  物流状态 PENDING：待交车，WAITING：待收车，RECEIVED：已收车，FINISHED：已完成
 */
const LogisticsStatus = {
  PENDING: 'PENDING',
  WAITING: 'WAITING',
  RECEIVED: 'RECEIVED',
  FINISHED: 'FINISHED'
};

function getLogisticsStatus(status) {
  switch (status || '') {
    case LogisticsStatus.PENDING:
      return "待交车"
    case LogisticsStatus.WAITING:
      return "待收车"
    case LogisticsStatus.RECEIVED:
      return "已收车"
    case LogisticsStatus.FINISHED:
      return "已完成"
    default:
      return ""
  }
}


module.exports = {
  OrderStatus: OrderStatus,
  getOrderStatusColor: getOrderStatusColor,
  getOrderCategoryDesc: getOrderCategoryDesc,
  getOrderStatusDesc: getOrderStatusDesc,
  getLogisticsStatus: getLogisticsStatus,

  MerchantType: MerchantType,
  getMerchantTypeDesc: getMerchantTypeDesc,

  getMerchantIntentionRankDesc: getMerchantIntentionRankDesc,
  MerchantIntentionRank: MerchantIntentionRank
}