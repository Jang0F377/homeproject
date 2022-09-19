import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function HeaderNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {[
        ["Demo", "#demo"],
        ["Features", "#features"],
        ["Support", "#support"],
        ["Contact", "#contact"],
      ].map(([label, href], index) => (
        <Link
          key={label}
          href={href}
          className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-xl text-cyber-grape-700 transition-colors delay-150 hover:text-cyber-grape-50 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded-lg bg-cyber-grape-700"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export function FooterNavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {[
        ["Demo", "#demo"],
        ["Features", "#features"],
        ["Support", "#support"],
        ["Contact", "#contact"],
      ].map(([label, href], index) => (
        <Link
          key={label}
          href={href}
          className="relative rounded-lg px-1 py-1 text-xl text-cyber-grape-50 transition-colors delay-150 hover:text-cyber-grape-700 hover:delay-[0ms] sm:-my-2 sm:-mx-3 sm:px-3 sm:py-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded-lg bg-cyber-grape-50 text-cyber-grape-50"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </div>
        </Link>
      ))}
    </>
  );
}
