import {useEffect, useRef, useState} from "react";
import useHover from "../../hooks/useHover.tsx";

interface ButtonProps {
    text?: string,
    logo?: string,
    unhoverClass?: string,
    hoverClass?: string,
    forAlt?: string,
    cartCount?: number,
    onClick?: () => void,
    cards?: any[] | undefined
}

const Button = ({text, logo, unhoverClass,hoverClass, forAlt, cartCount, onClick, cards}: ButtonProps) => {

    const [count, setCount] = useState(0);
    const ref = useRef<HTMLButtonElement>(null);
    const isHoverd = useHover(ref)

    useEffect(() => {
        if(cards && cards.length > 0) {
            setCount(cards.length);
        }
        if (cards?.length === 0) {
            setCount(0);
        }
    }, [cards]);

    return (
        <div>
            <button ref={ref} onClick={onClick} className={isHoverd ? hoverClass : unhoverClass  } >
                {cartCount ? cartCount : ""}
                {count ? <div className='cart-count'>{count}</div> : null}{text}
                <img src={logo} alt={forAlt}/>
            </button>
        </div>
    );
};

export default Button;