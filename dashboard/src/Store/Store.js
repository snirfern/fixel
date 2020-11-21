import React, { createContext, useContext, useReducer } from "react";
const StoreContext = createContext();
const initialState = {
  user: undefined,
  globalError: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING": {
      const { payload } = action;

      return { ...state, loading: payload };
    }
    case "UPDATE_USER_DATA": {
      const { payload } = action;

      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false,
      };
    }
    case "LOGIN": {
      const { payload } = action;

      return { ...state, user: { ...payload }, loading: false };
    }
    case "SIGNUP": {
      const { payload } = action;

      return { ...state, loading: false, user: { ...payload } };
    }
    case "ERROR": {
      const { payload } = action;

      return {
        ...state,
        globalError: payload,
        loading: false,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
