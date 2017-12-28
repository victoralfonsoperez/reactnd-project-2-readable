import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './Post.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { postDeleter, currentPost } from '../actions'
import { NavLink, Link } from 'react-router-dom'

class Post extends Component {
  state = {}

  deletePost = id => {
    api.deletePost(id).then(data => {
      this.props.deleteOldPost(data.id)
    })
  }

  setActualPost = post => {
    this.props.setCurrentPost(post)
  }

  render() {
      const { post } = this.props

  return (
      <div className={styles.post}>
        <div className={styles.posthead}>
          <NavLink
            className={styles.posttitle}
            to={ `/${post.id}` }
            onClick={() => {this.setActualPost(post)}}
          >{ post.title }
          </NavLink>
          <div className={styles.postvote}>
            <FontAwesome.FaHeart/> <span className={styles.postvotescore}>{ post.voteScore }</span>
          </div>
        </div>
        <div className={styles.postbody}>
          <p>
            { post.body }
          </p>
        </div>

        <div className={styles.postfooter}>
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

          <NavLink
            to="/comment"
            className={styles.commentbutton}>
            <FontAwesome.FaComment/>
          </NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({posts, comments}) => (
  {
    posts,
    comments
  }
)

const mapDispatchToProps = dispatch => (
  {
    deleteOldPost: data => dispatch(postDeleter(data)),
    setCurrentPost: data => dispatch(currentPost(data))
  }
)

export default connect( mapStateToProps, mapDispatchToProps )(Post)
