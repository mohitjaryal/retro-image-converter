export default function Header() {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center relative z-10">
      {/* Main title */}
      <h1 className="text-5xl md:text-6xl font-bold text-center 
                     text-transparent bg-clip-text 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                     drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] 
                     font-['Press_Start_2P'] tracking-wide">
        RETRO LAB 📸
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-sm md:text-base text-gray-300 text-center font-mono">
        Turn your photos into realistic Polaroids with retro filters, tilt, zoom & captions.
      </p>

      {/* Optional small neon underline */}
      <div className="mt-4 w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full 
                      shadow-[0_0_12px_rgba(168,85,247,0.5)]"></div>
    </header>
  );
}
