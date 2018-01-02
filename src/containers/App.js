import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import * as api from '../utils/api'
import { Route, withRouter, Switch } from 'react-router-dom'
import { postDeleter, getAllPosts, getAllCategories, currentPost, setCurrentCategory } from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import PostDetail from '../components/PostDetail'
import CreateComment from '../components/CreateComment'
import EditComment from '../components/EditComment'

class App extends Component {
  state = {
    categories: [],
    posts: [],
    currentCategory: '',
    currentpost: {}
  }

  componentDidMount () {
    //gets the current post id from the url, then request the info to the API
    //when the pages gets refreshed and avoids returning a null value
    const currentpathname = (this.props.location.pathname.match(/\w+$/) && this.props.location.pathname.match(/\w+$/)[0]) || ''
    //avoids a bad request to the api
    const postid = currentpathname !== 'create' ? currentpathname : ''
    // eslint-disable-next-line
    const currentcat = this.props.location.pathname.replace(/^\/([^\/]*).*$/, '$1')
    //fetching all the available posts from the api, then updating the store
    api.getPosts()
      .then(posts => this.setState({ posts }))
      .then(data => this.props.getPosts(this.state.posts))
    //fetching all the available categories from the api, then updating the store
    api.getCategories()
      .then(categories => this.setState({ categories }))
      .then(data => this.props.getCategories(this.state.categories))
      .then(this.props.setCurrentCat(currentcat))
    //fetch the currentpost data, given in the url, when the page gets refreshed
    api.getSinglePost(postid)
      .then(data => this.props.setCurrentPost(data))
  }

  componentWillReceiveProps(nextProps) {
    //sets the posts and categories state when the component receives props
    this.setState({ currentpost: nextProps.posts.currentpost })
  }

  render() {

    const { currentcategory } = this.props.categories

    return (
      <div className={styles.app}>
        <Route component={Header}/>
        <Route path="/" component={Posts}/>
        <Switch>
          <Route exact path="/create" component={CreatePost}/>
          <Route exact path="/edit/" component={EditPost}/>
          <Route
            exact
            path={`/${currentcategory}/:id`}
            component={PostDetail}/>
        </Switch>
        <Route path="/newcomment/" component={CreateComment}></Route>
        <Route path="/editcomment/" component={EditComment}></Route>
      </div>
    )
  }
}

const mapStateToProps = ({posts, comments, categories}) => (
  {
    posts,
    comments,
    categories
  }
)

const mapDispatchToProps = dispatch => (
  {
    getPosts: data => dispatch(getAllPosts(data)),
    getCategories: data => dispatch(getAllCategories(data)),
    deleteOldPost: data => dispatch(postDeleter(data)),
    setCurrentPost: data => dispatch(currentPost(data)),
    setCurrentCat: data => dispatch(setCurrentCategory(data))
  }
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(App))
