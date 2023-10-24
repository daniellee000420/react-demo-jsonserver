const initialState = {
  selectedProduct: [],
  count: 0,
  showProduct: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SHOW_PRODUCT":
      return {
        ...state,
        showProduct: action.payload,
      };
    case "ADD_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    case "ADD_CART":
      return {
        ...state,
        selectedProduct: [...state.selectedProduct].some(
          (p) => p === action.payload
        )
          ? [...state.selectedProduct]
          : [...state.selectedProduct, action.payload],
      };
    case "REMOVE_CART":
      return {
        ...state,
        selectedProduct: [...state.selectedProduct].filter(
          (p) => p !== action.payload
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        selectedProduct: [],
      };
    default:
      return state;
  }
};

export default productReducer;
