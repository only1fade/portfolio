import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Component, Smartphone, LayoutTemplate, Mail, Briefcase, ChevronDown } from "lucide-react";
import heroVideo from "../assets/hero-section.mp4";




export function Hero() {
  const commands = ["> npm install", "> php artisan serve", "> npx expo start"];
  const [cmdIndex, setCmdIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isStarted) return;
    
    let currentText = commands[cmdIndex];
    let i = 0;
    setDisplayText("");
    
    const typingInterval = setInterval(() => {
      if (i < currentText.length) {
        setDisplayText(currentText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 70);
    
    const nextCommandTimeout = setTimeout(() => {
      setCmdIndex((prev) => (prev + 1) % commands.length);
    }, 3500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(nextCommandTimeout);
    };
  }, [cmdIndex, isStarted]);

  return (
    <section className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden px-8 md:px-12 lg:pr-16 lg:pl-72" id="home">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1440px] w-full">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left">
          <div className="flex flex-col items-start">
            <h1 className="font-display font-black tracking-tight text-white mb-2 uppercase flex flex-row items-center justify-start gap-1.5 sm:gap-3 md:gap-4">

              {/* FULL — aligns to middle of cycle/stack overlap */}
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-xl sm:text-4xl md:text-5xl shrink-0 translate-y-[35%]"
              >
                FULL
              </motion.span>

              {/* 3D Layered block: name on top, then cycle/stack */}
              <div className="inline-flex flex-col items-center">
                {/* Name sits directly above cycle */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col items-center leading-none gap-0.5 mb-2"
                >
                  <span className="font-montserrat font-light text-[9px] sm:text-sm md:text-base tracking-[0.4em] text-neutral-400 normal-case">
                    olajide
                  </span>
                  <span className="font-montserrat font-light text-[9px] sm:text-sm md:text-base tracking-[0.4em] text-neutral-500 normal-case">
                    emmanuel
                  </span>
                </motion.div>

                {/* cycle: dark purple, casts shadow onto stack - Animates second */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 1.2 }
                    }
                  }}
                  className="font-archivo text-purple-500 leading-none tracking-tighter text-[2.5rem] sm:text-7xl md:text-8xl relative z-10 normal-case flex"
                  style={{ textShadow: '0px 28px 20px rgba(0,0,0,1), 0px 14px 10px rgba(0,0,0,0.85)' }}
                >
                  {"cycle".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>

                {/* stack: giant white behind — pulled up into cycle - Animates first */}
                <motion.span
                  initial={{ y: -120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1] // Custom spring-like ease
                  }}
                  className="font-changa text-white leading-none tracking-tighter text-5xl sm:text-8xl md:text-9xl lg:text-[10rem] relative z-0 normal-case"
                  style={{ marginTop: '-0.42em' }}
                >
                  stack
                </motion.span>
              </div>

              {/* DEVELOPER — aligns to middle of cycle/stack overlap */}
              <motion.span
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-xl sm:text-4xl md:text-5xl shrink-0 translate-y-[35%]"
              >
                DEVELOPER
              </motion.span>

            </h1>
          </div>
          
          <div className="relative">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-base sm:text-xl md:text-2xl text-neutral-300 leading-tight mb-24 font-signature pl-2 sm:pl-12 md:pl-24 lg:pl-32"
            >
              <span className="inline-block sm:whitespace-nowrap">. architecting systems that stay up,</span> <br className="hidden sm:block" />
              <span className="inline-block sm:whitespace-nowrap">scale quietly, and rarely wake me up .</span>
              <span className="relative sm:absolute block sm:flex mt-4 sm:mt-0 left-0 sm:left-[3rem] md:left-[6rem] lg:left-[8rem] top-0 sm:top-[4.5rem] text-purple-500 font-bold text-3xl sm:text-5xl font-changa opacity-80 items-baseline gap-2">
                5+ <span className="font-montserrat font-light text-xs sm:text-base md:text-lg tracking-[0.3em] text-neutral-500 normal-case">years</span>
              </span>
            </motion.p>
          </div>

          {/* Role / Location subtext - matches Name styling */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="font-montserrat font-light text-xs md:text-sm tracking-[0.3em] text-neutral-500 normal-case mb-4"
          >
            Lagos based / Abuja based . Remote Developer
          </motion.p>

          {/* Unified Action Row: Tech Bar + Buttons - Side-by-Side */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
            className="flex items-center gap-1.5 sm:gap-4 mb-12 w-full max-w-full overflow-visible"
          >
            {/* Tech toggle block */}
            <div className="font-mono text-[9px] sm:text-sm bg-white/5 border border-white/10 text-neutral-400 py-1 sm:py-2 px-2 sm:px-4 rounded-md shadow-sm w-fit min-w-[120px] sm:min-w-[200px] text-left transition-colors flex items-center justify-start h-8 sm:h-10">
              <span className="truncate">{displayText}</span>
              <span className="animate-pulse ml-[2px]">_</span>
            </div>

            {/* Hire Me Block */}
            <a 
              href="#contact"
              className="flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 h-8 sm:h-10 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-md shadow-sm hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group whitespace-nowrap shrink-0"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span className="font-montserrat text-[8px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium hidden xs:block sm:block">Hire Me</span>
              {/* Ultra small screen fallback if needed, but shrink-0 should keep it */}
            </a>

            {/* Projects Block */}
            <a 
              href="#workbench"
              className="flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 h-8 sm:h-10 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-md shadow-sm hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group whitespace-nowrap shrink-0"
            >
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span className="font-montserrat text-[8px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium hidden xs:block sm:block">Projects</span>
            </a>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 1.1 }
              }
            }}
            className="flex space-x-6 items-center flex-wrap justify-start gap-y-4"
          >
            {[
              { icon: Database, label: "MongoDB/SQL" },
              { icon: Server, label: "Express/Node" },
              { icon: Component, label: "React" },
              { icon: Smartphone, label: "React Native" },
              { icon: LayoutTemplate, label: "Laravel" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: -30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                }}
              >
                <TechIcon icon={item.icon} label={item.label} />
              </motion.div>
            ))}
            
            {/* Stylish Direct Link to Skills */}
            <motion.a
              href="#skills"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="ml-12 cursor-pointer group relative flex items-center justify-center p-2"
              aria-label="Scroll to Skills"
            >
              {/* Pulsing Glow behind arrow */}
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              
              <ChevronDown 
                className="w-10 h-10 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:text-purple-300 transition-colors" 
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Inverted Video Background */}
        <motion.div 
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 0.3, x: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.8 }}
          className="hidden lg:block relative h-full w-full max-w-xl mx-auto"
        >
          <video 
            src={heroVideo}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto object-contain invert grayscale"
            style={{ 
              maskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 80%)'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function TechIcon({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="group flex flex-col items-center cursor-default">
      <Icon className="w-8 h-8 text-neutral-400 transition-colors duration-300 group-hover:text-oxblood" strokeWidth={1.5} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
