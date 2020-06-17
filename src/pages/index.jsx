import React from "react";
import { Link, graphql } from "gatsby";
import { BlogJsonLd } from "gatsby-plugin-next-seo";
import Layout from "../components/layout";
import styled from "styled-components";
import Post from "../components/post";
import { FontSize } from "../style-variables";
import { GatsbySeo } from "gatsby-plugin-next-seo/lib";

const PostSummary = styled(props => <Link {...props} />)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin: 0 0 7em 0;
  display: block;
  
  &:hover {
    text-decoration: underline;
    text-decoration-color: #cfcfcf;
  }
`;

const ReadMore = styled.span`
  font-size: ${FontSize};
  font-style: italic;
`;

export default function IndexPage({ data, location }) {
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <GatsbySeo
                title={"Callum's Blog"}
                description={"The blog of Callum Evans. Rambling about programming, software design, development practices and other related things."}
            />
            <BlogJsonLd
                title={"Callum's Blog"}
                url={"https://www.callums.blog"}
                description={"The blog of Callum Evans. Rambling about programming, software design, development practices and other related things."}
                canonical={"https://www.callums.blog"}
                posts={posts.map(mapPostToBlogJsonLd)}
            />

            { posts.map(({ node }) => {
                return (
                    <PostSummary to={node.fields.slug} key={node.fields.slug}>
                        <Post title={node.frontmatter.title} date={node.frontmatter.date} text={node.excerpt} />
                        <ReadMore>Read more...</ReadMore>
                    </PostSummary>
                )
            })}

        </Layout>
    )
}

function mapPostToBlogJsonLd(post) {
    const { node } = post;

    return {
        headline: node.frontmatter.title,
    }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 230, format: HTML)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
