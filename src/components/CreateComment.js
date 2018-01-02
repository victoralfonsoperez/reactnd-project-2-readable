import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import * as api from '../utils/api'
import styles from './CreateComment.scss'
import {  withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions/comments'
import { bindActionCreators } from 'redux'

class CreateComment extends Component {

    state = {
    }
    
    submitData = e => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })
		values.id = values.id.replace(/-/g, '')
        values.timestamp = parseInt(values.timestamp, 10)
        values.parentId = this.props.location.pathname.match(/\w+$/)[0]

		api.commentPost(values).then(data => {
			this.props.commentCreator(data)
		})

        this.props.history.goBack()
    }

    render() {

        return (
            <div className={styles.createcomment}>
                <h2 className={styles.componentheading}>Create new comment</h2>
				<form onSubmit={this.submitData} className={styles.createcommentform}>
					<input className={styles.hidden} type="text" readOnly name="id" value={uuidv1()}></input>
					<input className={styles.hidden} type="number" readOnly name="timestamp" value={Date.now()}></input>
                    <label className={styles.commentlabel} htmlFor="author">Author</label>
					<input
						id="author"
						name="author"
						placeholder="Post author"
						type="text"
						required
					/>
					<label className={styles.commentlabel} htmlFor="body">Body</label>
					<textarea
						cols="50"
						id="body"
						name="body"
						placeholder="Please enter the post body"
						rows="4"
						required
						>
					</textarea>
					<button className={styles.submitcomment}>Submit</button>
				</form>
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments, currentpost}) => (
    {
      posts,
      comments,
      currentpost
    }
)

const mapDispatchToProps = dispatch => (
	bindActionCreators(actions, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (CreateComment))
