import React, { Component } from 'react'
import styles from './Posts.scss'
import { connect } from 'react-redux'
import Post from './Post'
import { sorter } from '../actions'

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

    handleCHange = e => {
        const { target } = e
        this.props.sortPosts(target.value)
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
                    currentCategory === "" && posts && (
                        <div className={styles.sorter}>
                            <select onChange={this.handleCHange}>
                                <option value="timestamp">Sort by date</option>
                                <option value="voteScore">Sort by votes</option>
                            </select>
                        </div>
                    )
                }

                {
                    currentCategory !== "" && posts && posts.filter(post => post.category === currentCategory).map(post => (
                        <Post key={ post.id } post={ post }></Post>
                    ))
                }
                {
                    currentCategory === "" && posts && posts.length !== 0 && posts.map(post => (
                        <Post key={ post.id } post={ post }></Post>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments}) => (
    {
      posts: posts.posts,
      categories: posts.categories,
      currentpost: posts.currentpost
    }
)

const mapDispatchToProps = dispatch => (
    {
        sortPosts: data => dispatch(sorter(data))
    }
)

export default connect( mapStateToProps, mapDispatchToProps )(Posts)
