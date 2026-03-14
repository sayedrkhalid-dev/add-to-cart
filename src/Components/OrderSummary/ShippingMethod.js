import { SHIPPING_RATES } from "../../store/data.js";

export default function ShippingMethod(method) {
  return `
    <!-- Standard ${method.toUpperCase()} -->
    <label
      for="Shipping-${method}"
      class="flex gap-2 border border-gray-300 p-2 rounded-lg cursor-pointer"
    >
      <input
        type="radio"
        name="shippingMethod"
        id="Shipping-${method}"
        class="cursor-pointer"
        ${method === "standard" ? "checked" : ""}
      />

      <div class="flex flex-1 justify-between items-center">
        <div>
          <p class="text-sm font-semibold">Standard Delivery</p>
          <p class="text-xs">3-5 business days</p>
        </div>

        <p class="text-sm font-semibold">$${SHIPPING_RATES[method]}</p>
      </div>
    </label>
  `;
}
