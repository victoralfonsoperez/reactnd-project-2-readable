import React, { Component } from 'react'
import styles from './App.scss'
import * as api from '../utils/api'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount () {
    api.getPosts().then((posts) => {
			this.setState({ posts })
    })
  }

  render() {
    return (
      <div className={styles.app}>
        {
          this.state.posts.map(post => (
            <div key={ post.id}>
              <h2>{ post.title }</h2>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App
