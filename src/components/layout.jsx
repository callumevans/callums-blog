import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { MobileSize } from "../style-variables";
import Navigation from "./navigation";
import SocialIcons from "./social-icons";
import Selfie from "../../content/selfie.jpg";

const GlobalStyles = createGlobalStyle`
    ${normalize};
        
    html {
      font-size: 1em;
      background: #f5f5f5;
      font-family: 'Scope One', serif;
      
      @media (max-width: ${MobileSize}) {
        font-size: 0.85em;
        padding: 0 2em 0;
      }      

      code[class*="language-text"] {
        padding: .3em;
        font-size: .85em;
        text-shadow: none;
        background: #eaeaea;
        color: black;
        border-radius: 7px;
      }
      
      pre {
          margin: 2.5em 0 !important;
          font-size: 0.75em !important;
          
          @media (max-width: ${MobileSize}) {
            font-size: 0.7em !important;
          }   
             
          &::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }
    
          &::-webkit-scrollbar-track {
            border-radius: 10px;
          }
    
          &::-webkit-scrollbar-thumb {
            background: #b6b6b6;
            border-radius: 10px;
            margin: 1px;
          }
      }
      
      twitter-widget {
        margin: 1.6em auto !important;
      }
  }
`;

const Headshot = styled.img`
  width: 176px;
  border-radius: 100%;
  filter: grayscale(1);
  display: block;
  margin: 3em auto;
  
  @media (max-width: ${MobileSize}) {
    width: 108px;
    margin: 1em auto;
  }      
`;

const Social = styled(props => <div {...props}><SocialIcons /></div>)`
  display: block;
  margin: 2em auto;
`;

const Nav = styled(props => <div {...props}><Navigation /></div>)`
  margin: 0 auto 4em auto;
  display: block;
`;

const Content = styled.main`
  max-width: 40em;
  margin: 4em auto;
`;

export default function Layout({ location, title, children }) {
    return (
        <>
            <Headshot alt="Callum Evans" src={Selfie} />
            <GlobalStyles />
            <Social />
            <Nav />
            <Content>{children}</Content>
        </>
    );
}
