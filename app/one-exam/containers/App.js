import React from 'react'
import { observer } from 'mobx-react'
import '../css/street.scss'

@observer
export default class App extends React.Component {

  componentDidMount() {
    this.props.store.fetchData()
  }

  render() {
    const store = this.props.store
    let container

    if (store.groupList.length > 0) {
      container = (
        <div className="app-mrt-virtual ui-container ui-bg">
          <div>这个是要做api的</div>
        </div>
      )
    }

    return (
      <div className="app-mrt-virtual">
        {container}
      </div>
    )
  }
}
