import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    {
      id: 1,
      title: "Sundown Animate",
      category: "Frontend & Animation",
      techStack: ["Locomotive Scroll", "GSAP", "HTML/CSS"],
      description: "Immersive website featuring complex GSAP animations. I improved interaction accuracy by 15% using advanced scroll effects.",
      githubLink: "https://github.com/premdeshmane-01/HomeDown_Animate", 
      liveLink: "https://premdeshmane-01.github.io/HomeDown_Animate/",
      image: "/projects/sundown.png" // UPDATED to .png
    },
    {
      id: 2,
      title: "Advanced Portfolio Clone",
      category: "Engineering & Performance",
      techStack: ["Locomotive Scroll", "GSAP ScrollTrigger", "JS Architecture"],
      description: "A rigorous technical deep-dive into high-performance rendering. Mastered the synchronization of Locomotive Scroll with GSAP Proxy.",
      githubLink: "https://github.com/premdeshmane-01/Clone-Portfolio-Website", 
      liveLink: "https://cynthiaugwu.com/",
      image: "/projects/portfolio-clone.png" // UPDATED to .png
    },
    {
      id: 3,
      title: "Lazarev Digital Clone",
      category: "Frontend Engineering",
      techStack: ["GSAP", "Canvas", "Swiper.js"],
      description: "Pixel-perfect clone of a design agency site. Focused on responsiveness and smooth scroll-triggered animations.",
      githubLink: "https://github.com/premdeshmane-01/LAZAREV_WEB",
      liveLink: "https://premdeshmane-01.github.io/LAZAREV_WEB/",
      image: "/projects/lazarev.png" // UPDATED to .png
    },
    {
      id: 4,
      title: "Sidcup Family Golf",
      category: "UI/UX Design",
      techStack: ["GSAP", "ScrollTrigger", "JS"],
      description: "Mobile-first promotional website with custom cursor interactions and video loops for high user engagement.",
      githubLink: "https://github.com/premdeshmane-01/SideCup_Family_Golf",
      liveLink: "https://premdeshmane-01.github.io/SideCup_Family_Golf/",
      image: "/projects/sidcup.png" // UPDATED to .png
    }
  ];

  return NextResponse.json(projects);
}