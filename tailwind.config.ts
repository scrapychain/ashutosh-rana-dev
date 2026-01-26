import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'rgb(209 250 229 / 0.8)',
            '--tw-prose-headings': 'rgb(167 243 208)',
            '--tw-prose-links': 'rgb(167 243 208)',
            '--tw-prose-bold': 'rgb(209 250 229)',
            '--tw-prose-counters': 'rgb(167 243 208 / 0.8)',
            '--tw-prose-bullets': 'rgb(167 243 208 / 0.8)',
            '--tw-prose-hr': 'rgb(52 211 153 / 0.25)',
            '--tw-prose-quotes': 'rgb(209 250 229 / 0.75)',
            '--tw-prose-quote-borders': 'rgb(52 211 153 / 0.5)',
            '--tw-prose-captions': 'rgb(167 243 208 / 0.8)',
            '--tw-prose-code': 'rgb(167 243 208)',
            '--tw-prose-pre-code': 'rgb(209 250 229)',
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.6)',
            '--tw-prose-th-borders': 'rgb(52 211 153 / 0.25)',
            '--tw-prose-td-borders': 'rgb(52 211 153 / 0.25)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
