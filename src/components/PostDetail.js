import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './PostDetail.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { postDeleter, currentPost, commentGetter , commentDeleter, currentComment, commentVoter, postVote } from '../actions'
import Comment from './Comment'
import randomPic from '../utils/randompic'

class PostDetail extends Component {
    state = {
        post: {},
        comments: []
    }

    deletePost = id => {
        api.deletePost(id)
            .then(data => {this.props.deleteOldPost(data.id)})
        this.props.history.goBack()
    }

    currentComment = comment => {
        this.props.setCurrentComment(comment)
    }

    deleteComment = id => {
        api.deleteComment(id)
            .then(data => this.props.deleteComment(data.id))
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
            .then(data => this.props.voteComment(data))
    }

    votePost = (id, vote) => {
        api.votePost(id, vote)
          .then(data => this.props.votePost(data))
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
        this.props.setCurrentPost(post)
    }

    componentDidMount() {
        let postid = this.props.location.pathname.replace(/^\/+/g, '')
        api.getSinglePost(postid)
            .then(currentpost => this.setState({ post: currentpost }))
        api.getPostComments(postid)
            .then(data => this.props.getComments(data))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comments: nextProps.comments.comments})
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
                    <Link
                        className={styles.createpostlink}
                        to={`/newcomment/${post.id}`}>Create comment
                    </Link>
                }
                {
                    comments && comments.length !== 0 && (
                        <h2 className={styles.commentheading}>COMMENTS</h2>
                    )
                }
                {
                    comments && comments.length !== 0 && comments.map(comment => (
                        <Comment
                            key={comment.id}
                            onDeleteComment={this.deleteComment}
                            onSelectComment={this.currentComment}
                            onVoteComment={this.voteComment}
                            comment={comment}>
                        </Comment>)
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments}) => (
    {
      currentpost: posts.currentpost,
      comments
    }
)

const mapDispatchToProps = dispatch => (
    {
      deleteOldPost: data => dispatch(postDeleter(data)),
      setCurrentPost: data => dispatch(currentPost(data)),
      getComments: data => dispatch(commentGetter(data)),
      deleteComment: data => dispatch(commentDeleter(data)),
      setCurrentComment: data => dispatch(currentComment(data)),
      voteComment: data => dispatch(commentVoter(data)),
      votePost: data => dispatch(postVote(data)),
    }
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(PostDetail))
