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
            return res // {data:{...}}
        })
        .catch(() => {
            throw new Error('Error')
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
export const getNMR = async (cacheToken, timeFrame) => {
    const query = `query negativeMarginReportQuery($cacheToken: String, $timeFrame: Int! ) {
    negativeMarginReport(cacheToken: $cacheToken, timeFrame: $timeFrame) ${baseQuery}
  }`

    const { data, errors } = await graphQLRequest(query, {
        cacheToken,
        timeFrame
    })

    errorHandler(errors)

    return data
}

export const toggleNegativeMargin = async (customerId, mccmnc) => {
    const query = `mutation toggleNegativeMarginVisibilityMutation($customerId: ID!, $mccmnc: ID) {
    toggleNegativeMarginVisibility (customerId: $customerId, mccmnc:$mccmnc)
  }`

    const { data, errors } = await graphQLRequest(query, {
        customerId,
        mccmnc
    })

    errorHandler(errors)

    return data
}

export const fetchReport = async timeFrame => {
    const request = (token = '') => {
        getNMR(token, timeFrame)
            .then(res => {
                const { items, pageInfo } = res.negativeMarginReport
                if (pageInfo.hasNextPage) {
                    offset += limit
                    // some logic here
                    request(pageInfo.cacheToken)
                } else {
                    // other logic here
                }
            })
            .catch(err => {
                throw new Error(err)
            })
    }
    request()
}
