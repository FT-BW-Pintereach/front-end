export const Reducer = (state, action) => {

    switch (action.type) {
        case 'FETCH_CATEGORIES':
            return{
                ...state,
                categories: [...action.payload]
            }
        case "FETCH_ARTICLES":
            return {
                ...state,
                articles: [...action.payload]
            }
        case "FETCH_USERARTICLES":
            return {
                ...state,
                userArticles: [...action.payload]
            }
        // case "FETCH_ALL_ART":
        //     return {
        //         ...state,
        //         allArtFromCat: [...action.payload]
        //     }
        default: return state;
    }
}

export const appState = {
    categories: [],
    articles: [],
    userArticles: [],
    // allArtFromCat: []
}