import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'

import { Provider } from 'react-redux'
import store from './components/redux/store'
import { MantineProvider } from '@mantine/core'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
