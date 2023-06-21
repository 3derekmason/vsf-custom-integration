import type { Config } from 'tailwindcss';
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';

export default <Config>{
  presets: [tailwindConfig],
  content: ['./**/*.vue', './node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
};

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: '#333333',
      'off-white': '#fefefe',
      'primary-blue': '#003b5c',
      'dark-blue': '#000829',
      'blueish-gray': '#abb8c3',
      'vivid-amber': '#fcb900',
      'light-amber': '#fef3c7',
      'primary-orange': '#fdba74',
      'dull-orange': '#fed7aa',
      'light-orange': '#fff7ed',
      stone: '#d6d3d1',
      'light-stone': '#e7e5e4',
    },
  },
};
