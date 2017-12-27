import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import * as api from '../utils/api'
import { Route, withRouter, Switch } from 'react-router-dom'
import { postDeleter, getAllPosts, getAllCategories, currentPost } from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import PostDetail from '../components/PostDetail'

class App extends Component {
  state = {
    categories: [],
    posts: [],
    currentCategory: '',
    currentpost: {}
  }

  componentDidMount () {
    let postid = this.props.location.pathname.replace(/^\/+/g, '')
    //fetching all the available posts from the api, then updating the store
    api.getPosts()
      .then(posts => this.setState({ posts }))
      .then(data => this.props.getPosts(this.state.posts))
    //fetching all the available categories from the api, then updating the store
    api.getCategories()
      .then(categories => this.setState({ categories }))
      .then(data => this.props.getCategories(this.state.categories))
    //fetch the currentpost data, given in the url, when the page gets refreshed
    api.getSinglePost(postid)
      .then(data => this.props.setCurrentPost(data))
  }

  componentWillReceiveProps(nextProps) {
    //sets the posts and categories state when the component receives props
    this.setState({ currentpost: nextProps.appState.currentpost })
  }

  render() {

    const { currentpost } = this.state

    return (
      <div className={styles.app}>
        <Route component={Header}/>
        <Route path="/" component={Posts}/>
        <Route exact path="/create" component={CreatePost}/>
        <Route path="/edit" component={EditPost}/>
        <Switch>
          <Route path={`/${currentpost.id}`} component={PostDetail}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = appState => (
  {
    appState
  }
)

const mapDispatchToProps = dispatch => (
  {
    getPosts: data => dispatch(getAllPosts(data)),
    getCategories: data => dispatch(getAllCategories(data)),
    deleteOldPost: data => dispatch(postDeleter(data)),
    setCurrentPost: data => dispatch(currentPost(data))
  }
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(App))
