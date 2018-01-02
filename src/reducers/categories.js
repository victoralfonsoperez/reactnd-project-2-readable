import {
    GET_ALL_CATEGORIES,
    CURRENT_CATEGORY
} from '../actions'

const categories = (state = {}, action) => {
    const { categories, category } = action

    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: categories
            }
        case CURRENT_CATEGORY:
            return {
                ...state,
                currentcategory: category
            }
        default:
            return state
    }
}

export default categories
