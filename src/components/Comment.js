import React, { Component } from 'react'
import styles from './Comment.scss'
import * as FontAwesome from 'react-icons/lib/fa'
import { NavLink } from 'react-router-dom'
import randomPic from '../utils/randompic'

class Comment extends Component {

    render() {

        const { comment } = this.props
        const upVote = {option: 'upVote'}
        const downVote = {option: 'downVote'}

        return (
            <div>
                {
                    comment && (
                        <div className={styles.comment}>
                            <div className={styles.commenthead}>
                                <div className={styles.commentauthorpicture}>
                                    <figure>
                                        <img className={styles.authorimage} src={randomPic()} alt=""></img>
                                    </figure>
                                </div>
                                <div className={styles.headerdata}>
                                    <div className={styles.commentauthorname}>{comment.author}</div>
                                    <span>{ new Date(comment.timestamp).toLocaleString() }</span>
                                </div>
                                <div className={styles.commentvotescore}>{comment.voteScore}</div>
                            </div>
                            <div className={styles.commentbody}>
                                <p>{comment.body}</p>
                            </div>

                            <div className={styles.commentactions}>
                                <NavLink
                                    to={`/editcomment/${comment.id}`}
                                    className={styles.commenteditbutton}
                                    onClick={() => {this.props.onSelectComment(comment)}}>
                                    <FontAwesome.FaEdit/>
                                </NavLink>

                                <button
                                    className={styles.commentdeletebutton}
                                    onClick={() => this.props.onDeleteComment(comment.id)}>
                                    <FontAwesome.FaTrashO/>
                                </button>

                                <button
                                    className={styles.commentdownvotebutton}
                                    onClick={() => this.props.onVoteComment(comment.id, downVote)}>
                                    <FontAwesome.FaMinusCircle/>
                                </button>

                                <button
                                    className={styles.commentupvotebutton}
                                    onClick={() => this.props.onVoteComment(comment.id, upVote)}>
                                    <FontAwesome.FaPlusCircle/>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Comment
