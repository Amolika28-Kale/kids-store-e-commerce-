import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import toast from "react-hot-toast";
import { getCurrentUser } from "../utils/auth";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const product = products.find((p) => p.id === Number(id));

  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Pink");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl sm:text-2xl font-bold text-gray-800">
          Product not found 😔
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 text-pink-600 font-bold underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const addToCart = () => {
    if (!user) {
      toast.error("Please login to add product 🔐");
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find(
      (i) => i.id === product.id && i.size === size && i.color === color
    );

    if (exist) exist.qty += qty;
    else cart.push({ ...product, size, color, qty });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* BREADCRUMB */}
        <nav className="mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-gray-500">
          <span onClick={() => navigate("/")} className="cursor-pointer hover:text-pink-600">Home</span> /
          <span onClick={() => navigate("/shop")} className="cursor-pointer hover:text-pink-600 mx-2">Shop</span> /
          <span className="text-gray-900 ml-1">{product.name}</span>
        </nav>

        {/* MAIN CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-pink-100/50 overflow-hidden border border-pink-50/50 p-4 sm:p-6 md:p-12">

          {/* IMAGE */}
          <div className="relative group overflow-hidden rounded-3xl bg-pink-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-col gap-2">
              <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase">
                Bestseller
              </span>
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase">
                15% OFF
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <span className="text-yellow-400 text-sm sm:text-lg">★★★★☆</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                124 REVIEWS
              </span>
            </div>

            <div className="py-4 sm:py-6 flex items-baseline gap-4">
              <p className="text-pink-600 text-2xl sm:text-4xl font-black">
                ₹{product.price}
              </p>
              <p className="text-gray-400 text-sm sm:text-xl line-through">
                ₹{product.price + 300}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-lg italic">
              "Every stitch is made with love. This premium cotton set ensures
              your little one stays happy and comfortable all day long."
            </p>

            {/* SIZE */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-xs font-black uppercase mb-3">Select Size</h4>
              <div className="flex gap-3">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl font-black border-2 transition-all ${
                      size === s
                        ? "border-pink-500 bg-pink-50 text-pink-600"
                        : "border-gray-100 text-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="mt-6">
              <h4 className="text-xs font-black uppercase mb-3">Select Color</h4>
              <div className="flex gap-3">
                {[
                  { name: "Pink", hex: "bg-pink-400" },
                  { name: "Blue", hex: "bg-blue-400" },
                  { name: "Yellow", hex: "bg-yellow-400" },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 ${
                      color === c.name
                        ? "border-pink-500"
                        : "border-gray-100"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${c.hex}`} />
                    <span className="text-sm font-bold">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* QTY + ACTION */}
            <div className="mt-8 border-t pt-6 space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <span className="text-xs font-black uppercase">Quantity</span>
                <div className="flex items-center gap-5 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="font-black">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-slate-900 hover:bg-pink-600 text-white py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black"
                >
                  Add to Bag — ₹{product.price * qty}
                </button>

                <button
                  onClick={() => toast.success("Saved to favorites ❤️")}
                  className="w-full sm:w-16 h-14 sm:h-16 border-2 rounded-xl flex items-center justify-center"
                >
                  ❤️
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <section className="mt-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-8">
            Parent Diaries ❤️
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Super soft fabric!", author: "Sarah M.", stars: "⭐⭐⭐⭐⭐" },
              { text: "Color exactly as shown.", author: "Priya K.", stars: "⭐⭐⭐⭐⭐" },
              { text: "Perfect fit!", author: "James T.", stars: "⭐⭐⭐⭐☆" },
            ].map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border">
                <div className="text-xs mb-3">{r.stars}</div>
                <p className="italic text-gray-700">“{r.text}”</p>
                <p className="mt-4 text-xs font-black uppercase text-gray-400">
                  {r.author} • Verified Buyer
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
