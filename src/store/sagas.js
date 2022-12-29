import {all, put, select, takeLatest} from 'redux-saga/effects'
// eslint-disable-next-line no-unused-vars
import { addSuccess, cartAmountUpdateSuccess, cartRemove, cartAmountUpdate, cartClearAmountUpdate } from '../store/actions';


const productsjson = [
    {id: 1, title: 'Luna', price: 185.00, img: 'https://static.natura.com/cdn/ff/gN2TLzXLIDyW1Ge0jjnxUjN82pjRyOj3_v5vUM4AfPk/1666791481/public/styles/original/public/2022-10/trinca-luna_classico.webp?itok=Daoh8mfg&img=2'},
    {id: 2, title: 'Encanto Atraente & Deslumbrante', price: 70.00, img: 'https://www.avon.com.br/assets/fit-in/720x720/center/middle/https%3A%2F%2Favongroup.vtexassets.com%2Farquivos%2Fids%2F172903%2F1446843.jpg%3Fv%3D637672283447400000'},
    {id: 3, title: 'Natura Homem', price: 170.00, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS969gPFD3ncpdiEfo3mpC6izq18P0t84fQaQ&usqp=CAU'}
];


function* addToCart({id}) {
    // eslint-disable-next-line no-unused-vars
    const s = yield select(state => (state.clickCart.cart.map((p => {return p[0].id === id}))));

    const product = productsjson.map(product => (product.id === id) ? product : null);


    yield put(addSuccess([product[id - 1]]));

    yield put(cartAmountUpdateSuccess(id));
}


function* removeAmount({id}) {

    yield put(cartAmountUpdate(id));
}


function* cartClearUpdate() {    
    
    yield put(cartClearAmountUpdate());
}

export default all([
    takeLatest('add', addToCart),
    takeLatest('@cart/removeItem', removeAmount),
    takeLatest('@cart/clear', cartClearUpdate)
]);