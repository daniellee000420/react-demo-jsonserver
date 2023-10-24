export const addCart = (productId) => {
  return {
    type: "ADD_CART",
    payload: productId,
  };
};

export const addCnt = (cnt) => {
  return {
    type: "ADD_COUNT",
    payload: cnt,
  };
};

export const removeCart = (productId) => {
  return {
    type: "REMOVE_CART",
    payload: productId,
  };
};

export const clearCart = (productId) => {
  return {
    type: "CLEAR_CART",
  };
};

export const addShowProduct = (pro) => {
  return {
    type: "ADD_SHOW_PRODUCT",
    payload: pro,
  };
};
