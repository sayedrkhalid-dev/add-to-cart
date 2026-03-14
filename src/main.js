import { CART } from "./store/data.js";
import Cart from "./Components/Cart/Cart.js";
import { getState, setState, subscribe } from "./store/store.js";

document.getElementById("cart-container").innerHTML = `${Cart(CART)}`;
