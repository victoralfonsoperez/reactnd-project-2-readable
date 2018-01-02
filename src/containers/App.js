import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './App.scss'
import { Route, withRouter, Switch } from 'react-router-dom'
import * as actions from '../actions'
import Header from '../components/Header'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import PostDetail from '../components/PostDetail'
import CreateComment from '../components/CreateComment'
import EditComment from '../components/EditComment'
import { bindActionCreators } from 'redux'

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
    //fetching all the available posts from the api, then updating the store trough thunk
    this.props.fetchPosts()
    //fetching all the available categories from the api, then updating the store
    this.props.fetchCategories(currentcat)
      .then(categories => this.setState({ categories: categories.categories }))
    //fetch the currentpost data, given in the url, when the page gets refreshed
    this.props.fetchPost(postid)
      .then(currentpost => this.setState({ post: currentpost.post }))
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
          <Route path="/edit/" component={EditPost}/>
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

const mapStateToProps = ({posts, comments, categories, currentpost}) => (
  {
    posts,
    comments,
    categories,
    currentpost
  }
)

const mapDispatchToProps = dispatch => (
	bindActionCreators(actions, dispatch)
)

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(App))
