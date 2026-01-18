import cartEmpty from '../../assets/cartEmpty.png';
import ProductCounter from "../ProductCounter/ProductCounter.tsx";
import { useAppSelector} from "../../hooks/redux.ts";
import type {RootState} from "../../store";




const Cart = () => {




    const cards = useAppSelector(state => state.shops.cart)

    const totalAmount = cards?.reduce((acc, item) => {
        return acc + (item.quantity * item.price);
    }, 0) || 0;

    const forOpen = useAppSelector((state: RootState) => state.shops.openCart);

    return (
        <>
            {forOpen ? (
                <div className='cart-menu'>
                    {cards?.length ? (
                        <>
                            <div className="cart-items">
                                {cards.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                        <div className="cart-info">
                                            <div className="cart-item-name">
                                                <span>{(item.name).split('-')[0]}</span>
                                                <span style={{opacity: 0.5}}> {(item.name).split('-')[1]}</span>
                                            </div>
                                            <div className="cart-item-price">${item.price}</div>
                                        </div>
                                        <ProductCounter
                                          productId={item.id}
                                          itsCart={true}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <h3>Total:</h3>
                                <div>${totalAmount}</div>
                            </div>
                        </>
                    ) : (
                        <div className='cart-empty'>
                            <img src={cartEmpty} alt='cart'/>
                            Your cart is empty!
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default Cart;