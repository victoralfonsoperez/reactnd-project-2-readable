import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import styles from './Post.scss'
import { NavLink } from 'react-router-dom'

class Post extends Component {
    state = {}

    render() {
        const { post } = this.props

    return (
        <div className={styles.post}>
          <div className={styles.posthead}>
            <NavLink className={styles.posttitle} to={ post.id }>{ post.title }</NavLink>
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
                <figcaption className={styles.postauthorfigcaption}>{post.author}</figcaption>
              </figure>
              <figcaption></figcaption>
            </div>

            <div className={styles.postdate}><FontAwesome.FaCalendarO />
              <span className={styles.postdatevalue}>{ new Date(post.timestamp).toLocaleString() }</span>
            </div>
          </div>
  
          <div className="post-comment-count"><FontAwesome.FaCommentsO />
            <span className="post-comment-count-value">{ post.commentCount }</span>
          </div>
  
          <div className="post-actions">
            <button><FontAwesome.FaEdit/></button>
            <button className="delete-button">
              <FontAwesome.FaTrashO/>
            </button>

            <button
              disabled={this.state.isDownVoteButtonDisabled}>
            <FontAwesome.FaThumbsODown/>
            </button>

            <button
              disabled={this.state.isUpVoteButtonDisabled}>
            <FontAwesome.FaThumbsOUp/>
            </button>

            <button className="comment-button"><FontAwesome.FaComment/></button>
          </div>

          <NavLink className="read-more"
            exact={true}
            to={ `/${post.id}` }>
              Read More
          </NavLink>

        </div>
      )
    }
  }

  export default Post
