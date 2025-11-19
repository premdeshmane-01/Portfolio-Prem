import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ChatWidget from "./components/ChatWidget";
import Background3D from "./components/Background3D"; 
import Skills from "./components/Skills"; 
import About from "./components/About"; 
import VideoIntro from "./components/VideoIntro";
import Navbar from "./components/Navbar"; 
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    // UPDATED: Removed 'bg-[#050505]' so the 3D background is visible
    <main className="min-h-screen relative text-white selection:bg-white selection:text-black overflow-hidden">
      <Preloader />
      <CustomCursor />
      <Navbar />
      
      {/* The 3D Stars live here, fixed in the background */}
      <Background3D />
      
      {/* Content sits on top with z-10 */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <ProjectsSection />
        <VideoIntro />
        <ChatWidget />
      </div>
    </main>
  );
}