import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Header.scss'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    state = {}

    componentWillReceiveProps(nextProps) {
        //sets the categories state when the component receives props
        this.setState({ categories: nextProps.categories })
    }

    render () {
        const { categories } = this.state

        return (
            <div className={ styles.header }>
                <NavLink exact={ true } to="/" activeClassName={ styles.acti }>Home</NavLink>
                {
                    categories && categories.map(cat => (
                        <NavLink
                            key={ cat.name }
                            exact={ true }
                            to={ `/${cat.path}` }
                            activeClassName={ styles.active }>
                            { cat.path }
                        </NavLink>
                    ))
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

export default connect( mapStateToProps )(Header)

