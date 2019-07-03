import React, { createContext, useReducer, useContext } from "react";
import {databaseActions, creatureInitialState} from "./databaseActions";

// we'll leave this empty for now
const initialState = {
    ...creatureInitialState
}

const StoreContext = createContext(initialState);

// this will act as a map of actions that will trigger state mutations
const Actions = {
    ...databaseActions
};

// the reducer is called whenever a dispatch action is made.
// the action.type is a string which maps to a function in Actions.
// We apply the update to existing state, and return a new copy of state.
const reducer = (state, action) => {
    const act = Actions[action.type];
    const update = act(state, action);
    return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

// useStore will be used in React components to fetch and mutate state
export const useStore = store => {
    const { state, dispatch } = useContext(StoreContext);
    return { state, dispatch };
};