import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/auth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  // Listen for scroll to add blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate("/login");
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        to="/shop" 
        onClick={() => setIsOpen(false)}
        className={`${mobile ? "text-xl py-4 border-b w-full text-center" : "hover:text-pink-500"} font-bold transition-colors`}
      >
        Shop
      </Link>
      <Link 
        to="/wishlist" 
        onClick={() => setIsOpen(false)}
        className={`${mobile ? "text-xl py-4 border-b w-full text-center" : "hover:text-pink-500"} font-bold transition-colors`}
      >
        Wishlist ❤️
      </Link>
      <Link 
        to="/orders" 
        onClick={() => setIsOpen(false)}
        className={`${mobile ? "text-xl py-4 border-b w-full text-center" : "hover:text-pink-500"} font-bold transition-colors`}
      >
        Orders
      </Link>
    </>
  );

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg py-3" : "bg-white py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter text-pink-500 flex items-center gap-1">
          Tiny<span className="text-slate-900">Tots</span>
          <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse mt-2"></div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8 text-slate-700">
          <NavLinks />
          
          <div className="h-6 w-[1px] bg-slate-200"></div>

          {/* CART */}
          <Link to="/cart" className="relative group p-2">
            <span className="text-xl group-hover:scale-110 transition-transform inline-block">🛒</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER SECTION */}
          {user ? (
            <div className="flex items-center gap-4 bg-slate-900 text-white pl-4 pr-1 py-1 rounded-full shadow-lg shadow-slate-200">
              <span className="text-xs font-black uppercase tracking-widest">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2.5 rounded-full font-black text-sm transition-all shadow-md hover:shadow-pink-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE ACTIONS (Cart & Hamburger) */}
        <div className="flex lg:hidden items-center gap-4">
          <Link to="/cart" className="relative p-2">
             <span className="text-2xl">🛒</span>
             {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
             )}
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-900 focus:outline-none"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="space-y-1.5">
                <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
                <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
                <div className="w-5 h-1 bg-slate-900 rounded-full ml-auto"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div className={`fixed inset-0 top-[70px] bg-white z-[99] transition-transform duration-500 lg:hidden flex flex-col items-center px-6 py-10 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <NavLinks mobile />
        
        <div className="mt-auto w-full space-y-4">
          {user ? (
            <div className="w-full text-center space-y-4">
               <p className="font-black text-slate-400 uppercase tracking-[0.2em] text-xs">Logged in as {user.name}</p>
               <button
                onClick={handleLogout}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-pink-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Login to Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}