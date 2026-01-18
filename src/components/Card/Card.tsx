import cartLogo from '../../assets/cartGreen.svg'
import Button from "../Button/Button.tsx";
import ProductCounter from "../ProductCounter/ProductCounter.tsx";
import loader from '../../assets/loader.svg'




interface CardProps {
    prodImg?: string,
    prodName?: string,
    prodPrice?: number,
    product?: any,
    onCart?: () => void,
    forLoading?: boolean,
    prodWeight?: any
    prodId: number
}

const Card = ({prodImg,prodId, prodName, prodPrice, onCart, forLoading = false, prodWeight}: CardProps) => {


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
                        <span>
                            {prodName}
                            <span style={{opacity: 0.5 , fontSize: 12 , marginLeft: 10}}> {prodWeight}</span>
                        </span>
                    )}
                {!forLoading && (
                    <ProductCounter
                        productId={prodId}
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
                    onClick={onCart}
                />
                }
            </div>
        </div>
    );
};

export default Card;