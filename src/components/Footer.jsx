import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X logo from Simple Icons

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 text-center border-t border-white/10 bg-gradient-to-b from-transparent to-[#0a0a0f]/80 relative z-10">
      <p className="mb-3 text-sm text-gray-300">
        Built by{" "}
        <span className="text-purple-400 font-semibold drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
          Mohit Jaryal
        </span>
      </p>

      <div className="flex justify-center gap-6 text-xl mb-3">
        <a
          href="https://github.com/mohitjaryal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/mohitjaryal04"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 transition-colors duration-200"
        >
          <SiX />
        </a>
        <a
          href="https://linkedin.com/in/mohitjaryal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          <FaLinkedin />
        </a>
      </div>

      <p className="text-xs text-gray-500">
        © {year} <strong>MohitJaryal</strong>. All rights reserved.
      </p>
    </footer>
  );
}
