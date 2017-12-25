import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import * as api from '../utils/api'
import { Route, withRouter } from 'react-router-dom'
import { postDeleter, getAllPosts, getAllCategories, currentPost } from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'

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
      <div className={styles.app}>
        <Route component={Header}/>
        <Route path="/" component={Posts}/>
        <Route exact path="/create" component={CreatePost}/>
        <Route path="/edit/" component={EditPost}/>
      </div>
    )
  }
}

const mapStateToProps = appState => (
  {
    appState
  }
)

const mapDispatchToProps = dispatch => (
  {
    getPosts: data => dispatch(getAllPosts(data)),
    getCategories: data => dispatch(getAllCategories(data)),
    deleteOldPost: data => dispatch(postDeleter(data))
  }
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(App))
