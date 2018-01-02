import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './PostDetail.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { NavLink, Link, withRouter } from 'react-router-dom'
import * as actions from '../actions'
import Comment from './Comment'
import randomPic from '../utils/randompic'
import { bindActionCreators } from 'redux'

class PostDetail extends Component {
    state = {
        post: {},
        comments: []
    }

    deletePost = id => {
        api.deletePost(id)
            .then(data => {this.props.postDeleter(data.id)})

        this.props.history.goBack()
    }

    currentComment = comment => {
        this.props.currentComment(comment)
    }

    deleteComment = id => {
        api.deleteComment(id)
            .then(data => this.props.commentDeleter(data.id))
            //updates the currentpost commentCount each time a comment is deleted
            .then(data => {
                this.setState(prevState => ({
                        ...prevState,
                        post: {
                            ...prevState.post,
                            commentCount: this.state.comments.length
                        }
                    })
                )
            })
    }

    voteComment = (id, vote) => {
        api.voteComment(id, vote)
            .then(data => this.props.commentVoter(data))
            .then(data => {
                this.setState(prevState => ({
                        ...prevState,
                        post: {
                            ...prevState.comment,
                            voteScore: data.id.voteScore,
                            voted: true
                        }
                    })
                )
            })
    }

    votePost = (id, vote) => {
        api.votePost(id, vote)
          .then(data => this.props.postVote(data))
          .then(data => {
            this.setState(prevState => ({
                    ...prevState,
                    post: {
                        ...prevState.post,
                        voteScore: data.id.voteScore,
                        voted: true
                    }
                })
            )
        })
      }

    setActualPost = post => {
        this.props.currentPost(post)
    }

    componentDidMount() {
        const postid = this.props.location.pathname.match(/\w+$/)[0]

        this.props.fetchPost(postid)
            .then(currentpost => this.setState({ post: currentpost.post }))

        api.getPostComments(postid)
            .then(data => this.props.commentGetter(data))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comments: nextProps.comments})
        this.setState({ currentpost: nextProps.currentpost})
    }

    render() {

        const { post, comments } = this.state
        const upVote = {option: 'upVote'}
        const downVote = {option: 'downVote'}

        return (
            <div>
                {
                    post &&
                    <div>
                        <div className={styles.postdetail}>
                            <div className={styles.postdetailhead}>
                                <h3 className={styles.postdetailtitle}>{ post.title }</h3>
                                <div className={styles.postdetailvote}>
                                    <FontAwesome.FaHeart/> <span className={styles.postvotescore}>{ post.voteScore }</span>
                                </div>
                            </div>
                            <div className={styles.postbody}>
                                <p>{ post.body }</p>
                            </div>
                            
                            <div className={styles.postdetaildata}>
                            <div className={styles.postauthor}>
                                <figure className={styles.postauthorpicture}>
                                    <img src={randomPic()} alt={post.author}/>
                                    <figcaption className={styles.postauthorfigcaption}>
                                        <span>by:</span> {post.author}<br/>
                                        <span>on:</span> <Link to={`/${post.category}`}>{post.category}</Link>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className={styles.postdate}><FontAwesome.FaCalendarO />
                                    <span className={styles.postdatevalue}>{ new Date(post.timestamp).toLocaleString() }</span>
                                </div>
                            </div>

                            <div className={styles.postcommentcount}><FontAwesome.FaCommentsO />
                                <span>Comments</span>
                                <span>{ post.commentCount }</span>
                            </div>

                            <div className={styles.postactions}>
                                <NavLink
                                    to={`/edit/${post.id}`}
                                    className={styles.editbutton}
                                    onClick={() => {this.setActualPost(post)}}>
                                    <FontAwesome.FaEdit/>
                                </NavLink>

                                <button
                                    className={styles.deletebutton}
                                    onClick={() => this.deletePost(post.id)}>
                                    <FontAwesome.FaTrashO/>
                                </button>

                                <button
                                    className={styles.downvotebutton}
                                    disabled={post.voted}
                                    onClick={() => this.votePost(post.id, downVote)}>
                                    <FontAwesome.FaMinusCircle/>
                                </button>

                                <button
                                    className={styles.upvotebutton}
                                    disabled={post.voted}
                                    onClick={() => this.votePost(post.id, upVote)}>
                                    <FontAwesome.FaPlusCircle/>
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    post && (
                        <Link
                            className={styles.createpostlink}
                            to={`/newcomment/${post.id}`}>Create comment
                        </Link>
                    )
                }
                {
                    post && comments && comments.length !== 0 && (
                        <h2 className={styles.commentheading}>COMMENTS</h2>
                    )
                }
                {
                    post && comments && comments.length !== 0 && comments.map(comment => (
                        <Comment
                            key={comment.id}
                            onDeleteComment={this.deleteComment}
                            onSelectComment={this.currentComment}
                            onVoteComment={this.voteComment}
                            comment={comment}>
                        </Comment>)
                    )
                }
                {
                    this.state.currentpost === null && (
                        <div>
                            <h3>Sorry, the requested post does not exist, but you can create one</h3>
                            <Link
                                className={styles.createpostlink}
                                to="/create">Create post
                            </Link>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments, categories }) => (
    {
      currentpost: posts.currentpost,
      comments: comments.comments,
      categories
    }
)

const mapDispatchToProps = dispatch => (
	bindActionCreators(actions, dispatch)
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(PostDetail))
