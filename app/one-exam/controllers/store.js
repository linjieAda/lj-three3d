import { observable, action } from 'mobx'
import { getURLParameter } from 'sspquery'
import { queryForGetMarket } from './query'
import { setDocumentTitle } from 'utils/setDocumentTitle'

class StreetStore {
  @observable title = ''
  @observable bannerImg = ''
  @observable groupList = []

  @action update(title, bannerImg, groupList) {
    this.title = title
    this.bannerImg = bannerImg
    this.groupList = groupList
  }

  fetchData() {
    let preView = 0
    if (getURLParameter('preView')) {
      // 如果url有preView就传预览
      preView = 1
    }
    queryForGetMarket(getURLParameter('code'), preView, ::this.parseData)
  }

  parseData(data) {
    if (data.success === true) {
      const ret = data.ret
      this.update(
        ret.title,
        ret.imageUrl,
        ret.groupOperatorInfos,
      )
      this.init(ret)
    }
  }

  init(ret) {
    setDocumentTitle(ret.title)
  }

}

export default new StreetStore
