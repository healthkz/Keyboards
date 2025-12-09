import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from '../components/Home';
import ProductList from '../components/ProductList';
import Contacts from '../components/Contacts';
import Cart from '../components/Cart';
import {useState, useEffect} from 'react';

const AppRouter = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {

    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {

      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
      };
      setCart(updatedCart);
    } else {

      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link> |{' '}
        <Link to="/product">Клавиатуры</Link> |{' '}
        <Link to="/contacts">Контакты</Link>
        <button onClick={toggleCart} className="cart-button">
          Корзина ({getTotalItems()})
        </button>
      </nav>
      
      {isCartOpen && (
        <Cart 
          cart={cart}
          toggleCart={toggleCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          totalItems={getTotalItems()}
          totalPrice={getTotalPrice()}
        />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductList addToCart={addToCart} />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;