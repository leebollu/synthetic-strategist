import React from 'react';
import styled from 'styled-components';

const MainContentContainer = styled.div`
  margin-left: 250px;
  padding: 30px;
  height: 100vh;
  overflow-y: auto;
`;

const MainContent = ({ children }) => {
  return <MainContentContainer>{children}</MainContentContainer>;
};

export default MainContent;
