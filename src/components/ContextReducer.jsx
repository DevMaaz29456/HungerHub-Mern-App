import { createContext, useReducer, useContext } from "react";

// Creating Contexts for State and Dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log("Adding Item to Cart:", action);
      return [...state, { ...action }];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "UPDATE":
      return state.map((food) =>
        food.id === action.id && food.size === action.size
          ? {
              ...food,
              qty: food.qty + parseInt(action.qty),
              price: food.price + action.price,
            }
          : food
      );
    case "DROP":
      let empArray = [];
      return empArray;

    default:
      return state;
  }
};

// Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom Hooks for accessing cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
