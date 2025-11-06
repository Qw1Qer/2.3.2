import minusDisable from "../../assets/minusDis.svg";
import minusActive from "../../assets/minusActive.svg";
import plusActive from "../../assets/plus1op.svg";

interface ProductCounterProps {
    count?: number,
    onCountChange?: (newCount: number) => void,
    itCard?: boolean
}

const ProductCounter = ({count = 1, onCountChange, itCard}: ProductCounterProps) => {
    const addItem = () => {
        if (onCountChange) {
            onCountChange(count + 1);
        }
    }

    const removeItem = () => {
        if (onCountChange) {
            if (itCard) {
                if (count > 1) {
                    onCountChange(count - 1);
                }
            } else {
                onCountChange(count - 1);
            }
        }
    }

    return (
        <div className="card-counter">
            <button
                className='card-minus__active'
                onClick={removeItem}
                disabled={itCard ? (count <= 1) : false}
            >
                <img src={itCard ? (count <= 1 ? minusDisable : minusActive) : minusActive } alt='remove'/>
            </button>
            {count}
            <button className='card-plus__active' onClick={addItem}>
                <img src={plusActive} alt='add'/>
            </button>
        </div>
    );
};

export default ProductCounter;