import cart from '../../assets/cart.svg';
import logo from "../../assets/logo.svg"
import Button from "../Button/Button.tsx";
import {openCart} from "../../store/slices/shopSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";



const Header = () => {

    const dispatch = useAppDispatch();
    const handleOpenCart = () => {
        dispatch(openCart())
    }
    const countCart = useAppSelector(state => state.shops.cart.length)

    return (
        <div className="app-header">
            <img src={logo} alt='logo'/>
            <Button
                onClick={handleOpenCart}
                text="Cart" logo={cart}
                unhoverClass={'header-button__disable'}
                hoverClass={'header-button__active'}
                forAlt={'cart'}
                cartCount={countCart}
                 />
        </div>
    );
};

export default Header;