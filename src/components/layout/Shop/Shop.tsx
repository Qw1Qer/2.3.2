import Header from "../../Header/Header.tsx";
import Catalog from "../../Catalog/Catalog.tsx";
import {useEffect} from "react";
import Cart from "../../Cart/Cart.tsx";
import {fetchProducts } from '../../../store/slices/shopSlice.ts'
import { useAppDispatch} from "../../../hooks/redux.ts";

const Shop = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchProducts());
        }, 2000);

    }, [dispatch]);

    return (
        <div>
            <Header />
            <Catalog />
            <Cart />
        </div>
    );
};

export default Shop;