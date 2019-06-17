// axios request
export const graphQLRequest = async (query, variables = {}) => {
  const response = await axios({
    url: '/graphql',
    method: 'post',
    data: {
      query,
      variables
    }
  })
    .then(res => {
      return res
    })
    .catch(() => {
      throw new Error(
        'Something went wrong in graphQLRequest, check your request'
      )
    })

  return response.data
}

// base query
export const baseQuery = `{
    items {
        customer{
        id
        name
        company
        businessType
      }
      accountManager{
        id
        name
      }
      gateway{
        id
      }
      mccmnc{
        value
        operator
      }
      purchaseRateSmsPerUnit
      purchaseRateLookupPerUnit
      salesRatePerUnit
      margin
      volume
      isVisible
      routingCollection{
        id
        name
      }
    }
    pageInfo {
      cacheToken
      hasNextPage
    }
  }`

// error handling
export const errorHandler = errors => {
  if (errors) {
    throw new Error(errors.map(error => error.message).join('\n'))
  }
}

// handlers
export const getNMR = async (cacheToken, timeFrame, range, offset, limit) => {
  const query = `query negativeMarginReportQuery($cacheToken: String, $timeFrame: Int!, $shouldShowHidden: Boolean, $offset: Int, $limit: Int, $marginTotalGe: Float, $marginTotalLe: Float ) {
    negativeMarginReport(cacheToken: $cacheToken, timeFrame: $timeFrame, shouldShowHidden: $shouldShowHidden, offset: $offset, limit: $limit, marginTotalGe: $marginTotalGe, marginTotalLe: $marginTotalLe ) ${baseQuery}
  }`
  const { data, errors } = await graphQLRequest(query, {
    cacheToken,
    timeFrame,
    shouldShowHidden: true,
    offset,
    limit,
    marginTotalLe: range.le,
    marginTotalGe: range.ge
  })

  errorHandler(errors)

  return data
}




export const getAccountManagers = async () => {
  const query = `query accountManagerstQuery {
    accountManagers {
      id
      name
  }
  }`
  const { data, errors } = await graphQLRequest(query)

  errorHandler(errors)

  return data
}

export const toggleNegativeMargin = async (
  customerId,
  mccmnc,
  gatewayId,
  routingProfileId
) => {
  const query = `mutation toggleNegativeMarginVisibilityMutation($customerId: ID!, $mccmnc: ID, $gatewayId: ID) {
  toggleNegativeMarginVisibility (customerId: $customerId, mccmnc:$mccmnc, gatewayId: $gatewayId)
}`

  const { data, errors } = await graphQLRequest(query, {
    customerId,
    mccmnc,
    gatewayId,
    routingProfileId
  })

  errorHandler(errors)

  return data
}

