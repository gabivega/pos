import { createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    cart: [],
    products: [],
    categories: [],
    proveedores: [],
    currentProduct : {},
    pos: [],
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;            
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null
        },
        setProducts: (state, action) => {
            state.products = action.payload.products            
        },
        setVisibleProducts: (state, action) => {
            state.visibleProducts = action.payload.products            
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categorias                   
        },
        setProveedores: (state, action) => {
            state.proveedores = action.payload.proveedores                  
        }        ,
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload.producto         
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart
        },
        addToCart: (state, action) => {    
            state.cart.push(action.payload.producto)
        },
        addToPointOfSale: (state, action) => {
            const { title, quantity, salePrice } = action.payload;
            const productToAdd = {
                title,
                quantity,
                salePrice
            };
        state.pos = [...state.pos, productToAdd];
        console.log(state.pos);
          },
        removeFromCart: (state, action) => {
            const { _id } = action.payload;
            const newCart = state.cart.filter((producto) => producto._id !== _id);
            return {
              ...state,
              cart: newCart,
            };
          }
    }
})

export const { setLogin, setLogout, setProducts, setCategories, setProveedores, setVisibleProducts,
     setCurrentProduct, setCart, addToCart, removeFromCart, addToPointOfSale} = globalSlice.actions;
     
export default globalSlice.reducer