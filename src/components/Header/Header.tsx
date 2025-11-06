import cart from '../../assets/cart.svg';
import logo from "../../assets/logo.svg"
import Button from "../Button/Button.tsx";


interface HeaderProps {
    onOpenCart?: () => void,
    cards?: any[]
}

const Header = ({onOpenCart, cards}: HeaderProps) => {


    return (
        <div className="app-header">
            <img src={logo} alt='logo'/>
            <Button
                onClick={onOpenCart}
                text="Cart" logo={cart}
                unhoverClass={'header-button__disable'}
                hoverClass={'header-button__active'}
                forAlt={'cart'}
                cartCount={0}
                cards={cards} />
        </div>
    );
};

export default Header;