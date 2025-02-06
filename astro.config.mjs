// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  outDir: '_site',
  redirects: {
    '/install-all': 'https://raw.githubusercontent.com/jakeloud/jakeloud/main/install-all.sh',
    '/install': 'https://raw.githubusercontent.com/jakeloud/jakeloud/main/install.sh',
  },
  site: 'https://jakeloud.com',
	integrations: [
		starlight({
      credits: true,
			title: 'Jakeloud',
      favicon: '/android-chrome-512x512.png',
      logo: {
        src: './public/favicon.svg',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/jakeloud/docs/edit/master',
      },
			social: {
				github: 'https://github.com/jakeloud/docs',
			},
			sidebar: [
				{
					label: 'Guide',
					autogenerate: { directory: 'guide' },
				},
				{
					label: 'Experimental features',
          collapsed: true,
					autogenerate: { directory: 'experimental' },
				},
			],
      components: {
        Hero: '@/components/hero.astro',
      },
		}),
	],
});
