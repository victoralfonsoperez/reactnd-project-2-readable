import React, { Component } from 'react'
import styles from './Posts.scss'
import { connect } from 'react-redux'
import Post from './Post'

class Posts extends Component {
    state = {
        posts: [],
        categories: [],
        currentCategory: '',
        currentpost: {}
    }

    componentDidMount() {
        //sets the currentCategory state when the page is reloaded
        this.setState({ currentCategory: this.props.location.pathname.replace(/^\/+/g, '') })
    }

    componentWillReceiveProps(nextProps) {
        //sets the posts and categories state when the component receives props
        this.setState({ posts: nextProps.posts })
        this.setState({ categories: nextProps.categories })
        this.setState({ currentpost: nextProps.currentpost })
    }

    render () {
        this.props.history.listen(location => {
            //updates the currentCategory state each time the route gets updated
            this.setState({ currentCategory: location.pathname.replace(/^\/+/g, '') })
        })

        const { posts, currentCategory } = this.state

        return (
            <div className={ styles.postscontainer }>
                {
                    currentCategory !== "" && posts && posts.filter(post => post.category === currentCategory).map(post => (
                        <Post key={ post.id } post={ post }></Post>
                    ))
                }
                {
                    currentCategory === "" && posts && posts.map(post => (
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
      categories: appState.categories,
      currentpost: appState.currentpost
    }
)

export default connect( mapStateToProps )(Posts)
