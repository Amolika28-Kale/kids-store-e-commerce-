import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const payNow = () => {
    const options = {
      key: "rzp_test_xxxxx", // replace with real key
      amount: total * 100,
      currency: "INR",
      name: "BabyCare Store",
      description: "Safe & Soft Clothing for Babies",
      handler: function () {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({
          cart,
          total,
          date: new Date().toLocaleString(),
          orderId: Math.floor(Math.random() * 1000000),
        });
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart");
        navigate("/success");
      },
      theme: { color: "#ec4899" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* STEPS HEADER */}
      <div className="bg-white border-b border-gray-100 py-8 mb-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Secure Checkout</h1>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
                <span className="text-pink-500">Cart</span>
                <span className="h-1 w-8 bg-pink-200 rounded-full"></span>
                <span className="text-pink-500">Shipping</span>
                <span className="h-1 w-8 bg-gray-200 rounded-full"></span>
                <span>Payment</span>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT SIDE - FORM */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-black">1</div>
                <h3 className="text-2xl font-black text-slate-800">Shipping Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                <input className="w-full bg-slate-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 p-4 rounded-2xl transition-all outline-none font-medium" placeholder="e.g. Jane Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Mobile Number</label>
                <input className="w-full bg-slate-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 p-4 rounded-2xl transition-all outline-none font-medium" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Street Address</label>
                <input className="w-full bg-slate-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 p-4 rounded-2xl transition-all outline-none font-medium" placeholder="Flat, House no., Building, Company, Apartment" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">City</label>
                <input className="w-full bg-slate-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 p-4 rounded-2xl transition-all outline-none font-medium" placeholder="e.g. Mumbai" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Pincode</label>
                <input className="w-full bg-slate-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 p-4 rounded-2xl transition-all outline-none font-medium" placeholder="400001" />
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-black">2</div>
                <h3 className="text-2xl font-black text-slate-800">Payment Selection</h3>
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-400 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex items-center justify-between gap-4 border-2 border-pink-500 rounded-[1.5rem] p-6 bg-white">
                <div className="flex items-center gap-4">
                    <div className="bg-pink-50 p-3 rounded-xl text-3xl text-pink-500">💳</div>
                    <div>
                        <p className="font-black text-slate-900">Razorpay Secure</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">
                        UPI • Cards • Net Banking • Wallets
                        </p>
                    </div>
                </div>
                <div className="h-6 w-6 rounded-full border-4 border-pink-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – SUMMARY */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/30 border border-white p-8 md:sticky md:top-8 overflow-hidden">
            <h3 className="text-xl font-black text-slate-900 mb-6">Order Review</h3>

            {/* ITEM LIST */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate">{item.name}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty: {item.qty} • {item.size}</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-dashed border-gray-100 pt-8 space-y-4">
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Subtotal</span>
                <span className="text-slate-900">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Delivery</span>
                <span className="text-green-600 font-black tracking-widest text-[10px] bg-green-50 px-2 py-1 rounded">FREE</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-50">
                <span className="text-lg font-black text-slate-900 tracking-tight">Total</span>
                <span className="text-2xl font-black text-pink-600 tracking-tight">₹{total}</span>
              </div>
            </div>

            <button
              onClick={payNow}
              className="w-full bg-slate-900 hover:bg-pink-600 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-pink-200 transform active:scale-95 flex items-center justify-center gap-3 group"
            >
              Pay Securely
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-[10px] leading-relaxed text-gray-400 font-bold uppercase tracking-wider text-center italic">
                    By clicking pay, you agree to our terms of service and child-safe product guarantees.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}