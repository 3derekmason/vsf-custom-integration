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
      'primary-blue': '#003b5c',
      'blueish-gray': '#abb8c3',
      'vivid-amber': '#fcb900',
      'primary-orange': '#fdba74',
      'dull-orange': '#fed7aa',
    },
  },
};
