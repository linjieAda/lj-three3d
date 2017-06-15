import { query } from 'sspquery'

export const queryForGetMarket = (code, preView, success) => {
  if (preView !== 1) {
    query({ method: 'operatorInfo.query', code }, success)
  } else {
    query({ method: 'operatorInfo.query', code, preView }, success)
  }
}
