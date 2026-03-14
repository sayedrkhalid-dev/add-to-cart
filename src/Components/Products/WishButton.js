export default function WishButton() {
  return `
    <button 
    id="wish-button"
    class="flex justify-center items-center gap-1 text-xs hover:text-red-400 cursor-pointer"
    >
      <i class="fa-solid fa-heart"></i>
      Wishlist
    </button>
  `;
}
