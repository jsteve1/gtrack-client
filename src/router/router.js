import {
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";
import Home from '../containers/views/home';
export default function Router() {
    return ( 
        <BrowserRouter>
            <Routes>
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
        </BrowserRouter>
        )
}