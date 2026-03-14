import { getState } from "../../store/store.js";
import OrderSummary from "../OrderSummary/OrderSummary.js";
import ProductItem from "../Products/ProductItem.js";
import WishlistButton from "./WishlistButton.js";
import ClearAllButton from "./ClearAllButton.js";

export default function Cart(products) {
  const { isAllSelected } = getState();

  return `
    <div class="flex flex-col flex-2 gap-4 bg-gray-100 bg-opacity-85 rounded-lg shadow-lg overflow-hidden">
      <div class="flex  justify-between items-center p-4">
        <h1 class="flex items-center gap-4 text-2xl font-semibold">
          Shoping Cart
          <span
            class="text-xs font-semibold bg-purple-500 text-gray-50 px-2 py-1 rounded-full"
            >${products.length} Items</span
          >
        </h1>

        <div class="flex flex-col sm:flex-row gap-2 text-xs">
          <!-- Wish list button -->
          ${WishlistButton()}

          <!-- Wish list button -->
          ${ClearAllButton()}
        </div>
      </div>

      <ul id="product-container" class="flex flex-col">
        <li class="flex gap-2 p-4 border-t border-gray-300">
          <input
            type="checkbox"
            name="select-all"
            id="select-all"
            ${isAllSelected ? "checked" : ""}
            class="scale-120"
          />
          <div
            class="flex-1 grid grid-cols-6 text-xs uppercase font-semibold text-gray-600"
          >
            <p class="col-span-3">products</p>
            <p class="text-center hidden md:block">quantity</p>
            <p class="text-center hidden md:block">price</p>
            <p class="text-end col-span-3 md:col-span-1">total</p>
          </div>
        </li>

        ${products.map((product) => ProductItem(product)).join("")}
      </ul>
    </div>

    ${OrderSummary()}
  `;
}
