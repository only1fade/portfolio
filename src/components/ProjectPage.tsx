import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import uptodateImg from "../assets/uptodate.png";
import htlBackendImg from "../assets/htl backend.png";
import b2b2cImg from "../assets/b2b2c.png";
import imgA from "../assets/A.png";
import imgB from "../assets/B.png";
import imgC from "../assets/C.png";

type Project = {
  id: string;
  title: string;
  badges: string[];
  description: string;
  longDescription: string;
  image?: string;
  additionalImages?: string[];
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
    additionalImages: [imgA, imgB, imgC],
    link: "#",
    github: "#"
  }
};

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center pt-24 text-white">
        <h2 className="text-2xl">Project not found</h2>
        <Link to="/" className="ml-4 text-purple-400 hover:text-purple-300">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full pt-28 pb-16 px-8 md:px-12 lg:pr-16 lg:pl-72"
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
          <div className="w-full h-[40vh] md:h-[60vh] bg-neutral-900 rounded-2xl overflow-hidden mb-12 relative border border-neutral-800 shadow-2xl glass-card">
            <img 
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

        <div className="h-px w-full bg-neutral-800/60 mb-10"></div>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans font-light">
            {project.longDescription}
          </p>
        </div>

        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-16 w-full">
            <h3 className="text-xl text-white font-semibold mb-8 tracking-tight border-b border-neutral-800/60 pb-3">Project Showcase</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.additionalImages.map((imgSrc, idx) => (
                <div key={idx} className="w-full bg-neutral-900 rounded-xl overflow-hidden relative border border-neutral-800 shadow-xl glass-card group">
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover block scale-[1.35] group-hover:scale-[1.45] transition-transform duration-700 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
