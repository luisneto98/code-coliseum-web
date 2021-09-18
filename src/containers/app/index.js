import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../hash-player'
import HashPlayer from '../hash-player'

const App = () => (
  <main>
    <Route exact path="/" component={Home} />
    <Route exact path="/hash-player" component={HashPlayer} />
  </main>
)

export default App
