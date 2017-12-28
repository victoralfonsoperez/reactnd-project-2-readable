import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import styles from './CreatePost.scss'
import serializeForm from 'form-serialize'
import { postEditor, currentPost } from '../actions'
import { Redirect } from 'react-router'

class EditPost extends Component {
	state = {
        post: {},
        redirectToHome: false
    }

    componentDidMount() {
        let postid = this.props.location.pathname.replace(/^\/edit\/?/, '')
        api.getSinglePost(postid)
            .then(currentpost => this.setState({ post: currentpost }))
            .then(data => this.props.setCurrentPost(this.state.post))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ post: nextProps.currentpost })
    }

    submitData = (e, id) => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })

		api.editPost(id, values).then(data => {
			this.props.editPostData(id, data)
		}).then(
			this.setState({ redirectToHome: true })
		)
	}

    render() {
        const { from } = this.props.location.state || '/'
    	const { redirectToHome } = this.state
        const { post } = this.state
        const { categories } = this.props
        const { goBack } = this.props.history

        return (
            <div>
                {
                    post &&
                    <div>
                        <form className={styles.createpost_form} onSubmit={(e) => {this.submitData(e, post.id)}}>
                            <label className={styles.label} htmlFor="posttitle">Title</label>
                            <input
                                type="text"
                                id="posttitle"
                                key={ post.title }
                                defaultValue={ post.title }
                                placeholder="title"
                                name="title"
                                required
                            />
                            <label className={styles.label} htmlFor="postauthor">Author</label>
                            <input
                                defaultValue={ post.author }
                                required
                                id="postauthor"
                                placeholder="author"
                                key={ post.author }
                                name="author"
                                type="text"
                            />
                            <label className={styles.label} htmlFor="postbody">Body</label>
                            <textarea
                                name="body"
                                rows="4"
                                cols="50"
                                id="postbody"
                                placeholder="post body"
                                defaultValue={ post.body }
                                required
                                key={ post.body }
                                >
                            </textarea>

                            <label className={styles.selectcategory}>Please select a Category</label>
                            <div className={styles.availablecategories}>
                            {
                                categories && categories.map(category => (
                                    <span className={styles.category} key={ category.name }>
                                        <input defaultChecked={category.name === post.category} required type="radio" id={ category.name } name="category" value={ category.name }/>
                                        <label htmlFor={ category.name }>{ category.name }</label>
                                    </span>
                                ))
                            }
                            </div>

                            <button className={styles.submitpost}>Submit</button>
                    </form>

                    <button
                        className={styles.submitpost}
                        onClick={() => goBack()}
                        >
                        Cancel
                    </button>
                    </div>
                }

            {
                redirectToHome && (
                    <Redirect to={from || '/'}/>
                )
            }
            </div>
        )
    }
}

const mapStateToProps = ({posts, comments}) => (
    {
      currentpost: posts.currentpost,
      categories: posts.categories
    }
)

const mapDispatchToProps = dispatch => (
	{
        editPostData: (id, data) => dispatch(postEditor(id, data)),
        setCurrentPost: data => dispatch(currentPost(data))
	}
)

export default connect( mapStateToProps, mapDispatchToProps )(EditPost)
