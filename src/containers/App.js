import React, { Component } from 'react'
import styles from './App.scss'
import * as api from '../utils/api'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  state = {
    categories: [],
    posts: []
  }

  componentDidMount () {
    api.getPosts().then(posts => {
			this.setState({ posts })
    })

    api.getCategories().then(categories => {
      this.setState({ categories })
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

export default App
