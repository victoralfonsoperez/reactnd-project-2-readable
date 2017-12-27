import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './PostDetail.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { postDeleter, currentPost } from '../actions'

class PostDetail extends Component {
    state = {
        post: {},
        redirectToHome: false
    }

    deletePost = id => {
        api.deletePost(id)
            .then(data => {this.props.deleteOldPost(data.id)})
            .then(data => this.setState({ redirectToHome: true }))
    }

    componentDidMount() {
        let postid = this.props.location.pathname.replace(/^\/+/g, '')
        api.getSinglePost(postid)
            .then(currentpost => this.setState({ post: currentpost }))
    }

    render() {

        const { from } = this.props.location.state || '/'
        const { post, redirectToHome } = this.state

        return (
            <div>
                <h3>{ post.title }</h3>
                <FontAwesome.FaHeart/> <span className={styles.postvotescore}>{ post.voteScore }</span>
                <div className={styles.postbody}>
                    <p>
                        { post.body }
                    </p>
                </div>
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

                    <NavLink
                        to="/comment"
                        className={styles.commentbutton}>
                        <FontAwesome.FaComment/>
                    </NavLink>
                </div>
                {
					redirectToHome && (
						<Redirect to={from || '/'}/>
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
