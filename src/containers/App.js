import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import * as api from '../utils/api'
import { Switch, Route } from 'react-router-dom'
import { postCreator, postDeleter, getAllPosts } from '../actions'

class App extends Component {

  state = {
    categories: [],
    posts: []
  }

  componentDidMount () {
    //fetching all the available posts from the api, then updating the store
    api.getPosts().then(data => this.props.getPosts(data))
  }

  render() {

    const { posts } = this.props

    return (
      <Switch>
        <Route exact path="/">
        <div className={styles.app}>
          {
            posts.posts && posts.posts.map(post => (
              <div key={ post.id}>
                <h2>{ post.title }</h2>
              </div>
            ))
          }
        </div>
        </Route>
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
    createNewPost: (data) => dispatch(postCreator(data)),
    deleteOldPost: (data) => dispatch(postDeleter(data))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)
