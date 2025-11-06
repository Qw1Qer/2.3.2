import cartEmpty from '../../assets/cartEmpty.png';
import ProductCounter from "../ProductCounter/ProductCounter.tsx";

interface CartProps {
    cards?: any[],
    forOpen?: boolean,
    onUpdateQuantity?: (productId: number, newQuantity: number) => void
}

const Cart = ({cards, forOpen, onUpdateQuantity}: CartProps) => {

    const handleCountChange = (itemId: number, newQuantity: number) => {
        if (onUpdateQuantity) {
            if (newQuantity === 0) {

                onUpdateQuantity(itemId,0);
            } else {
                onUpdateQuantity(itemId, newQuantity);
            }
        }
    };

    const totalAmount = cards?.reduce((acc, item) => {
        return acc + (item.quantity * parseFloat(item.price));
    }, 0) || 0;

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
                                            count={item.quantity}
                                            onCountChange={(newCount) => handleCountChange(item.id, newCount)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <h3>Total:</h3>
                                <div>${totalAmount.toFixed(2)}</div>
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