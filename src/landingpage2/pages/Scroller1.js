import React from "react";
import styled, { keyframes, css } from "styled-components";

export default function Scroller1({ arr }) {
  return (
    <AppContainer>
      <Wrapper>
        <Marquee>
          <MarqueeGroup>
            {arr.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {arr.map((el, i) => (
              <ImageGroup key={i}>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Marquee = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 20s linear infinite;
`;

const MarqueeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  animation: ${scrollX} 20s linear infinite;
  //   animation-direction: reverse;
  animation-delay: -3s;
`;
// const MarqueeGroup2 = styled.div`
//   ${common}
//   animation-direction: reverse;
//   animation-delay: -3s;
// `;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
  width: 150px;
`;

const Image = styled.img`
  object-fit: contain;
  height: 90px;
  padding: 5px 20px;
`;

