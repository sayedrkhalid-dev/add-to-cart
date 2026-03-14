import ShippingMethod from "./ShippingMethod.js";
import PromoCard from "./PromoCard.js";
import CheckoutButton from "./CheckoutButton.js";

import { CART } from "../../store/data.js";
import { SHIPPING_METHODS } from "../../store/data.js";
import { SHIPPING_RATES } from "../../store/data.js";
import { PROMOTIONS } from "../../store/data.js";
import { TAX_RATE } from "../../store/data.js";

import {
  originalPrice,
  subTotal,
  itemSavings,
  itemDicounts,
  shipAmount,
  taxAmount,
} from "../../pricing/pricing.js";

export default function OrderSummary() {
  const items = CART;

  return `
    <!-- Order Summary -->
    <div class="flex flex-col flex-1 gap-4 bg-gray-200 px-4 py-4 rounded-lg shadow-lg overflow-hidden">
      <!-- Tittle -->
      <h1 class="text-2xl font-semibold">Order Summary</h1>

      <hr class="border-t border-gray-300" />

      <div class="flex flex-col gap-4 text-sm text-gray-700">
        <ul class="">
          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Items (${items.length})</span>
            <span class="font-semibold">$${subTotal(items)}</span>
          </li>

          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Original Price</span>
            <span class="font-semibold">$${originalPrice(items)}</span>
          </li>

          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Item Discounts</span>
            <span class="font-semibold">$${itemDicounts(items)}%</span>
          </li>
        </ul>

        <!-- Shipping Methods -->
        <fieldset class="space-y-2">
          <legend class="text-sm text-gray-500 font-semibold">
            Shipping
          </legend>

          ${SHIPPING_METHODS.map((method) => ShippingMethod(method)).join("")}
        </fieldset>

        <hr class="border-t border-gray-300" />

        <!-- Promo card -->
        ${PromoCard()}

        <hr class="border-t border-gray-300" />

        <ul class="">
          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Subtotal</span>
            <span class="font-semibold">$${subTotal(items)}</span>
          </li>

          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Shipping</span>
            <span class="font-semibold">$12,00.00</span>
          </li>

          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Tax (8%)</span>
            <span class="font-semibold">$${TAX_RATE}</span>
          </li>

          <li class="flex justify-between border-b border-gray-300 p-2">
            <span class="">Grand Total</span>
            <span class="font-semibold">$12,00.00</span>
          </li>
        </ul>

        <!-- Checkout Button -->
        ${CheckoutButton()}

        <div>
          <p>🗹 Tip: Select items to order only specific ones</p>
          <p>SSL encrypted · 256-bit secure payment</p>
        </div>
      </div>
    </div>
  `;
}
