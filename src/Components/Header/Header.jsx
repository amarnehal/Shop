import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../index.css";
import LogOutButton from "./LogOutButton";
import { useSelector } from "react-redux";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "LogIn", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
  ];
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <ul className="flex items-center space-x-8 font-medium">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="duration-200 text-orange-700 border-b border-gray-100 hover:bg-gray-50 hover:text-stone-400"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogOutButton />
              </li>
            )}
            <Link to="/cart">
              <li>
                <button className="duration-200 text-orange-700 border-b border-gray-100 hover:bg-gray-50 hover:text-stone-400">
                  Cart : {cartItems}
                </button>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}
