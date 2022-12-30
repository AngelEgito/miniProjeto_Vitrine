import './index.css';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { useSelector, useDispatch, connect } from 'react-redux';
import { increment, decrement, add, cartRemove, cartClearUpdate } from '../../store/actions'; // importar de store/actions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, Redirect } from "react-router-dom";
import showCart from './show-cart';


class Cart extends Component {
  state = {
    addSuccess: 'success',
  }

  render() {
    const notify = (message) => toast(message.split(' ').join(' '));
    let total = 0;
    const {
      id,
      cart,
      amount,
      increment,
      decrement,
      cartRemove,
      cartClearUpdate,
    } = this.props;

    if(id === 'yes') {
      notify('Livro adicionado com sucesso!');
      return <Redirect to="/cart/no" />
    }

    
    const totalCart = (price, amount) => {
      total += price * amount;
      return total.toFixed(2);
    }

   
    const subTotal = (price, amount) => {
      return (price * amount).toFixed(2);
    }

    const updateCartSuccess = () => {
      this.setState({
        redirectUpdate: 'clicked'
      })
    }

    const cartIncrement = id => {
      increment(id);
      notify('Carrinho atualizado com sucesso!');
    }

    const cartDecrement = id => {
      decrement(id);
      notify('Carrinho atualizado com sucesso!');
    }

    const cartRemoveItem = id => {
      cartRemove(id);
      notify('Item excluído com sucesso!');
    }

    const cartClear = id => {
      cartClearUpdate(id);
      notify('Carrinho esvaziado com sucesso!');
    }

   
    const ShowCart = () => {
     
      return (cart.length > 0) ? cart.map((product, index) => {return <>
        <div className="header-list-cart">
          <div style={{textAlign: 'center'}} className="cart-item">PRODUTO</div>
          <div className="cart-item"></div>
          <div className="cart-item">PREÇO</div>
          <div className="cart-item">QUANTIDADE</div>
          <div class="cart-item">SUBTOTAL</div>
        </div>
        <div className="items-list-cart">
          <div className="cart-item"><img src={product[0].img} width={100} height={150} /></div>
          <div className="cart-item">{product[0].title}</div>
          <div className="cart-item">R$ {product[0].price}</div>
          <div className="cart-item">
            <div>
              <button onClick={() => cartDecrement(product[0].id)} className="btn-amount-cart">-</button> 
              &nbsp;{amount[product[0].id]}&nbsp; 
              <button onClick={() => cartIncrement(product[0].id)}  className="btn-amount-cart">+</button>
            </div>
            <div><button onClick={() => cartRemoveItem(product[0].id)} className="btn-remove-cart">Remover</button></div>
          </div>
          <div className="cart-item">R$ {subTotal(product[0].price, amount[product[0].id])}</div>
        </div>
        <div className="footer-list-cart"><span><button onClick={() => cartClearUpdate(product[0].id)} className="btn-clear-cart">Esvaziar Carrinho</button></span>&nbsp;&nbsp;TOTAL R$ {totalCart(product[0].price, amount[product[0].id])}</div>
        </>
      }) : <h4 style={{marginTop: '25%', textAlign: 'center', fontSize: '20pt'}}>carrinho vázio</h4>
    }

  
    return (
      <>
      <ToastContainer />
      <div class="container-cart">
          <header className="home-header">
              <h1>CARRINHO DE COMPRAS</h1>
              <span><Link className="link-home" to="/">HOME PAGE</Link></span>
          </header>
          <div className="list-cart">
            {ShowCart()}
          </div>
      </div>
      </>
    );
  }
}


const mapStateToProps = store => ({
  cart: store.clickCart.cart, 
  amount: store.clickAmount.amount, 
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ increment, decrement, add, cartRemove, cartClearUpdate }, dispatch); // vincula (bind) ações (actions) com bindActionCreators


export default connect(mapStateToProps, mapDispatchToProps)(Cart);