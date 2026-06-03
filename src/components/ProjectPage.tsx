import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X, ZoomIn } from "lucide-react";
import { ImageWithSkeleton } from "./Skeleton";
import { FaGithub } from "react-icons/fa";
import uptodateImg from "../assets/uptodate.png";
import htlBackendImg from "../assets/htl_main.png";
import b2b2cImg from "../assets/b2b2c_v2.png";
import b2b2c1 from "../assets/b2b2c_1.png";
import b2b2c2 from "../assets/b2b2c_2.png";
import b2b2c3 from "../assets/b2b2c_3.png";
import b2b2c4 from "../assets/b2b2c_4.png";
import b2b2c5 from "../assets/b2b2c_5.png";
import b2b2c6 from "../assets/b2b2c_6.png";
import ill1 from "../assets/ill1.png";
import ill2 from "../assets/ill2.png";
import ill3 from "../assets/ill3.png";
import htl1 from "../assets/htl1.png";
import htl2 from "../assets/htl2.png";
import htl3 from "../assets/htl3.png";

type ShowcaseItem = {
  image: string;
  title: string;
  description: string;
};

type Project = {
  id: string;
  title: string;
  badges: string[];
  description: string;
  longDescription: string;
  image?: string;
  additionalImages?: string[];
  showcase?: ShowcaseItem[];
  isMobile?: boolean;
  link?: string;
  github?: string;
};

