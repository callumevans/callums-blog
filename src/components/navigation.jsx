import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Nav = styled.nav`
  text-align: center;
  font-family: Arvo, serif;
  font-weight: bold;
  font-size: 1.7em;
  color: black;
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  a:visited {
    color: inherit;
  }
`;

export default function Navigation() {
    return (
        <Nav>
            <Link to="/">Home</Link>
        </Nav>
    )
}
