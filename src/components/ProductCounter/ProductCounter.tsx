import minusDisable from "../../assets/minusDis.svg";
import minusActive from "../../assets/minusActive.svg";
import plusActive from "../../assets/plus1op.svg";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {decrementQuantity, deleteCart, incrementQuantity} from "../../store/slices/shopSlice.ts";


interface ProductCounterProps {
    productId: number;
    itsCart?: boolean;
}

const ProductCounter = ({productId, itsCart}: ProductCounterProps) => {

    const dispatch = useAppDispatch();

    const handleIncrement = () => {
        dispatch(incrementQuantity(productId));
    }
    const handleDecrement = () => {
        if (itsCart && count <= 1) {
            dispatch(deleteCart(productId));
        }else {
            dispatch(decrementQuantity(productId));
        }
    }


    const count = useAppSelector(state =>
        state.shops.products.find(product => product.id === productId)?.quantity || 1
    );

    return (
        <div className="card-counter">
            <button
                className='card-minus__active'
                onClick={handleDecrement}
                disabled={count === 1 && !itsCart}
            >
                <img src={count === 1 && !itsCart ? (count <= 1 ? minusDisable : minusActive) : minusActive } alt='remove'/>
            </button>
            {count}
            <button className='card-plus__active' onClick={handleIncrement}>
                <img src={plusActive} alt='add'/>
            </button>
        </div>
    );
};

export default ProductCounter;