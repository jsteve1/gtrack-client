import {
    Routes,
    Route,
    useLocation
  } from "react-router-dom";
import Home from '../containers/views/home';
import AboutView from '../containers/views/about';
import Signin from '../containers/views/signin';
import Signup from '../containers/views/signup';
import React, { useState, useEffect,useLayoutEffect } from "react";
import { useSelector } from 'react-redux';
import { loggedIn } from "../app/features/users/userSlice";
import AppHomeView from '../containers/views/apphome';
import MyProfileView from "../containers/views/myprofile";
import GoalsListView from "../containers/views/goalslist";
import FeedView from '../containers/views/feed';

const ScrollResetWrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 


export default function Router() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) setTransistionStage("fadeOut");
      }, [location, displayLocation]);
    return ( 
            <>
            <style type="text/css">
            {
                `
                .fadeIn {
                    animation: 0.3s fadeIn forwards;
                  }
                  
                  .fadeOut {
                    animation: 0.3s fadeOut forwards;
                  }
                  
                  @keyframes fadeIn {
                    from {
                      opacity: .1;
                      transform: translate(-20px, 0px);
                    }
                    to {
                      opacity: 1;
                      transform: translate(0px, 0px);
                    }
                  }
                  
                  @keyframes fadeOut {
                    from {
                      opacity: 1;
                      transform: translate(0px, 0px);
                    }
                    to {
                      transform: translate(20px, 0px);
                      opacity: .1;
                    }
                  }
                `
            }
            </style>
            <ScrollResetWrapper>
              <div 
                  className={`${transitionStage}`} 
                  onAnimationEnd={() => {
                      if (transitionStage === "fadeOut") {
                      setTransistionStage("fadeIn");
                      setDisplayLocation(location);
                      }
                  }}
              >                
                      <Routes location={displayLocation}>    
                          <Route path="/about" element={ <AboutView /> }/>
                          <Route path="/home" element={ <Home /> } />
                          <Route path="/app">
                              <Route path="signin" element={ <Signin /> } />
                              <Route path="signup" element={ <Signup /> } />
                              <Route path="home" element={
                                  <RequireAuth>
                                    <AppHomeView /> 
                                  </RequireAuth>
                                } />
                              <Route path="profile" element={
                                <RequireAuth>
                                  <MyProfileView />   
                                </RequireAuth>                  
                              }/>
                              <Route path="feed" element={
                                <RequireAuth>
                                  <FeedView />   
                                </RequireAuth>                  
                              }/>
                          </Route>
                          <Route path="/app/goal/:id" element={
                            <RequireAuth>
                              <div>
                                single goal
                              </div>
                            </RequireAuth>
                          }/>
                          <Route path="/app/goals" exact element={
                            <RequireAuth>
                                <GoalsListView />
                            </RequireAuth>
                          }/>
                          <Route path="/" element={<Home />} />
                          <Route path="*" element={<Home />} />
                      </Routes>
              </div>
            </ScrollResetWrapper>
        </>
        )
}

const RequireAuth = ({ children, redirectTo, location }) => {
  const _loggedIn = useSelector(loggedIn); 
  useEffect(() => {
    if(!_loggedIn) {
      window.history.pushState({}, null, '/app/signin');
    }
  }, [_loggedIn])
  return _loggedIn ? children : <Signin />;
}