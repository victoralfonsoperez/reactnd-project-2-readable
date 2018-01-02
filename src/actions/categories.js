export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY'

//ACTIONS FOR CATEGORIES

//action creator to create an action to retrieve all categories
export const getAllCategories = categories => (
    {
        type: GET_ALL_CATEGORIES,
        categories
    }
)

//action creator to create an action to retrieve all categories
export const setCurrentCategory = category => (
    {
        type: CURRENT_CATEGORY,
        category
    }
)
