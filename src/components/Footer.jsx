import { HiOutlineMail, HiOutlineGlobe } from "react-icons/hi"; // Email & Website

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 text-center border-t border-white/10 bg-gradient-to-b from-transparent to-[#0a0a0f]/80 relative z-10">
      
      {/* Branding */}
      <p className="mb-3 text-sm text-gray-400">
        &copy; {year} <span className="font-semibold text-purple-400">Mohit Jaryal</span>. All rights reserved.
      </p>

      {/* Contact */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg mb-2">
        <p className="text-sm text-gray-400">
          Learn more or contact <span className="font-semibold text-purple-400">Mohit Jaryal</span>:
        </p>
        <div className="flex gap-4">
          <a
            href="mailto:reach.mohitjaryal@gmail.com"
            className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-1"
            title="Email"
          >
            <HiOutlineMail /> Email
          </a>
          <a
            href="https://mohitjaryal.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1"
            title="Website"
          >
            <HiOutlineGlobe /> Website
          </a>
        </div>
      </div>

      /}
      <p className="text-xs text-gray-500">
        Visit the website for more.
      </p>
    </footer>
  );
}
