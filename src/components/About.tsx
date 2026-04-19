import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative w-full pt-32 pb-16 px-8 md:px-12 lg:pr-16 lg:pl-72 overflow-hidden" id="about">
      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-montserrat font-light tracking-[0.4em] text-purple-500 uppercase mb-8">
            The Philosophy
          </h2>
          
          <div className="space-y-14">
            <p className="text-xl md:text-3xl font-montserrat font-light leading-snug text-neutral-200 tracking-[0.2em]">
              I don't just specialize in frameworks. I <span className="font-bold text-purple-500">specialize in outcomes</span>.
            </p>
            
            {/* Secondary details: smaller and aligned with main content */}
            <div className="max-w-2xl space-y-10">
              <p className="text-base md:text-lg font-montserrat font-light text-neutral-400 leading-relaxed italic border-l border-purple-500/30 pl-6 tracking-[0.12em]">
                "Whether it's shaving 200ms off a Laravel API response or debugging a React Native memory leak at 2 AM, I'm interested in what the software does, not just how it's written."
              </p>
              
              <p className="text-base md:text-lg font-montserrat font-light text-neutral-400 leading-relaxed tracking-[0.12em]">
                I've worn the MERN stack thin and patched it back together with PHP when needed. 
              </p>
            </div>
            
            <p className="text-xl md:text-3xl font-montserrat font-light text-white uppercase tracking-[0.3em] pt-24">
              This isn't a job. <span className="text-purple-500">It's a craft.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
