import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import * as api from '../utils/api'
import styles from './CreatePost.scss'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

class CreatePost extends Component {
	state = {
	}
    
    componentDidMount() {
		//sets the currentCategory state when the page is reloaded
		const category = this.props.location.pathname.replace(/^\/+/g, '')
		const currentcat = (category && category !== 'create') || ''
		this.setState({ currentCategory: currentcat })
	}

    componentWillReceiveProps(nextProps) {
        //sets the categories state when the component receives props
        this.setState({ categories: nextProps.categories.categories })
    }

	submitData = e => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })
		values.id = values.id.replace(/-/g, '')
		values.timestamp = parseInt(values.timestamp, 10)
		values.voteScore = 0
		values.deleted = false
		values.commentCount = 0

		api.createPost(values).then(data => {
			this.props.postCreator(data)
		})
		
		this.props.history.goBack()
	}

    render() {

		const { categories } = this.props.categories

        return (
            <div className={styles.createpost}>
				<form onSubmit={this.submitData} className={styles.createpost_form}>
					<input className={styles.hidden} type="text" readOnly name="id" value={uuidv1()}></input>
					<input className={styles.hidden} type="number" readOnly name="timestamp" value={Date.now()}></input>
					<label className={styles.label} htmlFor="title">Title</label>
					<input
						id="title"
						name="title"
						placeholder="Post title"
						type="text"
						required
					/>
					<label className={styles.label} htmlFor="body">Body</label>
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
					<label className={styles.selectcategory}>Please select a Category</label>
					<div className={styles.availablecategories}>
					{
						categories && categories.map(category => (
							<span className={styles.category} key={ category.name }>
								<input required type="radio" id={ category.name } name="category" value={ category.name }/>
								<label htmlFor={ category.name }>{ category.name }</label>
							</span>
						))
					}
					</div>
					<button className={styles.submitpost}>Submit</button>
				</form>
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments, categories}) => (
    {
      categories
    }
)

const mapDispatchToProps = dispatch => (
	bindActionCreators(actions, dispatch)
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(CreatePost))
