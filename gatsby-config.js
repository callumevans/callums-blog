module.exports = {
    siteMetadata: {
        title: "Callum's Blog",
        siteUrl: "https://www.callums.blog",
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
                    url: 'https://www.callums.blog/',
                    site_name: `Callum's Blog`,
                },
                twitter: {
                    handle: '@callum_evans',
                }
            }
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: 'Scope One'
                    },
                    {
                        family: 'Arvo'
                    }
                ]
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
                host: 'https://www.callums.blog',
                sitemap: 'https://www.callums.blog/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
    ]
};
