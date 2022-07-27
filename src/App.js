import './App.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppNav from './containers/ui/navbar';
import BottomNav from './containers/ui/bottomnav';
import * as Icon from 'react-bootstrap-icons';
import ActionAdd from './containers/ui/actionadd'; 
import { useState } from 'react';
function App() {
  const [showActionButton, setShowActionButton] = useState(true); 
  const [showAction, setShowAction] = useState(false);
  return (
    <>
    <style type="text/css">
    {
    `  
    @keyframes growshrink {
      0%   {transform: scale(1.0); }
      50%  {transform: scale(1.02); }
      100% {transform: scale(1.0); }
  }
    .goals-list-action-button {
      color: #34aaaa;
      position: fixed;
      bottom: 10vh; 
      left: 85vw;
      cursor: pointer; 
    }
    .goals-list-action-button:hover, 
      .goals-list-action-button:active, 
        .goals-list-action-button:focus-visible,
          .goals-list-action-button:focus {
      animation-name: growshrink;
      animation-duration: 0.3s; 
      color: #34dcbe;
    }
      @media only screen and (max-width: 1000px) {
        .goals-list-action-button {
          left: 85vw;
        }
      }
      @media only screen and (max-width: 800px) {
        .goals-list-action-button {
          left: 80vw;
        }
      }
      @media only screen and (max-width: 576px) {
        .goals-list-action-button {
          left: 75vw;
        }
      }
      @media only screen and (max-height: 800px) {
        .goals-list-action-button {
          bottom: 10vh; 
        }
      }
      @media only screen and (max-height: 700px) {
        .goals-list-action-button {
          bottom: 10vh; 
        }
      }  
    `
    }
    </style>
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <AppNav />
            <BottomNav />
            <Router showActionButton={showActionButton} setShowActionButton={setShowActionButton} />
            {
              (showActionButton) ? <Icon.PlusCircleFill  className="goals-list-action-button" width={100} height={100} onClick={() => setShowAction(true) } />: ""
            }
            {
              (showActionButton) ? <ActionAdd show={showAction} setShow={setShowAction} /> : ""
            }
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </>
  );
}

export default App;
