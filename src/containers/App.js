import React, { Component } from 'react'
import { connect } from 'react-redux'
//import styles from './App.scss'
import * as api from '../utils/api'
import { Route } from 'react-router-dom'
import { postCreator, postDeleter, getAllPosts, getAllCategories } from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'

class App extends Component {
  state = {
    categories: [],
    posts: [],
    currentCategory: ''
  }

  componentDidMount () {
    //fetching all the available posts from the api, then updating the store
    api.getPosts().then(posts => this.setState({ posts })).then(data => this.props.getPosts(this.state.posts))
    //fetching all the available categories from the api, then updating the store
    api.getCategories().then(categories => this.setState({ categories })).then(data => this.props.getCategories(this.state.categories))
  }

  render() {
    return (
      <div>
          <Route path="/" component={Header}/>
          <Route path="/" component={Posts}/>
      </div>
    )
  }
}

const mapStateToProps = appState => {
  return {
    appState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (data) => dispatch(getAllPosts(data)),
    getCategories: (data) => dispatch(getAllCategories(data)),
    createNewPost: (data) => dispatch(postCreator(data)),
    deleteOldPost: (data) => dispatch(postDeleter(data))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)
