"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Instagram,
  Mail,
  Phone,
  Brush,
  AlignEndVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLink from "./SidebarLink";

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
    { name: "Tereza", href: "/ja" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col h-full  ">
          {/* Logo/Name */}{" "}
          <SidebarLink href="/" className="group">
            <div className="p-8 border-b border-gray-200 bg-white transition-colors duration-300 ease-in-out group-hover:bg-black">
              {/* Custom SVG Paintbrush with left-to-right fill animation */}
              <div className="relative inline-block">
                <h1 className="text-3xl font-poppins font-medium tracking-tight text-black leading-none relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Tereza Zichová
                </h1>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-[width] duration-500 ease-in-out group-hover:w-full"></span>
              </div>
              <p className="text-gray-600 text-sm font-inter font-light tracking-wide transition-colors duration-300 ease-in-out group-hover:text-gray-200">
                malba, kresba, grafika
              </p>
            </div>
          </SidebarLink>
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
              <div className="space-y-2 ">
                <a
                  href="mailto:tereza.zich@email.cz"
                  className="w-fit group flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="relative">
                    tereza.zich@email.cz
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-gray-400 transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </a>
                <a
                  href="tel:+420777221469"
                  className="w-fit group flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="relative">
                    +420 777 221 469
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-gray-400 transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/zichovatereza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit group flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="relative">
                    zichovatereza{" "}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-gray-400 transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light pt-2 border-t border-gray-100">
              © {new Date().getFullYear()} Tereza Zichová
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
              <span className="text-xl font-poppins font-medium tracking-tight text-black transition-colors">
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
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <AlignEndVertical className="animate-bounce" size={24} />
                )}
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
              className="lg:hidden fixed right-0 top-0 bottom-0 w-10/12 max-h-svh bg-white z-40  safe-area-y safe-area-right"
            >
              <div className="w-full h-full flex flex-col justify-between items-start bg-white/90 backdrop-blur-sm z-40 border-b border-black">
                <div className="w-full shadow safe-area-top">
                  <div className="h-16 flex items-center justify-between px-4 sm:px-6 ">
                    <h1 className="text-xl font-poppins font-medium tracking-tight text-black transition-colors">
                      Tereza Zichová
                    </h1>
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
                          delay: index * 0.3,
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

                  <div className="space-y-4">
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
