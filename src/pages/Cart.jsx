import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateQty = (index, type) => {
    const updated = [...cart];
    if (type === "+") updated[index].qty += 1;
    else updated[index].qty -= 1;

    const filtered = updated.filter((i) => i.qty > 0);
    setCart(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  /* --- EMPTY CART --- */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-12 rounded-[3rem] shadow-xl shadow-pink-100/50 border border-white">
          <div className="relative inline-block mb-6">
            <span className="text-8xl block animate-bounce">🛒</span>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full border-4 border-white"></div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Your Bag is Empty</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added any cute outfits yet. Let's find something special!
          </p>
          <Link
            to="/shop"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-lg shadow-pink-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* --- UI --- */
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 py-12 mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center md:text-left">
            Shopping Bag <span className="text-pink-500 font-medium">({cart.length} Items)</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* CART ITEMS LIST */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/30 transition-all duration-500 p-6 flex flex-col sm:flex-row gap-6 items-center"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative w-36 h-36 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-slate-800 tracking-tight group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="hidden sm:block font-black text-xl text-slate-900">
                    ₹{item.price * item.qty}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
                  <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Size: {item.size}
                  </span>
                  <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Color: {item.color}
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-6">
                  {/* QUANTITY TOGGLE */}
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button
                      onClick={() => updateQty(index, "-")}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-pink-50 hover:text-pink-500 font-bold transition-all"
                    >
                      −
                    </button>
                    <span className="px-4 font-black text-slate-800">{item.qty}</span>
                    <button
                      onClick={() => updateQty(index, "+")}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-pink-50 hover:text-pink-500 font-bold transition-all"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500 font-bold text-sm flex items-center gap-1 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
              
              {/* MOBILE ONLY PRICE */}
              <div className="sm:hidden w-full pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Item Total</span>
                <span className="font-black text-xl text-slate-900">₹{item.price * item.qty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="relative">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-gray-50 p-8 lg:sticky lg:top-8 overflow-hidden">
            {/* DECORATIVE ELEMENT */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-8 relative">Order Summary</h3>

            <div className="space-y-4 relative">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Cart Subtotal</span>
                <span className="font-bold text-slate-800">₹{total}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-md font-black">EXPRESS</span>
                </div>
                <span className="text-green-600 font-black">FREE</span>
              </div>

              <div className="pt-6 mt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-slate-900 font-black text-lg">Total Payable</span>
                  <div className="text-right">
                    <p className="text-pink-600 font-black text-3xl tracking-tight">₹{total}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Inc. all taxes</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-slate-900 hover:bg-pink-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:shadow-pink-200 transition-all transform active:scale-95 flex items-center justify-center gap-3 group"
            >
              Checkout Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
                <span className="text-2xl">💳</span>
                <span className="text-2xl">🏦</span>
                <span className="text-2xl">📱</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                Secure Encrypted Checkout
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}