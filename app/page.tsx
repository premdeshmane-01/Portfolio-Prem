import Hero from "./components/Hero";
// import Background3D from "./components/Background3D"; 
import Skills from "./components/Skills"; 
import About from "./components/About"; 
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar"; 
import Preloader from "./components/Preloader";
import Footer from "./components/Footer"; 
import ProjectsSection from "./components/ProjectsSection";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    // Added 'bg-[#0a0a0a]' here. This ensures that if there is a 1px gap during
    // rapid scrolling on mobile, it shows the background color instead of a white line.
    <main className="min-h-screen relative text-black bg-[#0a0a0a] selection:bg-[#00C853] selection:text-white overflow-x-hidden">
      
      {/* --- SEO KEYWORD BLOCK (Visible to Bots/Screen Readers, Hidden from Visual Layout) --- */}
      {/* This forces Google to rank you for these specific job titles */}
      <h1 className="sr-only">
        Premsagar Deshmane - Frontend Engineer, Data Scientist, and AI Engineer Portfolio
      </h1>
      <p className="sr-only">
        I am a Machine Learning Engineer and Full Stack Developer specializing in AI, MERN Stack, and Data Science.
        Based in India, I build high-performance web systems and RAG pipelines.
      </p>
      {/* ------------------------------------------------------------------------------------ */}

      <Preloader />

      <Navbar />
      
      {/* HERO (fixed + animated inside Hero.tsx) */}
      <Hero />
      
      {/* MAIN CONTENT – starts after first viewport height */}
      {/* z-10 ensures this layer sits ON TOP of the Hero */}
      <div className="relative z-10 mt-[100vh]">
        <div className="bg-[#DEDEDE] shadow-2xl relative min-h-screen border-t border-[#DEDEDE]">
          <About />
          <Skills />
          <ProjectsSection />

          {/* Small spacer for breathing room before next sections */}
          <div className="h-12 md:h-16" />

          <ContactSection />

          {/* Bottom text inside content */}
          <div className="h-16 flex items-center justify-center text-gray-400 text-sm uppercase tracking-widest bg-[#DEDEDE]">
            © 2025 Premsagar Deshmane | Data Scientist & Frontend Engineer
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