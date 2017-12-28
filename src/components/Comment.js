import React, { Component } from 'react'
import styles from './Comment.scss'
import * as FontAwesome from 'react-icons/lib/fa'
import { NavLink } from 'react-router-dom'

class Comment extends Component {

    render() {

        const { comment } = this.props

        return (
            <div className={styles.comment}>
                <div>{comment.author}</div>
                <div>{comment.body}</div>
                <div>{comment.deleted}</div>
                <div>{comment.id}</div>
                <div>{comment.parentDeleted}</div>
                <div>{comment.parentId}</div>
                <div>{comment.timestamp}</div>
                <div>{comment.voteScore}</div>

                <div className={styles.postactions}>
                    <NavLink
                        to={`/editcomment/${comment.id}`}
                        className={styles.editbutton}
                        onClick={() => {}}>
                        <FontAwesome.FaEdit/>
                    </NavLink>

                    <button
                        className={styles.deletebutton}
                        onClick={() => {}}>
                        <FontAwesome.FaTrashO/>
                    </button>

                    <button
                        className={styles.downvotebutton}>
                        <FontAwesome.FaThumbsODown/>
                    </button>

                    <button
                        className={styles.upvotebutton}>
                        <FontAwesome.FaThumbsOUp/>
                    </button>
                </div>
            </div>
        )
    }
}



export default Comment
