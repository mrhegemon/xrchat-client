// eslint-disable-next-line
import App, { AppProps } from 'next/app'
import Head from 'next/head'
// eslint-disable-next-line
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'

import { fromJS } from 'immutable'
import { configureStore } from '../redux/store'
// eslint-disable-next-line
import { Store } from 'redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/assets/theme'
import { restoreState } from '../redux/persisted.store'
import { doLoginAuto } from '../redux/auth/service'

import getConfig from 'next/config'
import PageLoader from '../components/xr/scene/page-loader'

const config = getConfig().publicRuntimeConfig

interface Props extends AppProps {
  store: Store
}

class MyApp extends App<Props> {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    this.props.store.dispatch(restoreState())
    doLoginAuto(this.props.store.dispatch)
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <>
        <Head>
          <title>{config.title}</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <PageLoader Component={Component} pageProps={pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    )
  }
}
export default withRedux(configureStore, {
  serializeState: (state) => state.toJS(),
  deserializeState: (state) => fromJS(state)
})(MyApp)
