import logo from './logo.svg';
import './App.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
  );
}

export default App;
