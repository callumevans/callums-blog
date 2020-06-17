import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Layout = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIcon = styled.a`
  font-size: 1.7em;
  margin: 0 0.5em;
  color: black;
   
  * {
    transition: color .1s linear;
  }
  
  >:hover {
    cursor: pointer;
    color: ${props => props.colour};
  }
    
  &:visited {
    color: inherit;
  }

  &:active {
    color: inherit;
  }
`;

function HoverableIcon({ colour, url, title, icon }) {
    return <SocialIcon colour={colour} href={url}><i title={title} className={icon}  /></SocialIcon>;
}

export default function SocialIcons() {
    return (
        <>
            <Helmet
                script={[
                    { src: 'https://use.fontawesome.com/releases/v5.0.13/js/brands.js', async: true },
                    { src: 'https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js', async: true },
                ]}
            />
            <Layout>
                <HoverableIcon url="https://www.facebook.com/callumevans.1992" colour="#3b5998" title="Facebook" icon="fab fa-facebook-f" />
                <HoverableIcon url="https://twitter.com/callum_evans" colour="#00aced" title="Twitter" icon="fab fa-twitter" />
                <HoverableIcon url="https://github.com/callumevans" colour="#4e4e4e" title="GitHub" icon="fab fa-github-alt" />
                <HoverableIcon url="https://www.pinterest.co.uk/callumARevans/boards/" colour="#c8232c" title="Pinterest" icon="fab fa-pinterest-p" />
                <HoverableIcon url="https://www.linkedin.com/in/callum-evans-2a5420b7" colour="#007bb6" title="LinkedIn" icon="fab fa-linkedin-in" />
                <HoverableIcon url="https://stackoverflow.com/users/2850457/callum-evans" colour="#ff9900" title="Stack Overflow" icon="fab fa-stack-overflow" />
            </Layout>
        </>
    )
}
