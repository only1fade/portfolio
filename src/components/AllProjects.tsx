import { motion, type Variants } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "./ProjectGrid";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export function AllProjects() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full pt-28 pb-16 px-8 md:px-12 lg:pr-16 lg:pl-72 min-h-[100svh]"
    >
      <div className="w-full max-w-5xl mx-auto">
        <Link 
          to="/#workbench" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 font-sans text-sm tracking-wide group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">All Projects</h1>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
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
    </motion.div>
  );
}
