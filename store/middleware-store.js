const redux = require("redux");

const initialState = {
    email: ''
}

const middlewareReducer = (state = initialState, action) => {
    if (action.type === "SET_EMAIL") {
        console.log('Setting email to value', action.email);
        return {
            email: action.email,
        };
    }

    if (action.type === "RESET_EMAIL") {
        return {
            email: '',
        };
    }

    return state;
};

const middlewareStore = redux.createStore(middlewareReducer);

export default middlewareStore;