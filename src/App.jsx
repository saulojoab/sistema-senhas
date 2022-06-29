import React from 'react'
import { Router } from '@reach/router'
import { Admin, Display, Terminal } from 'pages'

export default function App() {
  return (
    <Router>
      <Terminal path="/" />
      <Admin path="/admin" />
      <Display path="/display" />
    </Router>
  )
}
