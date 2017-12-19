import React, { Component } from 'react'
import styles from './Header.scss'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    render () {
        const { categories } = this.props

        return (
            <div className={ styles.header }>
                {
                    categories && categories.map(cat => (
                        <NavLink
                            key={ cat.name }
                            exact={ true }
                            to={ `/${cat.path}` }
                            activeClassName={ styles.acti }>
                            { cat.path }
                        </NavLink>
                    ))
                }
            </div>
        )
    }
}

export default Header
