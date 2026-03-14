import WishButton from "./WishButton.js";
import RemoveButton from "./RemoveButton.js";
import Image from "./Image.js";
import Quantity from "./Quantity.js";
import Price from "./Price.js";
import Ratings from "./Ratings.js";

import { discountedPrice } from "../../pricing/pricing.js";

export default function ProductItem(product) {
  const {
    id,
    title,
    images,
    category,
    brand,
    stock,
    ratings,
    price,
    quantity,
    discount,
    availabilityStatus,
    isSelected,
  } = product;

  return `
    <li
      data-id="${id}"
      class="product-item flex gap-2 hover:bg-gray-200/50 hover:bg-opacity-15 p-4 border-t border-gray-300"
    >
      <input
        type="checkbox"
        name="select"
        id="select"
        ${isSelected ? "checked" : ""}
        class="scale-120"
      />
      <div class="flex-1 grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-6">
      
        <!-- Product -->
        <div class="order-1 sm:col-span-2 md:col-span-3 flex items-center gap-2">
          <!-- Image -->
          ${Image(images[0])}

          <!-- Product Details -->
          <div class="flex flex-col gap-1">
            <!-- Product Title -->
            <h2 class="font-semibold truncate w-48">${title}</h2>

            <!-- Product Category -->
            <p class="text-xs text-gray-500 capitalize">${category} • ${brand}</p>

            <!-- Product Stock -->
            <p class="flex items-center gap-1 text-xs text-green-400">
              <span class="in-stock"></span>${availabilityStatus} • ${stock} items left
            </p>

            <!-- Rattings -->
            ${Ratings(ratings)}

            <!-- Buttons -->
            <div class="flex gap-2 text-gray-600">
              <!-- Wish button -->
              ${WishButton(id)}

              <!-- Remove button -->
              ${RemoveButton(id)}
            </div>
          </div>
        </div>

        <div class="order-3 sm:col-span-2 md:col-span-1 md:order-2 text-center flex items-center justify-center">
          <!-- Quantity -->
          ${Quantity(quantity)}
        </div>

        <div class="order-2 md:order-3 text-center flex justify-end  md:justify-center items-center">
          <!-- Price -->
          ${Price(price, discount)}
        </div>

        <!-- Total -->
        <div class="order-4 text-end flex items-center justify-end">
          <span class="text-lg text-gray-600 font-semibold">$${discountedPrice(price, discount).toFixed(2)}</span>
        </div>
      </div>
    </li>
  `;
}
