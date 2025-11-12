import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="circle outer"></div>
        <div className="circle middle"></div>
        <div className="circle inner"></div>
        <div className="dot"></div>
      </div>
    </StyledWrapper>
  );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px #facc15, 0 0 40px #facc15; }
  50% { box-shadow: 0 0 40px #ffcc00, 0 0 60px #ffd700; }
`;

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #fff8e1, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  .loader {
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    border: 2px solid #facc15;
    animation: ${rotate} 3s linear infinite, ${glow} 2s ease-in-out infinite;
  }

  .outer {
    width: 160px;
    height: 160px;
    border-width: 3px;
    animation-duration: 5s;
  }

  .middle {
    width: 120px;
    height: 120px;
    border-width: 2px;
    animation-direction: reverse;
    animation-duration: 4s;
    opacity: 0.8;
  }

  .inner {
    width: 80px;
    height: 80px;
    border-width: 2px;
    animation-duration: 3s;
    opacity: 0.6;
  }

  .dot {
    width: 16px;
    height: 16px;
    background: #facc15;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 1.8s ease-in-out infinite;
    box-shadow: 0 0 15px #facc15, 0 0 30px #ffcc00;
  }

  .text {
    position: absolute;
    bottom: -60px;
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.9;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom right, #1f1f1f, #111);
    .circle {
      border-color: #facc15;
    }
    .dot {
      background: #facc15;
    }
    .text {
      color: #fff;
    }
  }
`;

export default Loading;
