import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
  SET_SHOW_STORES: 'SET_SHOW_STORES'
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    case ACTION_TYPES.SET_SHOW_STORES: {
      return { ...state, showStores: action.payload.showStores };
    }
    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

const StoreProvider = ({ children }) => {

  const initialState = {
    latLong: "",
    coffeeStores: [],
    showStores: false
  };

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;