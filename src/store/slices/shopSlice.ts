import {createSlice,createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';


interface cartState {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
    quantity: number;
}


const initialState: {
    products: cartState[];
    loading: boolean;
    error: string | null;
    cart: any[];
    openCart: boolean;
} = {
    products: [],
    loading: true,
    error: null ,
    cart: [],
    openCart: false,

}

export  const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async function() {
        const response =  await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');

        const data = await response.json();

        return data.map((product: any) => ({
            ...product,
            quantity: 1
        }));
    }
);


const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        openCart: (state) => {
            state.openCart = !state.openCart;
        },
        incrementQuantity: (state, action: PayloadAction<number>) =>
        {
            const product = state.products.find(product => product.id === action.payload )
            if (product) {
                product.quantity += 1
                state.cart.forEach(item => {
                    if(item.id === action.payload) {
                        item.quantity = product.quantity
                    }
                })
            }

        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const product = state.products.find(product => product.id === action.payload )
            if (product) {
                    product.quantity -= 1
                    state.cart.forEach(item => {
                        if(item.id === action.payload) {
                            item.quantity = product.quantity
                        }
                    })
            }
        },
        deleteCart: (state, action: PayloadAction<number>) => {
             state.cart = state.cart.filter(
                product => product.id !== action.payload
            )
        },
        addCart: (state,
                  action: PayloadAction<number>
        ) => {
            const activeCard = state.products.find(
                item => item.id === action.payload
            )
            if (activeCard && !state.cart.find(item => item.id === action.payload)) {
                state.cart.push(activeCard);
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch products';
            });
    },

})

export const {
    openCart,
    incrementQuantity,
    addCart,
    decrementQuantity,
    deleteCart
} = shopSlice.actions;

export default shopSlice.reducer;
