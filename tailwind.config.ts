import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        up: {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        down: {
          '0%': { transform: 'translateY(-2rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fade: 'fade .6s forwards',
        up: 'up .6s forwards',
        down: 'down .6s forwards',
      },
      screens: {
        xsm: '23.4375em',
        sm: '26.5625em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        xxl: '90em',
        'max-md': { max: '47.98em' },
        'max-sm': { max: '26.5em' },
      },
      colors: {
        // Primary //
        LightCardBg: 'hsl(0 0% 100%)',
        LightBodyBg: 'hsl(223 19% 93%)',
        LightDelete: 'hsl(358 79% 66%)',

        PaleRed: 'hsl(357 100% 86%)',
        LightBlue: 'hsl(239 57% 85%)',
        ModerateBlue: 'hsl(238 40% 52%)',
        /* Neutral */
        Fade: 'hsl(228 33% 97%)',
        DarkBlue: 'hsl(212 24% 26%)',
        GrayBlue: 'hsl(211 10% 45%)',

        // dark mode
        DarkCardBg: 'hsl(214 7% 19%)',
        DarkBodyBg: 'hsl(206 9% 15%)',
        DarkTxt: 'hsl(225 17% 91%)',
        DarkDelete: 'hsl(358 86% 60%)',

        Vote: 'hsl(206 9% 15%)',
        Username: 'hsl(0 0% 100%)',
        TextArea: 'hsl(225 7% 24%)',
        SoftBlue: 'hsl(227 61% 66%)',
        Blueish: 'hsl(239 80% 62%)',
      },
    },
  },
  plugins: [],
};
export default config;
