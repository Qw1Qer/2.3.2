import Card from '../Card/Card.tsx';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {addCart} from "../../store/slices/shopSlice.ts";


const Catalog = () => {

    const error = useAppSelector(state => state.shops.error);
    const loading = useAppSelector(state => state.shops.loading);
    if (error) {
        throw error;
    }
    const dispatch = useAppDispatch();
    const handleAddToCart = (productID: any) => {
        dispatch(addCart(productID));
    }

    const products = useAppSelector(state => state.shops.products);
    return (
        <div className="app-catalog">
            <h2>Catalog</h2>
            <div className="catalog-list">
                {loading ? (
                    Array.from({ length: 30 }).map((_, index) => (
                        <Card
                            key={index}
                            forLoading={true} prodId={0}                        />
                    ))
                ) : (
                    products?.map((product) => (
                        <Card
                            prodImg={product.image}
                            key={product.id}
                            prodName={(product.name).split('-')[0]}
                            prodWeight={(product.name).split('-')[1]}
                            prodPrice={product.price}
                            onCart={()=> handleAddToCart(product.id)}
                            forLoading={false}
                            prodId={product.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalog;