import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import * as api from '../utils/api'
import styles from './CreateComment.scss'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { commentCreator } from '../actions'

class CreateComment extends Component {

    state = {
		redirectToHome: false
    }
    
    submitData = e => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })
		values.id = values.id.replace(/-/g, '')
        values.timestamp = parseInt(values.timestamp, 10)
        values.parentId = this.props.location.pathname.match(/\w+$/)[0]

		api.commentPost(values).then(data => {
			this.props.createNewComment(data)
		}).then(
			this.setState({ redirectToHome: true })
        )
        
        //this.props.history.goBack()
    }

    render() {

        const { from } = this.props.location.state || '/'
        const { redirectToHome } = this.state

        return (
            <div className={styles.createcomment}>
				<form onSubmit={this.submitData} className={styles.createcommentform}>
					<input className={styles.hidden} type="text" readOnly name="id" value={uuidv1()}></input>
					<input className={styles.hidden} type="number" readOnly name="timestamp" value={Date.now()}></input>
					<label className={styles.label} htmlFor="title">Title</label>
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
					<label className={styles.label} htmlFor="author">Author</label>
					<input
						id="author"
						name="author"
						placeholder="Post author"
						type="text"
						required
					/>
					<button className={styles.submitpost}>Submit</button>
				</form>
				{
					redirectToHome && (
						<Redirect to={from || '/'}/>
					)
				}
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
	{
        createNewComment: data => dispatch(commentCreator(data))
	}
)

export default connect(mapStateToProps, mapDispatchToProps) (CreateComment)
