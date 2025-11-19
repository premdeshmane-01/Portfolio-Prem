"use client";
export default function VideoIntro() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Why Hire Me?</h2>
        
        {/* Cyberpunk Placeholder Box */}
        <div className="w-full aspect-video glass-card rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-white/20 relative overflow-hidden group">
          
          {/* Animated Scanline */}
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_20px_#00f2ff] animate-[scan_3s_linear_infinite]"></div>

          <div className="text-6xl mb-4 animate-pulse">🔴</div>
          <p className="text-xl font-semibold text-cyan-400 tracking-widest uppercase">Transmission Offline</p>
          <p className="text-gray-500 mt-2 text-sm">Video Feed Connecting Soon...</p>
          
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[-1] bg-[length:100%_4px,6px_100%] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}