import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1761891949914-0e5c70cb6bc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JTIyQ3V0ZSUyMCUyNiUyMENvbWZvcnRhYmxlJTIwS2lkcyUyMFdlYXIlMjIlMkN8ZW58MHx8MHx8fDA%3D",
    title: "Cute & Comfortable Kids Wear",
    subtitle: "Premium clothing for kids aged 1–3 years",
  },
  {
    img: "https://images.unsplash.com/photo-1607454317583-ab070251dadc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCUyMlN0eWxlJTIwVGhhdCUyMEdyb3dzJTIwV2l0aCUyMGtpZHMlMjJ8ZW58MHx8MHx8fDA%3D",
    title: "Style That Grows With Them",
    subtitle: "Everyday & party wear for little stars",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661632476727-d8046127d580?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    title: "Soft Fabrics. Happy Kids.",
    subtitle: "Gentle on skin, tough on quality",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <img
              src={slide.img}
              className="h-full w-full object-cover"
              alt={slide.title}
            />
            {/* Improved Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center px-6 md:px-16">
              <div className="max-w-3xl text-white">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-400/30 text-pink-200 text-sm font-medium mb-4 uppercase tracking-widest">
                  New Arrival 2025
                </span>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg md:text-2xl font-light opacity-90 max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="mt-10 flex flex-wrap gap-5">
                  <Link
                    to="/shop"
                    className="bg-pink-500 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1 transition-all px-10 py-4 rounded-full text-lg font-bold"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/register"
                    className="backdrop-blur-md bg-white/10 border border-white/40 hover:bg-white/20 px-10 py-4 rounded-full text-lg font-semibold transition-all"
                  >
                    Join Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`h-2 transition-all rounded-full ${i === current ? "w-8 bg-pink-500" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* TRUST BADGES - Clean Card Style */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["🌿", "100% Cotton", "Soft & breathable"],
            ["🧸", "Kid Safe", "Non-toxic materials"],
            ["🚚", "Fast Delivery", "Across India"],
            ["💳", "Secure Payments", "SSL Protected"],
          ].map(([icon, text, sub], i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
              <h4 className="font-bold text-gray-800">{text}</h4>
              <p className="text-sm text-gray-500 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY GENDER - Overlay Card Style */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Shop by Gender</h2>
            <div className="h-1.5 w-20 bg-pink-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Boys Collection",
              img: "https://images.unsplash.com/photo-1601925240970-98447486fcdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkcyUyMGNsb3RoaW5nfGVufDB8fDB8fHww",
              link: "/shop?gender=boys",
              color: "from-blue-600/60"
            },
            {
              title: "Girls Collection",
              img: "https://media.istockphoto.com/id/547204572/photo/girls-collection.webp?a=1&b=1&s=612x612&w=0&k=20&c=g_VUIMUDCkgI-FrRsx9pXg_bfclbgu3XU6OTXAbh730=",
              link: "/shop?gender=girls",
              color: "from-pink-600/60"
            },
          ].map((g, i) => (
            <Link
              key={i}
              to={g.link}
              className="relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200 group"
            >
              <img
                src={g.img}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${g.color} to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                <h3 className="text-white text-4xl font-extrabold tracking-wide mb-4">
                  {g.title}
                </h3>
                <span className="bg-white text-black px-6 py-2 rounded-full font-bold uppercase text-sm tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COLLECTIONS - Floating Icons */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                ["Daily Wear", "👕", "bg-blue-50"],
                ["Party Wear", "🎉", "bg-purple-50"],
                ["Winter Wear", "🧥", "bg-cyan-50"],
                ["Ethnic Wear", "👘", "bg-orange-50"],
            ].map(([title, icon, color], i) => (
                <Link
                key={i}
                to="/shop"
                className={`${color} hover:shadow-xl hover:-translate-y-2 rounded-3xl p-10 text-center transition-all duration-300 border border-transparent hover:border-pink-200`}
                >
                <div className="text-6xl mb-6 drop-shadow-sm">{icon}</div>
                <h3 className="font-bold text-gray-800 text-xl">{title}</h3>
                </Link>
            ))}
            </div>
        </div>
      </section>

      {/* BEST SELLERS - Product Card Polish */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-bold">Best Sellers 🔥</h2>
                <Link to="/shop" className="text-pink-600 font-bold hover:underline">View All</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-64 bg-slate-100 relative overflow-hidden">
                    <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">HOT</div>
                    <div className="h-full w-full bg-pink-100/50 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                    <h4 className="font-bold text-gray-800 text-lg">Cute Outfit {i}</h4>
                    <div className="flex items-center justify-between mt-3">
                        <p className="text-pink-600 font-black text-xl">₹799</p>
                        <p className="text-gray-400 line-through text-sm">₹1,299</p>
                    </div>
                    <Link
                        to="/shop"
                        className="block mt-5 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold text-center py-2.5 rounded-xl transition-colors"
                    >
                        View Product
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* TESTIMONIALS - Modern Quote Style */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 italic text-gray-900">What Parents Say ❤️</h2>
            <div className="grid md:grid-cols-3 gap-10">
            {[
                "Amazing quality & super soft! My daughter loves the fabric.",
                "My kid loves these clothes 😍 The colors stay bright after washes.",
                "Perfect fitting & fast delivery. Definitely shopping here again!",
            ].map((text, i) => (
                <div key={i} className="relative bg-slate-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                <span className="absolute -top-5 left-8 text-6xl text-pink-200 font-serif">“</span>
                <p className="relative z-10 text-gray-700 leading-relaxed font-medium italic">“{text}”</p>
                <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-600">H</div>
                    <p className="font-bold text-gray-800 text-sm tracking-wide">Happy Parent</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* FINAL CTA - High Contrast */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-pink-600" />
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 text-white text-center">
            <h3 className="text-4xl md:text-5xl font-black mb-6">
            Dress Your Little One with Love 💕
            </h3>
            <p className="text-xl md:text-2xl opacity-90 font-light mb-10 tracking-wide">
            Comfort • Style • Happiness
            </p>
            <Link
            to="/shop"
            className="inline-block bg-white text-pink-600 hover:bg-gray-100 px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-transform"
            >
            Start Shopping
            </Link>
        </div>
      </section>
    </div>
  );
}