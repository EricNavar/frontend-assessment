import React from 'react';
import { tss } from '../tss';
import { keyframes } from 'tss-react';

export const IndeterminateProgressIndicator = () => {
  const { classes } = useStyles();
  // Pokeball SVG: https://www.streamlinehq.com/icons/download/pokeball--29169
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        id="Pokeball--Streamline-Tabler"
        height="48"
        width="48"
        className={classes.spin}
      >
        <desc>Pokeball Streamline Icon: https://streamlinehq.com</desc>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0 -18 0" strokeWidth="2" />
        <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" strokeWidth="2" />
        <path d="M3 12h6" strokeWidth="2" />
        <path d="M15 12h6" strokeWidth="2" />
      </svg>
      <p>Loading...</p>
    </div>
  );
};

// https://docs.tss-react.dev/api/keyframes
const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(359deg)',
  },
});

const useStyles = tss.create(() => ({
  spin: {
    animation: `${spin} 1s linear infinite`,
  },
}));
