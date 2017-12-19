import React, { Component } from 'react'
import { connect } from 'react-redux'
//import styles from './App.scss'
import * as api from '../utils/api'
import { Switch, Route } from 'react-router-dom'
import { postCreator, postDeleter, getAllPosts, getAllCategories } from '../actions'
import Header from '../components/Header'

class App extends Component {
  state = {
    categories: [],
    posts: []
  }

  componentDidMount () {
    //fetching all the available posts from the api, then updating the store
    api.getPosts().then(data => this.props.getPosts(data))
    //fetching all the available categories from the api, then updating the store
    api.getCategories().then(data => this.props.getCategories(data))
  }

  render() {

    const { posts } = this.props

    return (
      <Switch>
        <Route path="/" render={() => (
          <Header categories={ posts.categories }></Header>
        )}/>
      </Switch>
    )
  }
}

function mapStateToProps (posts) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (data) => dispatch(getAllPosts(data)),
    getCategories: (data) => dispatch(getAllCategories(data)),
    createNewPost: (data) => dispatch(postCreator(data)),
    deleteOldPost: (data) => dispatch(postDeleter(data))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)
