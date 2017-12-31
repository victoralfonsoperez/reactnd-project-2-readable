import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as api from '../utils/api'
import styles from './CreateComment.scss'
import serializeForm from 'form-serialize'
import { currentComment, commentEditor } from '../actions'

class EditComment extends Component {
    state = {
        comment: {}
    }

    componentDidMount() {
        let commentid = this.props.location.pathname.replace(/^\/editcomment\/?/, '')
        api.getComment(commentid)
            .then(data => this.setState({ comment: data}))
            .then(data => this.props.setCurrentComment(this.state.comment))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comment: nextProps.comment })
    }

    submitData = (e, id) => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })

		api.editComment(id, values).then(data => {
			this.props.editCommentData(id, data)
        })
        
        this.props.history.goBack()
	}

    render() {

        const { comment } = this.state

        return (
            <div className={styles.createcomment}>
                <h2 className={styles.componentheading}>Edit comment</h2>
				<form onSubmit={(e) => this.submitData(e, comment.id)} className={styles.createcommentform}>
					<label className={styles.commentlabel} htmlFor="body">Body</label>
					<textarea
						cols="50"
						id="body"
                        name="body"
                        defaultValue={ comment.body }
						placeholder="Please enter the post body"
						rows="4"
						required
                        key={ comment.body }
						>
					</textarea>
					<button className={styles.submitcomment}>Submit</button>
				</form>
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments}) => (
    {
        comment: comments.currentcomment
    }
)

const mapDispatchToProps = dispatch => (
	{
        setCurrentComment: data => dispatch(currentComment(data)),
        editCommentData: (id, data) => dispatch(commentEditor(id, data)),
	}
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(EditComment))