"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Instagram, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLink from "./SidebarLink";
import LoadingLink from "./LoadingLink";
import { get } from "http";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Úvod", href: "/" },
    { name: "Díla", href: "/galerie" },
    { name: "Výstavy", href: "/vystavy" },
    { name: "O mně", href: "/ja" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:border-r lg:border-black">
        <div className="flex flex-col h-full">
          {/* Logo/Name */}
          <div className="p-8 border-b border-gray-200">
            <SidebarLink
              href="/"
              className="text-3xl font-poppins font-medium tracking-tight text-black hover:text-gray-600 transition-colors leading-none"
            >
              Tereza Zichová
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
                        className="absolute -left-8 top-0 bottom-0 w-1 bg-black"
                        initial={false}
                      />
                    )}
                    <span className="absolute -left-8 top-0 bottom-0 w-1 bg-gray-300 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
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
                  className="flex items-center space-x-3 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4" />
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
            <SidebarLink
              href="/"
              className="text-xl font-poppins font-medium tracking-tight text-black"
            >
              Tereza Zichová
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
              className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] max-h-svh bg-white z-40 border-l border-black shadow-2xl safe-area-y safe-area-right"
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
