import Header from "../../Header/Header.tsx";
import Catalog from "../../Catalog/Catalog.tsx";
import {useEffect, useState} from "react";
import Cart from "../../Cart/Cart.tsx";


const Shop = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<any[]>([])
    const [openCart, setOpenCart] = useState<boolean>(false)

    function openedCart() {
        if(openCart) {
            setOpenCart(false);
        }else {
            setOpenCart(true);
        }
    }

    useEffect(() => {
        setLoading(true);

        // Добавляем задержку
        setTimeout(() => {
            fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
                .then(response => {
                    if (!response.ok) throw new Error('Ошибка загрузки');
                    return response.json();
                })
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    // В App компоненте
    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    function addCart(productData: {id: number, name: string, price: string, image: string, quantity: number}) {

        const existingItemIndex = cart.findIndex(item => item.id === productData.id);

        if (existingItemIndex >= 0) {

            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += productData.quantity;
            setCart(updatedCart);
        } else {
            setCart([ {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                image: productData.image,
                quantity: productData.quantity
            },...cart]);
        }
    }


    return (
        <div>

            <Header onOpenCart={openedCart} cards={cart} />
            <Catalog products={products} loading={loading} error={error} onCart={addCart}  />
            <Cart cards={cart} forOpen={openCart} onUpdateQuantity={updateQuantity}  />
        </div>
    );
};

export default Shop;