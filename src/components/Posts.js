import React, { Component } from 'react'
import styles from './Posts.scss'
import * as api from '../utils/api'
import { connect } from 'react-redux'

class Posts extends Component {
    state = {
        filteredPosts: []
    }

    componentDidMount () {debugger
        //sets a filtered lists of posts by category each time the page reloads
        let currentLocation = this.props.location.pathname.replace(/^\/+/g, '')
        api.getCategoryPosts(currentLocation).then(filteredPosts => this.setState({ filteredPosts: filteredPosts })).catch(err => {
            console.log({ err: err }, 'Unexpected Error')
            throw err // Make sure cb gets the error
          })
    }

    render () {
        //filters the current appState lists of posts each time the route changes, showing just the ones that matches
        //avoiding extra request to the api server
        this.props.history.listen((location, action) => {
            const currentLocation = location.pathname.replace(/^\/+/g, '')
            let filteredPosts = this.props.posts && this.props.posts.filter(post => post.category === currentLocation)
            this.setState({ filteredPosts: filteredPosts })
        })

        return (
            <div className={ styles.postscontainer }>
                {
                    this.state.filteredPosts && this.props.location.pathname.replace(/^\/+/g, '') !== "" && this.state.filteredPosts.map(post => (
                        <div key={ post.id }>{ post.title }</div>
                    ))
                }
                {
                    this.props.posts && this.props.location.pathname.replace(/^\/+/g, '') === "" && this.props.posts.map(post => (
                        <div key={ post.id }>{ post.title }</div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (appState) => {
    return {
      posts: appState.posts
    }
}

export default connect( mapStateToProps )(Posts)
