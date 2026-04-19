import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import uptodateImg from "../assets/uptodate.png";
import htlBackendImg from "../assets/htl backend.png";
import b2b2cImg from "../assets/b2b2c.png";

type Project = {
  id: string; // Changed to string for URL usage
  title: string;
  badges: string[];
  description: string;
  image?: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: "uptodate",
    title: "UpToDate Dashboard",
    badges: ["React", "Tailwind CSS", "Dashboard", "Gmail API"],
    description: "Sleek, dark-mode first receipt management application featuring automated and manual Gmail integration for dispatching receipts directly to both senders and recipients.",
    image: uptodateImg,
    link: "#"
  },
  {
    id: "htl-backend",
    title: "HTL Backend Architecture",
    badges: ["Node.js", "API", "Database", "Backend"],
    description: "A robust and scalable backend architecture tailored for hotel and restaurant management, handling complex data relationships and booking systems.",
    image: htlBackendImg,
    link: "#"
  },
  {
    id: "b2b2c",
    title: "B2B2C Mobile App",
    badges: ["React Native", "Expo", "Mobile", "E-commerce"],
    description: "A versatile multivendor mobile platform connecting users with food delivery, ride-hailing, and logistics services, featuring seamless cross-vendor collaboration.",
    image: b2b2cImg,
    link: "#"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export function ProjectGrid() {
  return (
    <section className="w-full py-16 px-8 md:px-12 lg:pr-16 lg:pl-72" id="workbench">
      <div className="w-full max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-xl md:text-2xl font-montserrat font-light text-white uppercase tracking-[0.3em]">
            Workbench
          </h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <Link to={`/project/${project.id}`} className="block h-full group">
                <div className="glass-card glass-card-hover rounded-xl overflow-hidden h-full flex flex-col cursor-pointer bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/50 hover:shadow-2xl hover:shadow-purple-900/20">
                  {/* Project Image Area */}
                  <div className="w-full h-48 bg-neutral-950/80 relative overflow-hidden transition-colors duration-500 flex items-center justify-center">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover scale-150 opacity-80 group-hover:opacity-100 group-hover:scale-[1.65] transition-all duration-700 ease-in-out origin-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111111] flex items-center justify-center">
                        <span className="text-neutral-600 text-xs tracking-widest uppercase">No Image</span>
                      </div>
                    )}
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 border-b border-neutral-800/50 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-neutral-100 mb-3 tracking-tight group-hover:text-purple-400 transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.badges.map((badge) => (
                        <span key={badge} className="text-[10px] bg-neutral-800/60 text-neutral-300 border border-neutral-700 px-2.5 py-1 rounded-full font-sans font-medium tracking-wide">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-6 flex-1">
                      {project.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-neutral-800/60 pt-4 group-hover:border-neutral-700/60 transition-colors">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">View Project</span>
                      <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-purple-400 transition-colors transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


