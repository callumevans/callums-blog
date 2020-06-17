import React from 'react';
import { graphql } from 'gatsby';
import { BlogPostJsonLd } from 'gatsby-plugin-next-seo';
import Layout from "../components/layout";
import Post from "../components/post";
import { GatsbySeo } from "gatsby-plugin-next-seo/lib";

export default function BlogPost({ data, pageContext, location }) {
    const post = data.markdownRemark;

    return (
        <Layout>
            <GatsbySeo
                title={`${post.frontmatter.title} - Callum's Blog`}
                description={post.frontmatter.description}
            />
            <BlogPostJsonLd
                headline={`${post.frontmatter.title}`}
                url={`https://www.callums.blog${post.fields.slug}`}
                description={post.frontmatter.description}
                authorName={"Callum Evans"}
                datePublished={post.frontmatter.date}
            />
            <Post title={post.frontmatter.title} date={post.frontmatter.date} text={post.html} />
        </Layout>
    )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
      }
    }
  }
`;
