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
        <p className="text-2xl font-bold text-gray-800">Product not found 😔</p>
        <button onClick={() => navigate("/shop")} className="mt-4 text-pink-600 font-bold underline">Back to Shop</button>
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
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* BREADCRUMB */}
        <nav className="mb-8 text-sm font-medium text-gray-500">
          <span className="cursor-pointer hover:text-pink-600" onClick={() => navigate("/")}>Home</span> / 
          <span className="cursor-pointer hover:text-pink-600 mx-2" onClick={() => navigate("/shop")}>Shop</span> / 
          <span className="text-gray-900 ml-2">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/50 overflow-hidden border border-pink-50/50 p-4 md:p-12">
          
          {/* LEFT – IMAGE GALLERY STYLE */}
          <div className="space-y-4">
            <div className="relative group overflow-hidden rounded-3xl bg-pink-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] md:h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                  Bestseller
                </span>
                <span className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  15% OFF
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex text-yellow-400 text-lg">
                  {"★★★★☆"}
                </div>
                <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">124 REVIEWS</span>
              </div>
            </div>

            <div className="py-6 flex items-baseline gap-4">
              <p className="text-pink-600 text-4xl font-black">₹{product.price}</p>
              <p className="text-gray-400 text-xl line-through decoration-2">₹{product.price + 300}</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg italic">
              "Every stitch is made with love. This premium cotton set ensures your little one stays happy and comfortable all day long."
            </p>

            {/* SELECTIONS */}
            <div className="mt-8 space-y-8">
              {/* SIZE */}
              <div>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Select Size</h4>
                    <button className="text-xs font-bold text-pink-600 underline">Size Guide</button>
                </div>
                <div className="flex gap-4">
                  {["S", "M", "L"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-14 h-14 rounded-2xl border-2 transition-all flex items-center justify-center font-black ${
                        size === s
                          ? "border-pink-500 bg-pink-50 text-pink-600 shadow-md"
                          : "border-gray-100 hover:border-pink-200 text-gray-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Select Color</h4>
                <div className="flex gap-4">
                  {[
                    {name: "Pink", hex: "bg-pink-400"},
                    {name: "Blue", hex: "bg-blue-400"},
                    {name: "Yellow", hex: "bg-yellow-400"}
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                        color === c.name ? "border-pink-500 ring-2 ring-pink-100" : "border-gray-100"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${c.hex}`}></span>
                      <span className={`font-bold text-sm ${color === c.name ? "text-pink-600" : "text-gray-500"}`}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QTY & ACTION */}
              <div className="pt-6 border-t border-gray-100 space-y-6">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                    <span className="font-black text-sm uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-xl shadow-sm">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-2xl font-bold text-pink-500 hover:scale-125 transition">−</button>
                        <span className="font-black text-xl w-6 text-center">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="text-2xl font-bold text-pink-500 hover:scale-125 transition">+</button>
                    </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-slate-900 hover:bg-pink-600 text-white py-5 rounded-2xl text-xl font-black transition-all shadow-xl hover:shadow-pink-200 transform active:scale-95"
                  >
                    Add to Bag — ₹{product.price * qty}
                  </button>

                  <button
                    onClick={() => toast.success("Saved to favorites! ❤️")}
                    className="group w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:border-pink-200 hover:bg-pink-50 transition-all"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">❤️</span>
                  </button>
                </div>
              </div>
            </div>

            {/* FEATURES GRID */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                ["🌿", "100% Organic Cotton"],
                ["🧸", "Dermatologically Tested"],
                ["🧼", "Machine Washable"],
                ["🚚", "Free Express Delivery"]
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-white">
                  <span className="text-xl">{icon}</span>
                  <span className="text-[11px] font-black uppercase text-slate-600 tracking-tighter">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-black text-slate-900 italic">Parent Diaries ❤️</h3>
            <button className="bg-white border-2 border-slate-900 px-6 py-2 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all">Write a Review</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The fabric is incredibly soft. My son has sensitive skin and this caused zero irritation!", author: "Sarah M.", stars: "⭐⭐⭐⭐⭐" },
              { text: "Fast delivery and the packaging was so cute. The Pink color is exactly as shown.", author: "Priya K.", stars: "⭐⭐⭐⭐⭐" },
              { text: "Great fit for my 2-year old. It’s held up well after 5 washes already. Highly recommend.", author: "James T.", stars: "⭐⭐⭐⭐☆" },
            ].map((r, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                    <div className="mb-4 text-xs">{r.stars}</div>
                    <p className="text-gray-700 font-medium italic leading-relaxed">“{r.text}”</p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t pt-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[10px] font-bold text-pink-600">{r.author[0]}</div>
                  <p className="font-black text-xs uppercase tracking-widest text-gray-400">{r.author} • Verified Buyer</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}