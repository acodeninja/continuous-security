// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Continuous Security Reports',
    tagline: '',
    url: 'http://localhost:3000',
    baseUrl: '/documentation',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    // favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'continuous-security-reports', // Usually your GitHub org/user name.
    projectName: 'documentation', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en-GB',
        locales: ['en-GB'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                // blog: {
                //   showReadingTime: true,
                //   // Please change this to your repo.
                //   // Remove this to remove the "edit this page" links.
                //   editUrl:
                //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                // },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Continuous Security Reports',
                items: [
                    {
                        type: 'doc',
                        docId: 'documentation/index',
                        label: 'Documentation',
                        position: 'right',
                    },
                    {
                        to: 'blog',
                        label: 'Project Blog',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [],
                copyright: `Continuous Security Reports: Documentation ${new Date().getFullYear()} Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

};

module.exports = async function createConfig() {
    const {remarkKroki} = await import('remark-kroki');

    return {
        ...config,
        presets: [
            [
                'classic',
                {
                    docs: {
                        remarkPlugins: [[remarkKroki, {
                            server: 'https://kroki.io',
                            alias: ['plantuml'],
                            output: 'inline-svg',
                        }]],
                    },
                    blog: {
                        remarkPlugins: [[remarkKroki, {
                            server: 'https://kroki.io',
                            alias: ['plantuml'],
                            output: 'inline-svg',
                        }]],
                    },
                    theme: {
                        customCss: [require.resolve('./src/css/custom.css')],
                    },
                }
            ]
        ]
    };
};
