import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, User, LayoutGrid, Cpu, Phone, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [active, setActive] = useState("Home");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home", icon: Home },
    { name: "About", href: "/#about", icon: User },
    { name: "Skills", href: "/#skills", icon: Cpu },
    { 
      name: "Workbench", 
      href: "/#workbench", 
      icon: LayoutGrid,
      subLinks: [
        { name: "UpToDate", href: "/project/uptodate" },
        { name: "HTL Backend", href: "/project/htl-backend" },
        { name: "B2B2C", href: "/project/b2b2c" }
      ]
    }
  ];

  useEffect(() => {
    // Auto expand/collapse based on route
    if (location.pathname.startsWith("/project/")) {
      setExpanded("Workbench");
    } else if (isHome) {
      setExpanded(null);
    }

    if (!isHome) {
      const allSub = navLinks.flatMap(l => l.subLinks || []);
      const matched = allSub.find(s => s.href === location.pathname);
      if (matched) {
        setActive(matched.name);
      } else {
        setActive("");
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedLink = navLinks.find((link) => link.href === `/#${id}`);
          if (matchedLink) {
            setActive(matchedLink.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      if (link.href.startsWith("/#")) {
        const id = link.href.substring(1);
        const element = document.querySelector(id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const toggleExpand = (name: string) => {
    if (expanded === name) {
      setExpanded(null);
    } else {
      setExpanded(name);
    }
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-6 left-6 z-[60] p-2.5 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-xl text-white lg:hidden shadow-2xl transition-all hover:bg-neutral-800 flex flex-col justify-center items-center w-10 h-10 gap-1.5 overflow-hidden"
        aria-label="Toggle Menu"
      >
        <motion.span 
          animate={{ rotate: isMobileOpen ? 45 : 0, y: isMobileOpen ? 8 : 0 }} 
          className={`block h-0.5 w-5 rounded-full transition-colors duration-300 transform origin-center ${isMobileOpen ? 'bg-purple-400' : 'bg-neutral-300'}`} 
        />
        <motion.span 
          animate={{ opacity: isMobileOpen ? 0 : 1 }} 
          className={`block h-0.5 w-5 rounded-full transition-colors duration-300 ${isMobileOpen ? 'bg-purple-400' : 'bg-neutral-300'}`} 
        />
        <motion.span 
          animate={{ rotate: isMobileOpen ? -45 : 0, y: isMobileOpen ? -8 : 0 }} 
          className={`block h-0.5 w-5 rounded-full transition-colors duration-300 transform origin-center ${isMobileOpen ? 'bg-purple-400' : 'bg-neutral-300'}`} 
        />
      </button>

      {/* Main Drawer */}
      <motion.nav 
        initial={false}
        className={`fixed left-0 top-0 bottom-0 z-[50] flex flex-col items-center py-12 px-3 transition-transform duration-500 ease-in-out min-w-[200px] lg:min-w-[140px] ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } theme-bg lg:bg-transparent lg:bg-none [&::before]:block lg:[&::before]:hidden shadow-2xl lg:shadow-none`}
      >
        {/* Branding */}
        <div className="w-full flex justify-start mb-20 pl-2 lg:mt-0 mt-12">
          <Link to="/" onClick={handleLinkClick} className="font-sans font-black text-white tracking-tight text-lg">
            DevFade
          </Link>
        </div>
        
        {/* Links */}
        <div className="flex flex-col items-start space-y-2.5 font-sans text-[10px] font-bold tracking-widest text-neutral-400 uppercase w-full pl-3">
          {navLinks.map((link) => {
            const isActive = active === link.name;
            const isExpanded = expanded === link.name;
            const Icon = link.icon;
            const hasSubLinks = link.subLinks && link.subLinks.length > 0;

            return (
              <div key={link.name} className="w-full flex flex-col">
                <div className="relative w-full flex items-center">
                  <Link 
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`px-2.5 py-2 flex-grow flex flex-row items-center justify-start gap-3 rounded-lg border transition-all duration-300 relative z-10 ${
                      isActive 
                        ? "bg-purple-900/40 shadow-sm border-purple-500/50 text-purple-400 scale-105"
                        : "border-transparent hover:bg-white/5 hover:border-white/10 hover:shadow-sm hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 transition-colors duration-300" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                  {hasSubLinks && (
                    <button 
                      onClick={() => toggleExpand(link.name)}
                      className="absolute right-0 p-2 z-20 text-neutral-500 hover:text-neutral-300"
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-90" : "rotate-0"}`} />
                    </button>
                  )}
                </div>
                
                <AnimatePresence>
                  {hasSubLinks && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col pl-8 mt-1 space-y-1 overflow-hidden w-full"
                    >
                      {link.subLinks?.map((sub) => {
                        const isSubActive = location.pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={handleLinkClick}
                            className={`py-2 px-2 text-[9px] w-full rounded-md transition-all duration-300 ${
                              isSubActive 
                                ? "text-purple-400 bg-purple-900/20 font-bold border border-purple-500/20" 
                                : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-col items-center w-full font-sans text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
          <a 
            href="tel:+2349019828794"
            className="px-2.5 py-2 w-full flex flex-row items-center justify-start gap-3 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/5 hover:border-white/10 hover:shadow-sm hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 shrink-0 text-purple-400 transition-colors duration-300" strokeWidth={2} />
            <span className="whitespace-nowrap text-[11px]">+234 90 1982 8794</span>
          </a>
        </div>

        <div className="flex-1"></div>
      </motion.nav>

      {/* Overlay Backdrop for Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

