/** Fonts */
const fontSizes = {
  body: 16,
  title: 18,
  subTitle: 14,
  pageHeading: 24,
  h1: 24,
  h2: 20,
  h3: 18
};

const fontWeights = {
  normal: 300,
  bold: 500,
  extraBold: 700
};

const lineHeights = {
  normal: 1,
  title: 1.25,
  paragraph: 1.5
};

/** Radius */
const radii = {
  button: '6px',
  rounded: '48px'
};

/** Space */
const space = {
  zero: 0,
  small: 4,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 42
};

const theme = {
  breakpoints: [32, 48, 64],
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  colors: {
    dark: '#222831',
    grey: '#393E46',
    accent: '#00ADB5',
    light: '#EEEEEE',
    success: '#198754',
    warning: '#FFCC00',
    error: '#D11800',
    transparent: 'transparent'
  },
  radii
};

export default theme;
