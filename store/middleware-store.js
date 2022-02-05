const redux = require("redux");

const initialState = {
    email: ''
}
const GlobalRedux = (() => {
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

    const store = redux.createStore(middlewareReducer);

    return {
        store
    }
})();

export default GlobalRedux;