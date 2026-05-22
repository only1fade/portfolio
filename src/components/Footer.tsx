import { FiGithub, FiMail } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  const buttonPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <motion.footer 
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 flex flex-col items-start px-8 md:px-12 lg:pr-16 lg:pl-72 w-full border-t border-white/5"
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold font-changa text-white mb-6 tracking-tight">
          Get in touch
        </h2>
        <p className="text-neutral-400 font-montserrat font-light text-sm md:text-base leading-relaxed mb-12">
          Always open to great opportunities or collaborations. Book a call or email me—whether to discuss a project or just explore ideas.
        </p>

        <form 
          className="w-full flex flex-col gap-6" 
          action="https://formsubmit.co/Oreoluwaolajide3@gmail.com" 
          method="POST"
        >
          {/* FormSubmit configurations */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Portfolio Message!" />

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              required
              className="w-full md:w-1/2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors font-montserrat font-light"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              required
              className="w-full md:w-1/2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors font-montserrat font-light"
            />
          </div>
          <textarea 
            name="message"
            placeholder="Write your Message" 
            required
            rows={6}
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors font-montserrat font-light resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full py-5 rounded-2xl bg-[#0a0a0a] border border-white/10 text-white font-montserrat font-medium tracking-wide hover:border-purple-500/50 transition-all relative overflow-hidden group mt-2"
          >
            <div 
              className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity" 
              style={{ backgroundImage: `url("${buttonPattern}")` }}
            ></div>
            <span className="relative z-10">Send Message</span>
          </button>
        </form>
      </div>
      
      <div className="flex flex-col items-center w-full mt-32 text-neutral-500">
        <p className="font-montserrat font-light text-xs md:text-sm tracking-wide mb-6 text-center">
          © 2026 • Maryam Oderinde • All rights reserved
        </p>
        <div className="flex space-x-8 items-center">
          <a href="#" className="hover:text-purple-400 transition-colors" aria-label="Github">
            <FiGithub className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors" aria-label="TikTok">
            <FaTiktok className="w-5 h-5" />
          </a>
          <a href="mailto:oreoluwaolajide3@gmail.com" className="hover:text-purple-400 transition-colors" aria-label="Email">
            <FiMail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
