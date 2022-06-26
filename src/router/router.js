import {
    Routes,
    Route,
    useLocation
  } from "react-router-dom";
import Home from '../containers/views/home';
import { useState, useEffect } from "react";

export default function Router() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
      }, [location, displayLocation]);

    return ( 
            <>
            <style type="text/css">
            {
                // `
                // .fadeIn {
                //     animation: 0.5s fadeIn forwards;
                //   }
                  
                //   .fadeOut {
                //     animation: 0.5s fadeOut forwards;
                //   }
                  
                //   @keyframes fadeIn {
                //     from {
                //       opacity: 0;
                //       transform: translate(-20px, 0);
                //     }
                //     to {
                //       opacity: 1;
                //       transform: translate(0px, 0px);
                //     }
                //   }
                  
                //   @keyframes fadeOut {
                //     from {
                //       opacity: 1;
                //       transform: translate(0px, 0px);
                //     }
                //     to {
                //       transform: translate(-20px, 0);
                //       opacity: 0;
                //     }
                //   }
                // `
            }
            </style>
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
                    <Route path="/about" />
                    <Route path="/home" element={ <Home /> } />
                    <Route path="/app">
                        <Route path="signin">

                        </Route>
                        <Route path="signup">

                        </Route>
                        <Route path="account">

                        </Route>
                    </Route>
                    <Route path="/app/goal/:id" />
                    <Route path="/app/goals" />
                    <Route path="/app/profile" />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </>
        )
}