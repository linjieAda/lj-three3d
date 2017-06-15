import React from 'react'
import { render } from 'react-dom'
import Container from './containers/App'
import Store from './controllers/store'
import { useStrict } from 'mobx'

useStrict(true)

render(
  <Container store={Store} />,
  document.getElementById('app')
)
