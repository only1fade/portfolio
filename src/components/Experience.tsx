import { motion } from "framer-motion";

const experiences = [
  {
    date: "2025-2026",
    role: "Full Stack Developer (freelance) for",
    company: "Baobab Assets",
  },
  {
    date: "2024-2025",
    role: "Mobile App Developer(co developer) for",
    company: "B2B2C Food Tech",
  },
  {
    date: "2021-2024",
    role: "Backend Developer at",
    company: "Etals suite",
  },
  {
    date: "2021-2022",
    role: "Backend Engineering (short term) at",
    company: "inquire AI.",
  },
  {
    date: "2020-2021",
    role: "Frontend Developer at",
    company: "Cloakware.",
  }
];

export function Experience() {
  return (
    <section id="experience" className="w-full relative z-10 pt-24 pb-32 px-8 md:px-12 lg:pr-16 lg:pl-72 flex flex-col items-start justify-start border-t border-white/5">
      <div className="w-full max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm font-montserrat font-light tracking-[0.4em] text-purple-500 uppercase mb-16"
        >
          Work Experience
        </motion.h2>

        <div className="flex flex-col w-full">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col lg:flex-row lg:items-center justify-between w-full py-10 lg:py-8 border-b border-white/5 last:border-b-0 gap-6 lg:gap-8"
            >
              <div className="text-neutral-500 font-montserrat font-light text-sm md:text-base tracking-[0.1em] shrink-0">
                {exp.date}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4 text-neutral-300 font-montserrat font-light text-sm md:text-base tracking-[0.1em] lg:text-right">
                <span>{exp.role}</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm whitespace-nowrap w-fit">
                  <span className="w-1.5 h-1.5 rounded-full border border-purple-400 shrink-0"></span>
                  {exp.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
