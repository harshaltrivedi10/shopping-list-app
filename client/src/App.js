import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <hr />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
