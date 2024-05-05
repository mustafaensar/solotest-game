import React from 'react';

const Peg = ({ hasPeg, onClick, isVisible, isSelected }) => {
  const ariaLabel = hasPeg ? 'Click to select peg for moving' : 'Empty spot';
  const pegStyle = {
    background: hasPeg ? 'black' : 'transparent',
    visibility: isVisible ? 'visible' : 'hidden',
    borderColor: isSelected ? 'yellow' : 'transparent',  // Highlight selected peg
    boxShadow: isSelected ? '0 0 10px yellow' : 'none'   // Optional: Add a glow effect
  };

  return (
    <button
      className="peg"
      onClick={onClick}
      style={pegStyle}
      aria-label={ariaLabel}
    />
  );
}

export default Peg;
