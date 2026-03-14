import { CART } from "./data.js";

const isAllSelected = () => CART.every((item) => item.isSelected);

const INITIAL_STATE = {
  cart: [],
  selectedItems: [],
  isAllSelected: false,
  wishlist: [],
  shipMethod: "standard",
  promoCode: null,
  promoError: null,
};

let state = { ...INITIAL_STATE };
let listeners = [];

export const getState = () => Object.freeze({ ...state });

export const setState = (updater) => {
  state =
    typeof updater === "function" ? updater(state) : { ...state, ...updater };

  listeners.forEach((listener) => listener(getState()));
};

export const subscribe = (listener) => {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
