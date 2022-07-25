import './App.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppNav from './containers/ui/navbar';
import BottomNav from './containers/ui/bottomnav';
import * as Icon from 'react-bootstrap-icons';
function App() {
  return (
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <AppNav />
            <BottomNav />
            <Router />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
  );
}

export default App;
