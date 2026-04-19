import { FiGithub, FiMail } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 flex flex-col items-center justify-center px-8 md:px-12 lg:pr-16 lg:pl-72"
    >
      <h2 className="text-xl md:text-2xl font-montserrat font-light tracking-[0.2em] text-white uppercase mb-12 text-center max-w-2xl">
        Currently open to <br />
        <span className="text-purple-500 font-bold">freelance and full-time roles.</span>
      </h2>
      
      <a 
        href="https://wa.me/2349019828794"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] md:text-xs font-montserrat font-light tracking-[0.4em] text-white uppercase px-12 py-5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 hover:text-purple-400 transition-all duration-700 backdrop-blur-sm rounded-none mb-20 inline-block"
      >
        Get in Touch
      </a>

      <div className="flex space-x-6 items-center">
        <a href="#" className="text-neutral-500 hover:text-charcoal dark:hover:text-parchment transition-colors" aria-label="Github">
          <FiGithub className="w-5 h-5" />
        </a>
        <a href="#" className="text-neutral-500 hover:text-charcoal dark:hover:text-parchment transition-colors" aria-label="TikTok">
          <FaTiktok className="w-4 h-4" />
        </a>
        <a href="mailto:oreoluwaolajide3@gmail.com" className="text-neutral-500 hover:text-charcoal dark:hover:text-parchment transition-colors" aria-label="Email">
          <FiMail className="w-5 h-5" />
        </a>
      </div>
    </motion.footer>
  );
}
