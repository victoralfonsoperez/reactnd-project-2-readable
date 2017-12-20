import React, { Component } from 'react'
import { connect } from 'react-redux'
//import styles from './App.scss'
import * as api from '../utils/api'
import { Switch, Route } from 'react-router-dom'
import { postCreator, postDeleter, getAllPosts, getAllCategories } from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'

class App extends Component {
  state = {
    categories: [],
    posts: []
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
          <Route path="/" render={() => (
            <Header categories={ this.props.appState.categories }></Header>
          )}/>
          
          <Route path="/" component={Posts}/>
      </div>
    )
  }
}

function mapStateToProps (appState) {
  return {
    appState
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
