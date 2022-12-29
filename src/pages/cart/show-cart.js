import './index.css'; // importa css de App.css
import React, {Component} from 'react'; // importe de React
import {bindActionCreators} from 'redux'; // importar de redux
import { useSelector, useDispatch, connect } from 'react-redux'; // importar de react-redux
import { increment, decrement, add, cartRemove, cartClearUpdate } from '../../store/actions'; // importar de store/actions
import { ToastContainer, toast } from 'react-toastify'; // importar de react-toastify
import 'react-toastify/dist/ReactToastify.css';

import {  // importa Link de react-router-dom para gerar os links de JSX
  Link, Redirect
} from "react-router-dom";
import showCart from './show-cart';

// declare Cart como componente de classe que herda (estende) de Component 
class Cart extends Component {
  state = {
    addSuccess: 'success',
  }

  render() {
    const notify = (message) => toast(message.split(' ').join(' ')); // declare função notify, para a notificação customizada
    let total = 0;
    const {
      id, // id para representar a notificação de adição de item ao carrinho com sucesso
      cart, // text para a interpolação dos valores da lista (objeto literal)
      amount, // amount para representar a quantia de cada livro no carrinho individualmente
      increment,  // representa o incremento (soma) da quantia de livros
      decrement,  // representa o decremento (subtração) da quantia de livros
      cartRemove,
      cartClearUpdate,
    } = this.props; // obtém de this.props os objetos (id, add, cart, amount, increment, decrement)

    if(id === 'yes') {
      notify('Livro adicionado com sucesso!');
      return <Redirect to="/cart/no" />
    }

    // responsável pelo preço total de todos os items ao carrinho de compras
    const totalCart = (price, amount) => {
      total += price * amount;
      return total.toFixed(2);  // fixe somente duas casas decimais depois da vírgula
    }

    // responsável pelo preço subtotal de cada livro individualmente
    const subTotal = (price, amount) => {
      return (price * amount).toFixed(2); // fixe somente duas casas decimais depois da vírgula
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

    // responsável pela exibição (show) do carrinho de compras
    const ShowCart = () => {
      // renderiza (exiba) o HTML do carrinho de compras
      return (cart.length > 0) ? cart.map((book, index) => {return <>
        <div className="header-list-cart">
          <div style={{textAlign: 'center'}} className="cart-item">LIVRO</div>
          <div className="cart-item"></div>
          <div className="cart-item">PREÇO</div>
          <div className="cart-item">QUANTIDADE</div>
          <div class="cart-item">SUBTOTAL</div>
        </div>
        <div className="items-list-cart">
          <div className="cart-item"><img src={book[0].img} width={100} height={150} /></div>
          <div className="cart-item">{book[0].title}</div>
          <div className="cart-item">R$ {book[0].price}</div>
          <div className="cart-item">
            <div>
              <button onClick={() => cartDecrement(book[0].id)} className="btn-amount-cart">-</button> 
              &nbsp;{amount[book[0].id]}&nbsp; 
              <button onClick={() => cartIncrement(book[0].id)}  className="btn-amount-cart">+</button>
            </div>
            <div><button onClick={() => cartRemoveItem(book[0].id)} className="btn-remove-cart">Remover</button></div>
          </div>
          <div className="cart-item">R$ {subTotal(book[0].price, amount[book[0].id])}</div>
        </div>
        <div className="footer-list-cart"><span><button onClick={() => cartClearUpdate(book[0].id)} className="btn-clear-cart">Esvaziar Carrinho</button></span>&nbsp;&nbsp;TOTAL R$ {totalCart(book[0].price, amount[book[0].id])}</div>
        </>
      }) : <h4 style={{marginTop: '25%', textAlign: 'center', fontSize: '20pt'}}>carrinho vázio</h4>
    }

    // agora, renderiza (exiba) o HTML
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

// declare método padrão (mapStateToProps) do React para recuperar os valores da Store que vem de combineReducers do script main.js
const mapStateToProps = store => ({
  cart: store.clickCart.cart, // obtém de combineReducers de main.js
  amount: store.clickAmount.amount, // obtém de compineReducers de main.js
});

// declare método padrão (mapDispatchToProps) para realizar dispatch (ações) para increment, decrement e add com bindActionCreators
const mapDispatchToProps = dispatch =>
  bindActionCreators({ increment, decrement, add, cartRemove, cartClearUpdate }, dispatch); // vincula (bind) ações (actions) com bindActionCreators

// exporta connect vinculando métodos padrão acima ao componente Cart para que o combineReducers funcione em main.js
export default connect(mapStateToProps, mapDispatchToProps)(Cart);