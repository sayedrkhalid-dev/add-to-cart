export default function CheckoutButton() {
  return `
    <legend class="flex justify-center">
      <button
        class="w-full py-4 rounded-lg bg-blue-400 text-gray-50 cursor-pointer"
      >
        <i class="fa-solid fa-lock"></i>
        Proceed to checkout
      </button>
    </legend>
  `;
}
