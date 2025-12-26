import { useState } from "react";
import { products } from "../data/products";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getCurrentUser } from "../utils/auth";

export default function Shop() {
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
const [price, setPrice] = useState(699);

  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  /* ---------------- LOGIC ---------------- */
  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login first 🔐");
      navigate("/login", { state: { from: location.pathname + location.search } });
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((i) => i.id === product.id);
    if (exist) exist.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart 🛒");
  };

  const addToWishlist = (product) => {
    if (!user) {
      toast.error("Login to use wishlist ❤️");
      navigate("/login", { state: { from: location.pathname + location.search } });
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.find((i) => i.id === product.id)) {
      toast("Already in wishlist 😉");
      return;
    }
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Added to wishlist ❤️");
  };

const filteredProducts = products.filter(
  (p) =>
    (gender ? p.gender === gender : true) &&
    (category ? p.category === category : true) &&
    p.price <= price
);


  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* HERO HEADER */}
      <div className="bg-pink-500 py-16 px-4 text-center text-white mb-[-40px]">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Little Stars Collection
        </h1>
        <p className="text-pink-100 mt-3 text-lg font-medium opacity-90">
          Premium Comfort for Ages 1–3 Years
        </p>
      </div>

      {/* FILTER BAR (Floating Glassmorphism) */}
      <div className="sticky top-4 z-30 mx-auto max-w-5xl px-4">
        <div className="bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            {["", "daily", "party", "winter", "ethnic"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  category === cat
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "" ? "All Wear" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-50 border-none rounded-xl px-4 py-2 font-bold text-gray-700 focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer"
          >
            <option value="">Genders</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
          <div className="flex flex-col min-w-[180px]">
  <label className="text-xs font-bold text-gray-600 mb-1">
    Max Price: ₹{price}
  </label>
  <input
    type="range"
    min="299"
    max="699"
    step="50"
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
    className="accent-pink-500 cursor-pointer"
  />
</div>

        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>
                
                {/* FLOATING TAGS */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {p.category}
                    </span>
                </div>

                {/* WISHLIST BUTTON */}
                <button
                  onClick={() => addToWishlist(p)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2.5 rounded-full shadow hover:bg-pink-500 hover:text-white transition-all transform hover:rotate-12"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 md:p-6 text-center">
                <h3 className="font-bold text-gray-800 md:text-lg truncate">{p.name}</h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-pink-600 font-black text-xl">₹{p.price}</span>
                  <span className="text-gray-400 line-through text-sm">₹{p.price + 400}</span>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-5 w-full bg-slate-900 hover:bg-pink-600 text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2 group/btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/btn:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-20 py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
            <button 
onClick={() => {
  setGender("");
  setCategory("");
  setPrice(699);
}}
                className="mt-6 text-pink-500 font-bold underline"
            >
                Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}