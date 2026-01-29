export default function Header() {
  return (
    <header className="w-full py-10 flex flex-col items-center justify-center relative z-10">
      
      {/* Main title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center
                     text-transparent bg-clip-text 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400
                     drop-shadow-[0_0_16px_rgba(168,85,247,0.8)]
                     font-['Press_Start_2P'] tracking-wide animate-pulse">
        RETRO LAB 📸
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 text-center font-mono max-w-2xl">
        Turn your photos into retro Polaroids with filters, tilt, zoom & captions.
      </p>

      {/* Animated neon underline */}
      <div className="mt-6 w-28 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                      rounded-full shadow-[0_0_16px_rgba(168,85,247,0.6)]
                      animate-pulse"></div>
      
      {/* Optional glow effect  */}
      <div className="absolute -top-4 w-60 h-60 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                      rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    </header>
  );
}
