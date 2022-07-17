import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { gapi } from 'gapi-script'
import PostDetail from './components/PostDetail/PostDetail'
const clientId = '365843064339-dk68jjt6u3oa6jfsen1hmcqbbem5ooqt.apps.googleusercontent.com'
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId,
        scope: ''
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  return (
    <BrowserRouter >
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetail} />
          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App