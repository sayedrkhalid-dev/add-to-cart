import { CART } from "./store/data.js";
import Cart from "./Components/Cart/Cart.js";
import { getState, setState, subscribe } from "./store/store.js";

const init = () => {
  // Initial state rendering
  setState(() => {
    return {
      cart: [...CART],
      selectedItems: [...CART],
      wishlist: [],
      isAllSelected: true,
      method: "standard",
      promoCode: null,
      promoError: null,
    };
  });

  document.getElementById("cart-container").innerHTML = `${Cart(CART)}`;
};

document.getElementById("cart-container").addEventListener("click", (e) => {
  if (e.target.closest("#cart-container")) {
    // Select All items
    if (!e.target.closest("#select-all")) return;

    const ischecked = e.target.checked;
    setState((state) => {
      const { cart } = state;
      cart.map((item) => (item.isSelected = ischecked));

      return { ...state, cart: cart, isAllSelected: ischecked };
    });

    document.getElementById("cart-container").innerHTML = `${Cart(CART)}`;
  }
});

init();
