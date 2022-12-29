import React from 'react';  // importa React de react
import Home from './pages/home/index';
import Cart from './pages/cart/cart'; 
// eslint-disable-next-line no-unused-vars
import ShowCart from './pages/cart/show-cart';  


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {
    
    render() {
        return (
            <>
                <Router>
                    <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/cart/:id" render={({match}) => (
                        <Cart id={match.params.id} />
                    )} />
                    <Route exact path="/show-cart/:id" render={({match}) => (
                        <Cart id={match.params.id} />
                    )} />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App;