import logo from './logo.svg';
import './App.css';
import AppNav from './containers/ui/navbar';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Router from './router/router'; 
import { Container } from 'react-bootstrap';
function App() {
  return (
    <>
      <AppNav />
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
