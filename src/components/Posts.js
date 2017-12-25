import React, { Component } from 'react'
import styles from './Posts.scss'
import { connect } from 'react-redux'
import Post from './Post'
import { Link } from 'react-router-dom';

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
                {
                    this.state.posts && this.state.currentCategory !== "" && this.state.posts && this.state.currentCategory !== "create" && this.state.currentCategory !== "edit" && this.state.posts.filter(post => post.category === this.state.currentCategory).length === 0 && <span>There are no posts yet, be the first one! <Link to="/create">Create Post</Link></span>
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
