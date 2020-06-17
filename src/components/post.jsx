import React from "react";
import styled from "styled-components";
import { FontSize, MobileSize } from "../style-variables";

const Title = styled.h1`
  font-family: 'Arvo', serif;
  font-size: 2.3em;
  font-weight: normal;
  text-align: center;
  
  @media (max-width: ${MobileSize}) {
    font-size: 2.1em;
  }
`;

const Date = styled.time`
  font-size: ${FontSize};
  text-align: center;
  display: block;
  font-style: italic;
`;

const Content = styled.section`
  font-size: ${FontSize};
  line-height: 1.5em;
  text-align: justify;
  padding-top: 0.6em;

  @media (max-width: ${MobileSize}) {
    text-align: left;
  }
  
  a {
    color: #1e80c8;
    
    &:visited {
      color: #1e80c8;
    }
     
    &:hover {
      color: #24a2f8;
    }
  }
`;

export default function Post({ title, date, text }) {
    return (
        <article>
            <header>
                <Title>{title}</Title>
                <Date time={date}>{date}</Date>
            </header>
            <Content dangerouslySetInnerHTML={{ __html: text }} />
        </article>
    )
}
