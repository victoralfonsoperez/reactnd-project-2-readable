import React, { Component } from 'react'
import styles from './Header.scss'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    render () {
        const { categories } = this.props

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

export default Header
