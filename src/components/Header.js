import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Header.scss'
import { NavLink, withRouter } from 'react-router-dom'

class Header extends Component {
    state = {}

    componentWillReceiveProps(nextProps) {
        //sets the categories state when the component receives props
        this.setState({ categories: nextProps.categories })
    }

    render () {
        const { categories } = this.state

        return (
            <nav className={ styles.header }>
                <NavLink exact={ true } to="/" activeClassName={styles.active}>Home</NavLink>
                {
                    categories && categories.map(cat => (
                        <NavLink
                            key={ cat.name }
                            exact={ true }
                            to={ `/${cat.path}` }
                            activeClassName={styles.active}>
                            { cat.path }
                        </NavLink>
                    ))
                }
                <NavLink exact={ true } to="/create" activeClassName={styles.active}>Create Post</NavLink>
            </nav>
        )
    }
}

const mapStateToProps = appState => (
    {
      categories: appState.categories
    }
)

export default withRouter(connect( mapStateToProps )(Header))

