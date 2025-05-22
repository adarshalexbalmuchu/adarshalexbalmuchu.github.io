import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor after mouse movement
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Active state for interactive elements
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    // Add special cursor effect for interactive elements
    const handleLinkHover = () => setIsActive(true);
    const handleLinkLeave = () => setIsActive(false);

    // Get all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHover);
      element.addEventListener('mouseleave', handleLinkLeave);
    });

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div 
      className={`custom-cursor ${isActive ? 'active' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;