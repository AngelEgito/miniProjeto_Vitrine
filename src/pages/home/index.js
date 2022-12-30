/* eslint-disable jsx-a11y/alt-text */
import './index.css';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch, connect } from 'react-redux';
import { add } from '../../store/actions';

import { Link, Redirect } from "react-router-dom";


class Home extends Component {
  state = {
    redirect: null
  }

  render() {
    const productsjson = [
      {id: 1, title: 'Luna', price: 184.00, img: 'https://static.natura.com/cdn/ff/gN2TLzXLIDyW1Ge0jjnxUjN82pjRyOj3_v5vUM4AfPk/1666791481/public/styles/original/public/2022-10/trinca-luna_classico.webp?itok=Daoh8mfg&img=2'},
      {id: 2, title: 'Encanto Atraente & Deslumbrante', price: 70.00, img: 'https://www.avon.com.br/assets/fit-in/720x720/center/middle/https%3A%2F%2Favongroup.vtexassets.com%2Farquivos%2Fids%2F172903%2F1446843.jpg%3Fv%3D637672283447400000'},
      {id: 3, title: 'Natura Homem', price: 170.00, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS969gPFD3ncpdiEfo3mpC6izq18P0t84fQaQ&usqp=CAU'}
    ];
    const {
      add,
      cart,
      amount, 
    } = this.props;

    const addProduct = product => {
      add(product);
      this.setState({
        redirect: 'clicked'
      });
    }


    if(this.state.redirect !== null)
      return <Redirect to="/cart/yes" />

      return (
      <>
      <div className="container-home">
        <header className="home-header">
          <h1>Lista de Produtos</h1>
          <span><Link className="link-cart" to="/show-cart/no">CARRINHO</Link></span>
        </header>
        <main>
          <div className="list-products">
            {productsjson.map((product, index) => <>
              <div class="list-row">
                <p><img src={product.img} width={150} height={200} /></p>
                <p>{product.title}</p>
                <p>R$ {product.price}</p>
                <p>
                  <button className="list-button" onClick={() => addProduct(product.id)}>
                    <span style={{padding: '9px', background: 'rgb(255, 153, 153)'}}>{(amount[product.id] > 0) ? amount[product.id] : 0}</span><span>ADICIONAR AO CARRINHO</span>
                  </button>
                </p>
              </div>
            </>)}
          </div>
        </main>
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
  bindActionCreators({ add }, dispatch); 

export default connect(mapStateToProps, mapDispatchToProps)(Home);