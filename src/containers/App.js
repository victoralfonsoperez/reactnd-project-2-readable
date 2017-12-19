import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import * as api from '../utils/api'
import { Switch, Route } from 'react-router-dom'
import { postCreator, postDeleter } from '../actions'

class App extends Component {

  state = {
    categories: [],
    posts: [],
    postComments: []
  }

  componentDidMount () {
    api.getPosts().then(posts => {
			this.setState({ posts })
    })

    api.getCategories().then(categories => {
      this.setState({ categories })
    })

    api.getPostComments('8xf0y6ziyjabvozdd253nd').then(postComments => {
      this.setState({ postComments })
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
        <div className={styles.app}>
          {
            this.state.posts.map(post => (
              <div key={ post.id}>
                <h2>{ post.title }</h2>
              </div>
            ))
          }
        </div>
        </Route>
      </Switch>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newPost: (data) => dispatch(postCreator(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
