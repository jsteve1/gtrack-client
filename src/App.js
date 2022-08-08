import './App.css';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppNav from './containers/ui/navbar';
import BottomNav from './containers/ui/bottomnav';
import MainActionButton from './containers/ui/mainactionbutton';
function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AppNav />
        <BottomNav />
        <Router />
        <MainActionButton />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
