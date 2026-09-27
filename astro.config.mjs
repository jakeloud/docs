// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkJakeloudVersion from './src/plugins/remark-jakeloud-version.mjs';

// https://astro.build/config
export default defineConfig({
  outDir: '_site',
  markdown: {
    remarkPlugins: [remarkJakeloudVersion],
  },
  redirects: {
    '/install-all': '/guide/',
    '/install': '/guide/',
    '/experimental': '/guide/operations/',
    '/experimental/multiple-users': '/guide/operations/#users-and-access',
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
				github: 'https://github.com/jakeloud/jl',
			},
			sidebar: [
				{
					label: 'Guide',
					autogenerate: { directory: 'guide' },
				},
			],
      components: {
        Hero: '@/components/hero.astro',
      },
		}),
	],
});
