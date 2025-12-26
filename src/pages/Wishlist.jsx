import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCurrentUser } from "../utils/auth";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const user = getCurrentUser();

  /* ---------------- LOGIN PROTECTION ---------------- */
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view wishlist ❤️");
      navigate("/login", { state: { from: "/wishlist" } });
      return;
    }

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, [user, navigate]);

  /* ---------------- REMOVE ITEM ---------------- */
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Removed from wishlist ❌");
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((i) => i.id === product.id);

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart 🛒");
  };

  /* ---------------- EMPTY STATE ---------------- */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-pink-100/50 text-center max-w-md border border-white">
          <div className="text-7xl sm:text-8xl mb-5 animate-bounce">💝</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Fill it with cute outfits and comfortable styles for your little one!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="w-full bg-pink-500 text-white px-8 py-3.5 sm:py-4 rounded-2xl font-black text-base sm:text-lg hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-200"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 py-8 sm:py-12 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            My Favorites <span className="text-pink-500">({wishlist.length})</span>
          </h1>
          <p className="text-gray-400 mt-2 sm:mt-3 font-medium uppercase tracking-widest text-[10px] sm:text-xs">
            Saved for your little star
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-pink-100 transition-all duration-500 overflow-hidden relative"
            >
              
              {/* IMAGE */}
              <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* REMOVE */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-md p-2 sm:p-2.5 rounded-full shadow-lg text-gray-400 hover:text-red-500 hover:rotate-90 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6">
                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded-md">
                  {item.category || "Premium"}
                </span>

                <h3 className="mt-2 font-bold text-slate-800 text-base sm:text-lg mb-2 group-hover:text-pink-600 transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <p className="text-slate-900 font-black text-lg sm:text-xl">
                    ₹{item.price}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm line-through decoration-pink-300">
                    ₹{item.price + 500}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-slate-900 text-white py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-pink-500 transition-all transform active:scale-95 shadow-md hover:shadow-pink-200 flex items-center justify-center gap-2"
                >
                  🛒 Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
