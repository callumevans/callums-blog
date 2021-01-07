const SiteConfig = require('./site-config.js');

module.exports = {
    siteMetadata: {
        title: "Callum's Blog",
        siteUrl: `${SiteConfig.SiteUrl}`,
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content`,
                name: 'posts'
            }
        },
        {
            resolve: 'gatsby-plugin-twitter'
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            inlineCodeMarker: '›'
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-next-seo`,
            options: {
                openGraph: {
                    type: 'website',
                    locale: 'en_GB',
                    url: `${SiteConfig.SiteUrl}`,
                    site_name: `Callum's Blog`,
                },
                twitter: {
                    handle: '@callum_evans',
                }
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    'Scope One',
                    'Arvo',
                ],
                display: 'swap',
            }
        },
        {
            resolve: `gatsby-plugin-sitemap`,
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-123730403-1",
                head: true,
            }
        },
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                host: `${SiteConfig.SiteUrl}`,
                sitemap: `${SiteConfig.SiteUrl}/sitemap.xml`,
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: `gatsby-plugin-html-attributes`,
            options: {
                lang: 'en'
            }
        },
        {
            resolve: `gatsby-plugin-styled-components`,
        },
        {
            resolve: `gatsby-plugin-react-helmet-async`,
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `${SiteConfig.SiteUrl}`,
            },
        },
    ]
};
