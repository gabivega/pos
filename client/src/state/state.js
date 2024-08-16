import { createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    products: [],
    categories: [],
    proveedores: [],
    currentProduct : {},
    pos: [],
    clientes: []
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
        setCategories: (state, action) => {
            state.categories = action.payload.categorias                   
        },
        setProveedores: (state, action) => {
            state.proveedores = action.payload.proveedores                  
        }        ,
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload.producto         
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
    setClients: (state, action) => {
        console.log("desde estado redux", action.payload)
        state.clientes = action.payload
        console.log("estado redux",state.clientes);
    }
}
})

export const { setLogin, setLogout, setProducts, setCategories, setProveedores,
     setCurrentProduct, addToPointOfSale, setClients} = globalSlice.actions;
     
export default globalSlice.reducer