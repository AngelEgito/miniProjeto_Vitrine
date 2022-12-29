export function increment(id) {
    return {
        type: '@cart/incremented',
        id, 
    }
}


export function decrement(id) {
    return {
        type: '@cart/decremented',
        id,
    }
}


export function add(id) {
    return {
        type: 'add',
        id,
    }
}


export function addSuccess(product) {
    return {
        type: '@cart/addSuccess',
        product,
    }
}

export function cartAmountUpdateSuccess(id) {
    return {
        type: '@cart/amountSuccess',
        id,
    }
}


export function cartRemove(id) {
    return {
        type: '@cart/removeItem',
        id,
    }
}

export function cartAmountUpdate(id) {
    return {
        type: '@cart/removeAmount',
        id,
    }
}


export function cartClearUpdate() {
    return {
        type: '@cart/clear',
    }
}

export function cartClearAmountUpdate() {
    return {
        type: '@cart/clearAmount',
    }
}