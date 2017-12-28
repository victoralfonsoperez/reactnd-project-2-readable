import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './PostDetail.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { postDeleter, currentPost } from '../actions'
import Comment from './Comment'

class PostDetail extends Component {
    state = {
        post: {},
        comments: [],
        redirectToHome: false
    }

    deletePost = id => {
        api.deletePost(id)
            .then(data => {this.props.deleteOldPost(data.id)})
            .then(data => this.setState({ redirectToHome: true }))
    }

    setActualPost = post => {
        this.props.setCurrentPost(post)
    }

    componentDidMount() {
        let postid = this.props.location.pathname.replace(/^\/+/g, '')
        api.getSinglePost(postid)
            .then(currentpost => this.setState({ post: currentpost }))
        api.getPostComments(postid)
            .then(data => this.setState({ comments: data}))
    }

    render() {

        const { from } = this.props.location.state || '/'
        const { post, redirectToHome, comments } = this.state

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
                                    <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt={post.author}/>
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
                                <span className="post-comment-count-value">{ post.commentCount }</span>
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
                                    disabled={this.state.isDownVoteButtonDisabled}>
                                    <FontAwesome.FaThumbsODown/>
                                </button>

                                <button
                                    className={styles.upvotebutton}
                                    disabled={this.state.isUpVoteButtonDisabled}>
                                    <FontAwesome.FaThumbsOUp/>
                                </button>
                            </div>
                            {
                                redirectToHome && (
                                    <Redirect to={from || '/'}/>
                                )
                            }
                        </div>
                    </div>
                }
                {
                    <Link to="/comment">Create comment <FontAwesome.FaComment/></Link>
                }
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment}></Comment>)
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = appState => (
    {
      currentpost: appState.currentpost
    }
)

const mapDispatchToProps = dispatch => (
    {
      deleteOldPost: data => dispatch(postDeleter(data)),
      setCurrentPost: data => dispatch(currentPost(data))
    }
)

export default connect( mapStateToProps, mapDispatchToProps )(PostDetail)
