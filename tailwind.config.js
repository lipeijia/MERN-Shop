module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
        overflow: 'overflow',
        transform: 'translateY',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        'out-expo': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['last'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
