"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Instagram, Mail, Phone, Brush } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLink from "./SidebarLink";
import AnimatedIcon from "./AnimatedIcon";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      // Store current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Úvod", href: "/" },
    { name: "Výstavy", href: "/vystavy" },
    { name: "O mně", href: "/ja" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo/Name */}
          <div className="p-8 border-b border-gray-200">
            <SidebarLink href="/" className="group block">
              <div className="flex items-center space-x-3">
                {/* Custom SVG Paintbrush with left-to-right fill animation */}
                <div className="relative shrink-0">
                  {/* Base SVG (outline) */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 26L6 28C5.5 28.5 4.5 28.5 4 28C3.5 27.5 3.5 26.5 4 26L6 24L8 26Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-400 group-hover:text-black transition-colors duration-300"
                    />
                    <rect
                      x="6"
                      y="18"
                      width="4"
                      height="8"
                      rx="0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-400 group-hover:text-black transition-colors duration-300"
                    />
                    <path
                      d="M7 18V14C7 12.5 7.5 11 9 10C10.5 9 11.5 8 13 7C15 5.5 17 4 20 4C23 4 26 6 28 9C28.5 9.5 28.5 10.5 28 11L25 14C24 15 23 15.5 22 16L15 17C12 17.5 9 17.5 7 18Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-300 group-hover:text-black transition-colors duration-300"
                    />
                    <path
                      d="M20 8C21 7 22.5 7.5 23 9C23.5 10.5 22.5 11.5 21 11C20 11.5 19.5 10 20 8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-gray-300 group-hover:text-black transition-colors duration-300"
                    />
                  </svg>

                  {/* Filled SVG (animated clip) */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    className="absolute inset-0 group-hover:animate-fill-left-to-right"
                    style={{
                      clipPath: "inset(0 100% 0 0)",
                      transition: "clip-path 800ms ease-out",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 26L6 28C5.5 28.5 4.5 28.5 4 28C3.5 27.5 3.5 26.5 4 26L6 24L8 26Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="6"
                      y="18"
                      width="4"
                      height="8"
                      rx="0.5"
                      fill="black"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 18V14C7 12.5 7.5 11 9 10C10.5 9 11.5 8 13 7C15 5.5 17 4 20 4C23 4 26 6 28 9C28.5 9.5 28.5 10.5 28 11L25 14C24 15 23 15.5 22 16L15 17C12 17.5 9 17.5 7 18Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M20 8C21 7 22.5 7.5 23 9C23.5 10.5 22.5 11.5 21 11C20 11.5 19.5 10 20 8Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-3xl font-poppins font-medium tracking-tight text-black group-hover:text-gray-600 transition-colors leading-none">
                    Tereza Zichová
                  </h1>
                </div>
              </div>
            </SidebarLink>
            <p className="text-gray-600 text-sm mt-3 font-inter font-light tracking-wide">
              malba, kresba, grafika
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-8 py-12">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <SidebarLink
                    href={item.href}
                    className={`text-xl font-inter font-normal tracking-wide transition-colors p-4 hover:bg-gray-100 duration-300 relative block group ${
                      pathname === item.href
                        ? "text-black"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute -right-8 top-0 bottom-0 w-0.75 bg-gray-400"
                        initial={false}
                      />
                    )}
                    <span className="absolute -right-8 top-0 bottom-0 w-0.75 bg-gray-300 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                  </SidebarLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact links */}
          <div className="p-8 border-t border-gray-200 space-y-4">
            {/* Compact contact links */}
            <div className="space-y-3">
              <div className="space-y-2">
                <a
                  href="mailto:tereza.zich@email.cz"
                  className="group flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <AnimatedIcon icon={Mail} size={16} duration={600} />
                  <span>tereza.zich@email.cz</span>
                </a>
                <a
                  href="tel:+420777221469"
                  className="flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+420 777 221 469</span>
                </a>
                <a
                  href="https://www.instagram.com/zichovatereza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@zichovatereza</span>
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light pt-2 border-t border-gray-100">
              © {new Date().getFullYear()} Tereza Zichova
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full bg-white/90 backdrop-blur-sm z-40 shadow safe-area-top">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Logo */}
            <SidebarLink href="/" className="group flex items-center space-x-2">
              {/* Custom SVG Paintbrush - Mobile */}
              <div className="relative shrink-0">
                {/* Base SVG (outline) */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  className="absolute inset-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 26L6 28C5.5 28.5 4.5 28.5 4 28C3.5 27.5 3.5 26.5 4 26L6 24L8 26Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-400 group-hover:text-black transition-colors duration-300"
                  />
                  <rect
                    x="6"
                    y="18"
                    width="4"
                    height="8"
                    rx="0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-400 group-hover:text-black transition-colors duration-300"
                  />
                  <path
                    d="M7 18V14C7 12.5 7.5 11 9 10C10.5 9 11.5 8 13 7C15 5.5 17 4 20 4C23 4 26 6 28 9C28.5 9.5 28.5 10.5 28 11L25 14C24 15 23 15.5 22 16L15 17C12 17.5 9 17.5 7 18Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-300 group-hover:text-black transition-colors duration-300"
                  />
                  <path
                    d="M20 8C21 7 22.5 7.5 23 9C23.5 10.5 22.5 11.5 21 11C20 11.5 19.5 10 20 8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gray-300 group-hover:text-black transition-colors duration-300"
                  />
                </svg>

                {/* Filled SVG (animated clip) */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  className="absolute inset-0 group-hover:animate-fill-left-to-right"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                    transition: "clip-path 800ms ease-out",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 26L6 28C5.5 28.5 4.5 28.5 4 28C3.5 27.5 3.5 26.5 4 26L6 24L8 26Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="6"
                    y="18"
                    width="4"
                    height="8"
                    rx="0.5"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 18V14C7 12.5 7.5 11 9 10C10.5 9 11.5 8 13 7C15 5.5 17 4 20 4C23 4 26 6 28 9C28.5 9.5 28.5 10.5 28 11L25 14C24 15 23 15.5 22 16L15 17C12 17.5 9 17.5 7 18Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 8C21 7 22.5 7.5 23 9C23.5 10.5 22.5 11.5 21 11C20 11.5 19.5 10 20 8Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <span className="text-xl font-poppins font-medium tracking-tight text-black group-hover:text-gray-600 transition-colors">
                Tereza Zichová
              </span>
            </SidebarLink>

            {/* Mobile menu button */}
            <button
              className="text-gray-600 hover:text-black transition-colors relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.3,
              }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-9/12 max-h-svh bg-white z-40 border-l border-black shadow-2xl safe-area-y safe-area-right"
            >
              <div className="w-full h-full flex flex-col justify-between items-start bg-white/90 backdrop-blur-sm z-40 border-b border-black">
                <div className="w-full shadow safe-area-top">
                  <div className="h-16 flex items-center justify-between px-4 sm:px-6 ">
                    <h2 className="text-xl font-poppins font-medium tracking-tight text-black">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className=" text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="w-full flex-1 p-6">
                  <ul className="space-y-6">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <SidebarLink
                          href={item.href}
                          className={`block text-xl font-inter font-normal tracking-wide transition-all duration-300 py-3 px-4 rounded-lg ${
                            pathname === item.href
                              ? "text-black bg-gray-100"
                              : "text-gray-600 hover:text-black hover:bg-gray-50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </SidebarLink>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Contact */}
                <div className="w-full p-6 border-t border-gray-200 space-y-4">
                  {/* Mobile contact links */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <a
                        href="mailto:tereza.zich@email.cz"
                        className="flex items-center space-x-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Mail className="w-4 h-4" />
                        <span>tereza.zich@email.cz</span>
                      </a>
                      <a
                        href="tel:+420777221469"
                        className="flex items-center space-x-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Phone className="w-4 h-4" />
                        <span>+420 777 221 469</span>
                      </a>
                      <a
                        href="https://www.instagram.com/zichovatereza/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-sm text-gray-600 hover:text-black transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Instagram className="w-4 h-4" />
                        <span>@zichovatereza</span>
                      </a>
                    </div>
                  </div>
                  <div className="w-full pt-2 border-t border-gray-100 safe-area-bottom">
                    <p className="text-xs text-gray-500 font-inter font-light">
                      © {new Date().getFullYear()} Tereza Zichová
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
