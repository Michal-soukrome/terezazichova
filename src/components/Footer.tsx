import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 lg:hidden">
      <div className="px-4 sm:px-6 py-8">
        <div className="flex flex-col space-y-4">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-600 font-light text-sm">
              © {currentYear} Tereza Zichova
            </p>
          </div>

          {/* Social */}
          <div className="flex justify-center space-x-6">
            <Link
              href="mailto:hello@terezazichova.com"
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
            >
              Email
            </Link>
            <Link
              href="https://instagram.com/tereza.zichova"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
