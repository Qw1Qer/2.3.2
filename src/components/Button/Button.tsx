import useHover from "../../hooks/useHover.tsx";
import {useRef} from "react";


interface ButtonProps {
    text?: string,
    logo?: string,
    unhoverClass?: string,
    hoverClass?: string,
    forAlt?: string,
    cartCount?: number,
    onClick?: () => void,
}

const Button = ({text, logo ,hoverClass, forAlt, cartCount, onClick,unhoverClass }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const isHover = useHover(ref)

    return (
        <div>
            <button ref={ref}  onClick={onClick} className={isHover ? hoverClass : unhoverClass } >
                {cartCount ? <div className='cart-count'>{cartCount}</div> : null}{text}
                <img src={logo} alt={forAlt}/>
            </button>
        </div>
    );
};

export default Button;