import logo from './logo.svg';
import './App.css';
import AppNav from './containers/ui/navbar';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { BrowserRouter } from 'react-router-dom';
import BottomNav from './containers/ui/bottomnav';
function App() {
  return (
    <>
      <AppNav />
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
