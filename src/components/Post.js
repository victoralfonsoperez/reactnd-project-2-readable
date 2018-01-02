import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './Post.scss'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { postDeleter, currentPost, postVoter, setCurrentCategory } from '../actions'
import { NavLink, Link } from 'react-router-dom'
import randomPic from '../utils/randompic'

class Post extends Component {
  state = {}

  deletePost = id => {
    api.deletePost(id).then(data => {
      this.props.deleteOldPost(data.id)
    })
  }

  setActualPost = post => {
    this.props.setCurrentPost(post)
    this.props.setCurrentCat(post.category)
  }

  votePost = (id, vote) => {
    api.votePost(id, vote)
      .then(data => this.props.votePost(data))
  }

  render() {
    const { post } = this.props
    const upVote = {option: 'upVote'}
    const downVote = {option: 'downVote'}

  return (
      <div className={styles.post}>
        <div className={styles.posthead}>
          <NavLink
            className={styles.posttitle}
            to={`/${post.category}/${post.id}`}
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
    )
  }
}

const mapStateToProps = ({posts, comments, categories}) => (
  {
    posts,
    comments,
    categories
  }
)

const mapDispatchToProps = dispatch => (
  {
    deleteOldPost: data => dispatch(postDeleter(data)),
    setCurrentPost: data => dispatch(currentPost(data)),
    votePost: data => dispatch(postVoter(data)),
    setCurrentCat: data => dispatch(setCurrentCategory(data))
  }
)

export default connect( mapStateToProps, mapDispatchToProps )(Post)
