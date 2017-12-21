import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv1 from 'uuid/v1'
import styles from './CreatePost.scss'

class CreatePost extends Component {
	state = {
		visible: false
    }
    
    componentDidMount() {
        //sets the currentCategory state when the page is reloaded
        this.setState({ currentCategory: this.props.location.pathname.replace(/^\/+/g, '') })
    }

    componentWillReceiveProps(nextProps) {
        //sets the categories state when the component receives props
        this.setState({ categories: nextProps.categories })
    }

	toggleMenu = value => {
		this.setState({ visible: value })
	}

	submitData = (e) => {
		e.preventDefault()

		const values = serializeForm(e.target, { hash: true })
		values.timestamp = parseInt(values.timestamp, 10)
		values.commentCount = 0
		values.voteScore = 0
		values.deleted = false
	}

    render() {
        this.props.history.listen(location => {
            //updates the currentCategory state each time the route gets updated
            this.setState({ currentCategory: location.pathname.replace(/^\/+/g, '') })
        })

        const { categories } = this.state

        return (
            <div className="create-posts">
            	{
					!this.state.visible &&
					<button onClick={() => this.toggleMenu(true)}>Create New Post</button>
				}

				{
					this.state.visible &&
					<button onClick={() => this.toggleMenu(false)}>Cancel</button>
				}
				
				{
					this.state.visible && 
					<form onSubmit={this.submitData} className="create-post-form">
						<input
							type="text"
							placeholder="Post Title"
							name="title"
							required
						/>

						<input
							type="text"
							placeholder="author"
							name="author"
							required
						/>

                        {
                            this.state.currentCategory !== "" && <div>
                                <input className="hidden" type="text" readOnly name="category" value={ this.state.currentCategory }></input>
						        <input className="hidden" type="number" readOnly name="timestamp" value={Date.now()}></input>
						        <input className="hidden" type="text" readOnly name="id" value={uuidv1()}></input>
                            </div>
                        }

                        {
                            this.state.currentCategory === "" && <div>
                                Please select a Category for your post
                                {
                                    categories && categories.map(category => (
                                        <span key={ category.name }>
                                            <input required type="radio" id={ category.name } name="category" value={ category.name }/>
                                            <label htmlFor={ category.name }>{ category.name }</label>
                                        </span>
                                    ))
                                }
                                <input className="hidden" type="number" readOnly name="timestamp" value={Date.now()}></input>
						        <input className="hidden" type="text" readOnly name="id" value={uuidv1()}></input>
                            </div>
                        }

						<textarea
							name="body"
							rows="4"
							cols="50"
							placeholder="Please enter the post body"
							required
							>
						</textarea>

						<button>Submit</button>
					</form>
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

export default connect( mapStateToProps )(CreatePost)
