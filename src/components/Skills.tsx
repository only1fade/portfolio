import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  SiNodedotjs, SiExpress, SiLaravel, 
  SiReact, SiTailwindcss, SiFramer, SiTypescript,
  SiExpo, SiPostgresql, SiMongodb, SiWebrtc,
  SiApple, SiAndroid
} from "react-icons/si";

const skillCategories = [
  {
    title: "Backend Scaling",
    skills: [
      { name: "NODE.JS", icon: SiNodedotjs },
      { name: "EXPRESS", icon: SiExpress },
      { name: "LARAVEL", icon: SiLaravel }
    ]
  },
  {
    title: "Cross-Platform",
    skills: [
      { name: "REACT NATIVE", icon: SiReact },
      { name: "EXPO", icon: SiExpo },
      { name: "IOS / ANDROID", icon: [SiApple, SiAndroid] },
      { name: "WEBRTC", icon: SiWebrtc }
    ]
  },
  {
    title: "UI Precision",
    skills: [
      { name: "REACT", icon: SiReact },
      { name: "TAILWIND CSS", icon: SiTailwindcss },
      { name: "FRAMER MOTION", icon: SiFramer },
      { name: "TYPESCRIPT", icon: SiTypescript }
    ]
  },
  {
    title: "Database Design",
    skills: [
      { name: "POSTGRESQL", icon: SiPostgresql },
      { name: "MONGODB", icon: SiMongodb }
    ]
  }
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Skills reveal only starts after the section is 30% into the viewport
  // Precision Horizontal Spread (Clearing the 400px monitor)
  const spreadXLeft = useTransform(scrollYProgress, [0.3, 0.7], ["150px", "0px"]);
  const spreadXRight = useTransform(scrollYProgress, [0.3, 0.7], ["-200px", "-170px"]);
  
  // Vertical Framing (Matching the PHP/Python tags vs the JS/CSS tags)
  const yTop = useTransform(scrollYProgress, [0.3, 0.7], ["100px", "-40px"]);
  const yBottom = useTransform(scrollYProgress, [0.3, 0.7], ["-100px", 80]); // Numerical value for variety or keeping consistency
  
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.1, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Quadrant Assignment
  const translations = [
    { x: spreadXLeft, y: yTop, align: "items-start text-left" },    // Top Left: Backend
    { x: spreadXRight, y: yTop, align: "items-end text-right" },   // Top Right: Cross-Platform
    { x: spreadXLeft, y: yBottom, align: "items-start text-left" }, // Bottom Left: UI
    { x: spreadXRight, y: yTop, align: "items-end text-right" } // Bottom Right: Database
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-0 px-8 md:px-12 lg:px-24 pl-32 sm:pl-44 md:pl-56 lg:pl-72 relative scroll-mt-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 gap-x-12 max-w-4xl w-full mx-auto">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title}
            style={{ 
              x: translations[idx].x, 
              y: translations[idx].y,
              scale,
              opacity
            }}
            className={`flex flex-col ${translations[idx].align} will-change-transform`}
          >
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-purple-500 mb-6 uppercase">
              {category.title}
            </h3>
            <ul className={`space-y-5 flex flex-col ${translations[idx].align}`}>
              {category.skills.map((skill) => (
                <li key={skill.name} className={`group flex items-center gap-4 text-xs tracking-widest text-white font-medium font-sans ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                  <div className="text-neutral-500 group-hover:text-purple-500 transition-colors duration-300">
                    {Array.isArray(skill.icon) ? (
                      <div className="flex gap-2">
                        {skill.icon.map((Icon, i) => <Icon key={i} size={24} />)}
                      </div>
                    ) : (
                      <skill.icon size={24} />
                    )}
                  </div>
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}