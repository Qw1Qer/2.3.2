import cartLogo from '../../assets/cartGreen.svg'
import {useState} from "react";
import Button from "../Button/Button.tsx";
import ProductCounter from "../ProductCounter/ProductCounter.tsx";
import loader from '../../assets/loader.svg'


interface CardProps {
    prodImg?: string,
    prodName?: string,
    prodPrice?: string,
    product?: any,
    onCart?: (productData: any) => void,
    forLoading?: boolean
}

const Card = ({prodImg, prodName, prodPrice, product, onCart, forLoading = false}: CardProps) => {
    const [counter, setCounter] = useState(1);

    const handleAddToCart = () => {
        if (onCart && product && !forLoading) {
            onCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: counter
            });
        }
    }

    return (
        <div className="catalog-card">
            <img
                className='card-logo'
                src={forLoading ? loader : prodImg}
                alt={forLoading ? "Loading..." : prodName}
            />
            <div className="card-interactive">
                {forLoading ? null
                 : (
                    prodName
                )}
                {!forLoading && (
                    <ProductCounter
                        count={counter}
                        onCountChange={setCounter}
                        itCard={true}
                    />
                )}
            </div>
            <div className="card-info">
                {forLoading ? null
                 : (
                    `$ ${prodPrice}`
                )}
                {forLoading ? null : <Button
                    text='Add to cart'
                    logo={cartLogo}
                    unhoverClass='card-button__disable'
                    hoverClass='card-button__active'
                    onClick={handleAddToCart}
                />
                }
            </div>
        </div>
    );
};

export default Card;