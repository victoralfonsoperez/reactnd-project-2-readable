import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import { NavLink } from 'react-router-dom'

class Post extends Component {
    state = {}

    render() {
        const { post } = this.props

    return (
        <div className="post">
          <NavLink to={ post.id }>{ post.title }</NavLink>
          <div className="post-vote">
            votes: <span className="post-vote-score">{ post.voteScore }</span>
          </div>

          <div className="post-body">
            <p>
              { post.body }
            </p>
          </div>

          <div className="post-author">
            <FontAwesome.FaUser/>
            <span className="post-author-name">{ post.author }</span>
          </div>

          <div className="post-date"><FontAwesome.FaCalendarO />
            <span className="post-date-value">{ new Date(post.timestamp).toLocaleString() }</span>
          </div>
  
          <div className="post-comment-count"><FontAwesome.FaCommentsO />
            <span className="post-comment-count-value">{ post.commentCount }</span>
          </div>
  
          <div className="post-actions">
            <button><FontAwesome.FaEdit/></button>
            <button onClick={() => this.deletePost(post.id)} className="delete-button">
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
