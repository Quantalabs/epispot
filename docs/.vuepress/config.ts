import { defineConfig } from 'vuepress/config'

export default defineConfig({
    title: 'epispot',
    description: 'A complex epidemiological modeling package for JavaScript.',
    base: '/epispot/',
    plguins: ['@vuepress/back-to-top'],
    theme: 'vt',
    repo: 'https://github.com/epispot/epispot-new',
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'API Reference', link: '/api/' },
            { text: 'GitHub', link: 'https://github.com/epispot/' }
        ],
        logo: '/icon.png',
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    path: '/guide/',
                    collapsable: false,
                    children: ['']
                }
            ],
            '/api/': [
                {
                    title: 'API Reference',
                    path: '/api/',
                    collapsable: false,
                    children: ['/api/reference', '/api/modules/model']
                }
            ],
            '/': ['']
        },
        enableDarkMode: true,
        sidebarNav: [
            {
                title: 'Quick Links',
                include: ['/guide/', '/api/'],
                items: [
                    {
                        text: 'Guide',
                        link: '/guide/',
                        activeRange: '/guide/'
                    },
                    {
                        text: 'API Reference',
                        link: '/api/',
                        activeRange: '/api/'
                    }
                ]
            }
        ]
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        [
            'meta',
            {
                name: 'description',
                content:
                    'A complex epidemiological modeling package for JavaScript.'
            }
        ]
    ]
})
