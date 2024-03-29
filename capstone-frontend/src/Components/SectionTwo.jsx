import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const SectionTwo = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const ref = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setDivWidth(ref.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (ref.current) {
        setDivWidth(ref.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const variants = {
    onscreen: {
      x: 0,
    },
    offscreen: {
      x: 0 - 600,
    },
  };

  function MoveInWhenVisible({ children }) {
    return (
      <motion.div

        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        variants={variants}
        style={{ marginRight: 0, padding: 0, width: "100%" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section id="two" className="main style2 left dark fullscreen">

      <MoveInWhenVisible>
        <div className="content box style2" style={{backgroundColor:"#faf7f2"}}>
          <header>
            <h2>Ask Anything About Basketball Stats</h2>
          </header>
          <h5>Our AI Delivers Instant Insights</h5>

        </div>
      </MoveInWhenVisible>
      <a href="#work" className="button style2 down anchored">Next</a>
    </section>
  );
};

export default SectionTwo;
