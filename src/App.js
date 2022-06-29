import logo from './logo.svg';
import './App.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import BottomNav from './containers/ui/bottomnav';
import AppNav from './containers/ui/navbar';
import { Container } from 'react-bootstrap';
function App() {
  return (
      <Provider store={store}>
        <AppNav />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
