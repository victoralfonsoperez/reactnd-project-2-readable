import React, { Component } from 'react'
import styles from './Posts.scss'
import { connect } from 'react-redux'
import Post from './Post'

class Posts extends Component {
    state = {
        posts: [],
        categories: [],
        currentCategory: ''
    }

    componentDidMount() {
        //sets the currentCategory state when the page is reloaded
        this.setState({ currentCategory: this.props.location.pathname.replace(/^\/+/g, '') })
    }

    componentWillReceiveProps(nextProps) {
        //sets the posts and categories state when the component receives props
        this.setState({ posts: nextProps.posts })
        this.setState({ categories: nextProps.categories })
    }

    render () {
        this.props.history.listen(location => {
            //updates the currentCategory state each time the route gets updated
            this.setState({ currentCategory: location.pathname.replace(/^\/+/g, '') })
        })

        return (
            <div className={ styles.postscontainer }>
                {
                    this.state.currentCategory !== "" && this.state.posts && this.state.posts.filter(post => post.category === this.state.currentCategory).map(post => (
                        <Post key={ post.id } post={ post }></Post>
                    ))
                }
                {
                    this.state.currentCategory === "" && this.state.posts && this.state.posts.map(post => (
                        <Post key={ post.id } post={ post }></Post>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = appState => (
    {
      posts: appState.posts,
      categories: appState.categories
    }
)

export default connect( mapStateToProps )(Posts)
