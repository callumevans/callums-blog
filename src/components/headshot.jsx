import React from "react";
import SelfieWebp from "../../content/selfie.webp";
import SelfieJpeg from "../../content/selfie.jpg";
import styled from "styled-components";
import { MobileSize } from "../style-variables";

const Picture = styled.picture`
  > * {
    width: 176px;
    border-radius: 100%;
    filter: grayscale(1);
    
    @media (max-width: ${MobileSize}) {
      width: 108px;
    }      
}
`;

export default function Headshot() {
    return (
        <Picture>
            <source srcSet={SelfieWebp} type="image/webp" />
            <source srcSet={SelfieJpeg} type="image/jpeg" />
            <img src={SelfieJpeg} alt="Callum Evans" />
        </Picture>
    )
}
