import Hero from "./components/Hero";


// import Background3D from "./components/Background3D"; 
import Skills from "./components/Skills"; 
import About from "./components/About"; 
import VideoIntro from "./components/VideoIntro";
import Navbar from "./components/Navbar"; 
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer"; 
import ProjectsSection from "./components/ProjectsSection";
import ChatWidget from "./components/ChatWidget";


export default function Home() {
  return (
    <main className="min-h-screen relative text-black selection:bg-[#00C853] selection:text-white overflow-x-hidden">
      <Preloader />
      <CustomCursor />
      <Navbar />
      
      {/* GLOBAL BACKGROUND - Fixed behind everything */}
      {/* <div className="fixed inset-0 z-[-1]">
        <Background3D />
      </div>
       */}
      {/* HERO (fixed + animated inside Hero.tsx) */}
      <Hero />
      
      {/* MAIN CONTENT – starts after first viewport height */}
      <div className="relative z-10 mt-[100vh]">
        <div className="bg-[#DEDEDE] shadow-2xl relative min-h-screen border-t border-[#DEDEDE]">
          <About />
          <Skills />
          <ProjectsSection />

          {/* Small spacer for breathing room before next sections */}
          <div className="h-12 md:h-16" />

          <VideoIntro />
         

          {/* Bottom text inside content */}
          <div className="h-16 flex items-center justify-center text-gray-400 text-sm uppercase tracking-widest bg-[#DEDEDE]">
            © 2025 Premsagar Deshmane
          </div>

          {/* Footer at the very bottom (normal flow) */}
          <Footer />
        </div>
      </div>
       <div className="fixed bottom-6 right-6 z-[9999]">
        <ChatWidget />
      </div>

      
    </main>
  );
}
