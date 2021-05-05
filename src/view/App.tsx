import React, { FC } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Colors from 'src/assets/Colors';
import { ReduxProvider } from 'src/state';
import Router from './routes/Router';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-color: #235390;
    background-image: url("//d35aaqx5ub95lt.cloudfront.net/images/star-pattern.svg");
    #root {
      height: 100%;
    }
  }
  .commonBtn{
    color: ${Colors.primaryButtonText};
  }
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #95afc0; 
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #535c68;
    border-radius: 10px;
  }
`;

const Application: FC = () => {
    return (
        <ThemeProvider theme={{}}>
            <GlobalStyle />
            <ReduxProvider>
                <Router />
            </ReduxProvider>
        </ThemeProvider>
    );
};

export default Application;
