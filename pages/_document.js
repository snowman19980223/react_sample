import React from 'react'
import Document, {Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {getAssetPath} from './doc-components'
import {utilities, markdown} from '../css'

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    return {
      ...page,
      styleTags: (
        <>
          <style id="primer-css">
            {utilities}
            {markdown}
          </style>
          {sheet.getStyleElement()}
        </>
      )
    }
  }

  render() {
    const {styleTags} = this.props

    return (
      <html lang="en">
        <head>
          <title>Primer Components</title>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126681523-1" />
          <script async href={getAssetPath('analytics.js')} />
          <meta charSet="utf8" />
          <link rel="icon" href={getAssetPath('favicon.png')} />
          <link rel="apple-touch-icon" href={getAssetPath('apple-touch-icon.png')} />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta property="og:title" content="Primer Components" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://primer.style/components/" />
          <meta property="og:description" content="Primer components built with React.js." />
          <meta property="og:image" content={getAssetPath('primer-components-og.png')} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="twitter:card" content={getAssetPath('primer-components-og.png')} />
          <meta property="twitter:site" content="@githubprimer" />
          {styleTags}
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
