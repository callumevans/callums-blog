import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGithubAlt, faLinkedinIn, faStackOverflow, faPinterestP } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

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

function HoverableIcon({ colour, url, icon, label }) {
    return <SocialIcon colour={colour} href={url}><FontAwesomeIcon aria-label={label} icon={icon} /></SocialIcon>;
}

export default function SocialIcons() {
    return (
        <>
            <Layout>
                <HoverableIcon label="Facebook" url="https://www.facebook.com/callumevans.1992" colour="#3b5998" icon={faFacebookF} />
                <HoverableIcon label="Twitter" url="https://twitter.com/callum_evans" colour="#00aced" icon={faTwitter} />
                <HoverableIcon label="GitHub" url="https://github.com/callumevans" colour="#4e4e4e" icon={faGithubAlt} />
                <HoverableIcon label="Pinterest" url="https://www.pinterest.co.uk/callumARevans/boards/" colour="#c8232c " icon={faPinterestP} />
                <HoverableIcon label="LinkedIn" url="https://www.linkedin.com/in/callum-evans-2a5420b7" colour="#007bb6" icon={faLinkedinIn} />
                <HoverableIcon label="Stack Overflow" url="https://stackoverflow.com/users/2850457/callum-evans" colour="#ff9900" icon={faStackOverflow} />
            </Layout>
        </>
    )
}