const projectsData: Record<string, Project> = {
  "uptodate": {
    id: "uptodate",
    title: "UpToDate Dashboard",
    badges: ["React", "Tailwind CSS", "Dashboard", "Gmail API"],
    description: "Sleek receipt management application featuring automated Gmail integration.",
    longDescription: "A comprehensive dashboard for managing schedules and generating customized receipts with a focus on cross-platform functionality. It features deep history tracking and a sleek dark-mode-first aesthetic. The standout system is its direct integration with Gmail, empowering users to automatically or manually dispatch professional receipts simultaneously to both the recipient and the sender for flawless financial record-keeping.",
    image: uptodateImg,
    additionalImages: [ill1, ill2, ill3],
    showcase: [
      {
        image: ill1,
        title: "Create Complex Line-Item Receipts (Step 1)",
        description: "Intuitively draft professional, itemized invoices and receipts with comprehensive billing fields, real-time date parameters, and global currency selection in a highly focused dark developer utility environment."
      },
      {
        image: ill2,
        title: "Configure Auto-Send Automation Rules (Step 2)",
        description: "Set up friction-free, template-driven delivery parameters. Automatically dispatch certified receipts straight to both the target customer and your own personal inbox via secure Gmail APIs right upon submission."
      },
      {
        image: ill3,
        title: "Define Manual Control Rules (Step 3)",
        description: "Retain meticulous quality assurance and system authority over outbound transactions with a dedicated preview, test dispatch, and approval hold interface prior to sending live receipts."
      }
    ],
    link: "#",
    github: "#"
  },
  "htl-backend": {
    id: "htl-backend",
    title: "HTL Backend Architecture",
    badges: ["Node.js", "API", "Hospitality", "Backend"],
    description: "A robust backend architecture tailored for hotel and restaurant management.",
    longDescription: "A comprehensive backend system designed specifically for the hospitality industry, powering complex hotel and restaurant operations. It features secure authentication algorithms, thoroughly optimized database schemas for handling real-time bookings and inventory, and structured RESTful API endpoints. The architecture emphasizes high modularity and seamless communication to guarantee reliable uptime and peak performance during high-traffic operational hours.",
    image: htlBackendImg,
    additionalImages: [htl1, htl2, htl3],
    showcase: [
      {
        image: htl1,
        title: "RESTful API Documentation & Testing",
        description: "A centralized, interactive interface for developers to explore, test, and integrate with the comprehensive suite of hospitality endpoints, ensuring secure and rapid development cycles."
      },
      {
        image: htl2,
        title: "Relational Schema Visualization",
        description: "An advanced overview of the deeply optimized database architecture, instantly mapping out the complex relationships between hotel bookings, restaurant tables, and customer profiles."
      },
      {
        image: htl3,
        title: "Real-time Metrics Monitoring",
        description: "Live telemetry dashboard tracking server health, active socket connections, and API response times, providing critical insights into system performance during peak operational hours."
      }
    ],
    link: "#",
    github: "#"
  },
  "b2b2c": {
    id: "b2b2c",
    title: "B2B2C Mobile App",
    badges: ["React Native", "Expo", "Mobile", "E-commerce"],
    description: "A versatile multivendor mobile platform connecting users with food delivery, ride-hailing, and logistics services.",
    longDescription: "A highly scalable multivendor mobile marketplace built completely with React Native and Expo. It serves as an all-in-one interactive hub where customers can easily order food, book rides, and request general deliveries. Uniquely, the platform features a natively collaborative B2B ecosystem allowing cross-vendor connections—for example, food vendors can directly coordinate with independent delivery personnel on the network to fulfill their customer orders. This unified approach merges three independent service industries into one interconnected commercial network right from your device.",
    image: b2b2cImg,
    additionalImages: [b2b2c1, b2b2c2, b2b2c3, b2b2c4, b2b2c5, b2b2c6],
    showcase: [
      {
        image: b2b2c1,
        title: "Interactive Multivendor Home Screen",
        description: "A gorgeous, fluid mobile marketplace offering streamlined access to ride hailing, food vendors, and fast courier logistics right at the user's fingertips."
      },
      {
        image: b2b2c2,
        title: "Real-Time Tracking & Live Geolocation",
        description: "Pixel-perfect live map rendering, dynamic agent status tracking, and precise path calculations powered by robust background system services."
      },
      {
        image: b2b2c3,
        title: "Secure Checkouts & Unified Order Dispatch",
        description: "Advanced merchant panels and secure cart handlers facilitating multi-store transactions with collaborative instant delivery matching."
      },
      {
        image: b2b2c4,
        title: "Vendor Storefront & Menu",
        description: "Elegant, high-conversion restaurant menus and vendor profiles allowing users to easily browse items, customize orders, and view ratings."
      },
      {
        image: b2b2c5,
        title: "Ride-Hailing Vehicle Selection",
        description: "Intuitive transport booking interface featuring dynamic vehicle categories, real-time estimated pricing, and immediate driver matching."
      },
      {
        image: b2b2c6,
        title: "Express Courier Logistics",
        description: "Streamlined package delivery form for fast point-to-point courier requests with integrated drop-off instructions and secure handling options."
      }
    ],
    isMobile: true,
    link: "#",
    github: "#"
  }
};

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Close lightbox modal on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center pt-24 text-white">
        <h2 className="text-2xl font-sans">Project not found</h2>
        <Link to="/" className="ml-4 text-purple-400 hover:text-purple-300 font-sans">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full pt-28 pb-24 px-8 md:px-12 lg:pr-16 lg:pl-72"
    >
      <div className="w-full max-w-5xl mx-auto">
        <Link 
          to="/#workbench" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 font-sans text-sm tracking-wide group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Workbench
        </Link>

        {project.image && (
            <div className="w-full h-[40vh] md:h-[60vh] bg-transparent rounded-2xl overflow-hidden mb-12 relative border border-neutral-800 shadow-2xl glass-card">
            <ImageWithSkeleton
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none"></div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{project.title}</h1>
            <div className="flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <span key={badge} className="text-xs bg-purple-900/30 text-purple-300 border border-purple-700/50 px-3 py-1.5 rounded-full font-sans font-medium tracking-wide shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-white rounded-lg hover:bg-neutral-800 hover:border-neutral-500 transition-all font-sans text-sm font-medium tracking-wide shadow-lg"
              >
                <FaGithub className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>

        

        <div className="prose prose-invert max-w-none mb-16">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans font-light">
            {project.longDescription}
          </p>
        </div>

        {/* Showcase Section */}
        {project.showcase && project.showcase.length > 0 ? (
          <div className="mt-16 w-full border-t border-neutral-800/40 pt-16">
            <h3 className="text-2xl md:text-3xl text-white font-bold mb-12 tracking-tight flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span>Interactive Interface Showcase</span>
              <span className="text-xs font-mono text-neutral-500 font-normal tracking-wider bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded-lg w-fit">
                {project.isMobile ? `${project.showcase.length} Screens` : `${project.showcase.length} Process Steps`} • Click on images to enlarge
              </span>
            </h3>

            {project.isMobile ? (
              /* Mobile Portrait Showcase: 3 beautiful side-by-side phone mockups */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-stretch">
                {project.showcase.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="flex flex-col h-full group"
                  >
                    {/* High-End Smartphone Frame Mockup */}
                    <div 
                      onClick={() => setActiveImage(item.image)}
                      className="relative mx-auto mb-8 border-[6px] border-neutral-800 bg-neutral-950 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden aspect-[9/19.5] w-[270px] shrink-0 cursor-zoom-in transition-all duration-500 group-hover:scale-[1.03] group-hover:border-purple-600/80 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] flex flex-col"
                    >
                      {/* Speaker / Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
                        <div className="w-8 h-1 bg-neutral-800 rounded-full"></div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="w-full h-full relative overflow-hidden z-10 bg-transparent">
                        <ImageWithSkeleton
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                        />
                        {/* Zoom overlay on hover */}
                        <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/80 backdrop-blur-md p-3.5 rounded-full text-white scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl border border-neutral-800">
                            <ZoomIn className="w-5 h-5 text-purple-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description Card */}
                    <div className="text-center px-4 flex-1 flex flex-col justify-start">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase mb-2 block">
                        Screen 0{idx + 1}
                      </span>
                      <h4 className="text-base font-semibold text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Landscape Web Showcase: Spacious, stacked, massive browser mockups */
              <div className="flex flex-col gap-28">
                {project.showcase.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full flex flex-col gap-6 group"
                  >
                    {/* Header Row: Badge, Title & Description */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-l-2 border-purple-500/40 pl-6 py-1">
                      <div className="lg:max-w-md">
                        <span className="inline-block text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-1">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <div className="lg:max-w-xl">
                        <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-sans font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Browser Mockup Window - Full Width & Massive */}
                    <div 
                      onClick={() => setActiveImage(item.image)}
                      className="w-full bg-[#0a0b14]/40 rounded-xl overflow-hidden border border-neutral-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] glass-card transition-all duration-500 cursor-zoom-in group-hover:scale-[1.01] group-hover:border-purple-500/40 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)]"
                    >
                      {/* Browser Header Bar */}
                      <div className="w-full bg-neutral-900/90 border-b border-neutral-800/80 px-4 py-3.5 flex items-center select-none">
                        {/* Red, Yellow, Green Window Controls */}
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                      </div>

                      {/* Mockup Image Area */}
                      <div className="w-full relative overflow-hidden bg-black flex items-center justify-center">
                        <ImageWithSkeleton
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto block transition-transform duration-700 ease-in-out scale-100 group-hover:scale-[1.005]"
                        />
                        {/* Zoom overlay on hover */}
                        <div className="absolute inset-0 bg-purple-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-full text-white font-sans text-xs font-semibold flex items-center gap-2 scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl border border-neutral-800">
                            <ZoomIn className="w-4 h-4 text-purple-400" />
                            <span>Zoom in to view layout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Backward Compatibility: simple grid fallback */
          project.additionalImages && project.additionalImages.length > 0 && (
            <div className="mt-16 w-full border-t border-neutral-800/40 pt-16">
              <h3 className="text-xl text-white font-semibold mb-8 tracking-tight border-b border-neutral-800/60 pb-3">Project Showcase</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.additionalImages.map((imgSrc, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(imgSrc)}
                    className="w-full bg-[#0a0b14]/50 rounded-xl overflow-hidden relative border border-neutral-800 shadow-xl glass-card group cursor-zoom-in"
                  >
                    <ImageWithSkeleton
                      src={imgSrc}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-auto block transition-transform duration-700 ease-in-out scale-100 group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Fullscreen Blur Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <motion.button 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute top-6 right-6 p-3 bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-all shadow-xl z-50"
              onClick={() => setActiveImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative max-w-full max-h-[85vh] overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithSkeleton
                src={activeImage!}
                alt="Enlarged screenshot"
                wrapperClassName="relative max-w-full max-h-[85vh]"
                className="max-w-full max-h-[85vh] object-contain select-none"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-neutral-800 text-xs text-neutral-400 font-sans tracking-wide pointer-events-none">
                Click anywhere to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
