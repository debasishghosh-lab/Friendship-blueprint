import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-8 text-center md:text-left">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Left side - Logo / Title */}
        <h3 className="text-xl font-bold text-white">
          Friendship Blueprint
        </h3>

        {/* Center - Links */}
        <div className="flex space-x-6">
          <a href="#About" className="hover:text-blue-400 transition">About</a>
          <a href="#upload" className="hover:text-blue-400 transition">Upload</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Right side - Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Friendship Blueprint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
