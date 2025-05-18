import React,{ useEffect, useRef } from 'react';
import gsap from 'gsap';

const NameBoard = ({name,className='',colors=[""]}) => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  return (
    <h1
      ref={textRef}
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% auto',
        backgroundImage:
          `linear-gradient(to right, ${colors[0]}, ${colors[1]},${colors[2]}, ${colors[3]})`,
      }}
    >
      {name}
    </h1>
  );
};

export default NameBoard;
