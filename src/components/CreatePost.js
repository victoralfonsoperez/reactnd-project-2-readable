import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import * as api from '../utils/api'
import styles from './CreatePost.scss'
import { postCreator } from '../actions'
import { Redirect } from 'react-router'

class CreatePost extends Component {
	state = {
		redirectToHome: false
	}
    
    componentDidMount() {
        //sets the currentCategory state when the page is reloaded
		this.setState({ currentCategory: this.props.location.pathname.replace(/^\/+/g, '') })
	}

    componentWillReceiveProps(nextProps) {
        //sets the categories state when the component receives props
        this.setState({ categories: nextProps.categories })
    }

	submitData = e => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })
		values.timestamp = parseInt(values.timestamp, 10)
		values.voteScore = 0
		values.deleted = false
		values.commentCount = 0

		api.createPost(values).then(data => {
			this.props.createNewPost(data)
		}).then(
			this.setState({ redirectToHome: true })
		)
	}

    render() {
        this.props.history.listen(location => {
            //updates the currentCategory state each time the route gets updated
			this.setState({ currentCategory: location.pathname.replace(/^\/+/g, '') })
			this.setState({ categories: this.props.categories })
        })

		const { from } = this.props.location.state || '/'
		const { redirectToHome } = this.state
		const { categories } = this.props

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
				{
					redirectToHome && (
						<Redirect to={from || '/'}/>
					)
				}
            </div>
        )
    }
}

const mapStateToProps = appState => (
    {
      categories: appState.categories
    }
)

const mapDispatchToProps = dispatch => (
	{
		createNewPost: data => dispatch(postCreator(data))
	}
)

export default connect( mapStateToProps, mapDispatchToProps )(CreatePost)
