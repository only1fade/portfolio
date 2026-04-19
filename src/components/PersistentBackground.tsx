import { motion, useScroll, useTransform } from "framer-motion";

import aboutImg from "../assets/about-new.png";

export function PersistentBackground({ containerRef }: { containerRef?: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef || undefined,
    offset: ["start start", "end end"]
  });

  // Range 0 to 0.5: About Section
  // Range 0.5 to 1.0: Skills Section
  
  // X position: 33vw (right-margin) to 0vw (center)
  // Transition starts immediately as we enter Skills and finishes by 70% of the total container
  const x = useTransform(scrollYProgress, [0.5, 0.7], ["33vw", "0vw"]);
  
  // Y position: Start slightly high, end centered
  const y = useTransform(scrollYProgress, [0.5, 0.7], ["-10vh", "0vh"]);
  
  // Scale: 1 to 2.0 (Full Page centerpiece)
  const scale = useTransform(scrollYProgress, [0.5, 0.7], [1, 2.0]);
  
  // Opacity: Visible during About and Skills, stays solid while scrolling away
  // Ensure it's fully opaque during the transition
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.9, 1.0], [0, 0.4, 0.4, 0.4]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="sticky top-0 h-screen w-full hidden lg:flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ 
            x, y, scale, opacity,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
          className="relative w-[400px] transform-gpu"
        >
          <img
            src={aboutImg}
            alt=""
            className="w-full h-auto object-contain grayscale"
            style={{
              maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
              transform: 'translateZ(0)' // Extra hardware acceleration hint
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
