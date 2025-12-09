import '../App.css';

const Cart = ({ cart, toggleCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }) => {
    return (
        <div className="cart-modal-overlay" onClick={toggleCart}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2 className="cart-title">Ваша корзина</h2>
                    <button className="cart-close-btn" onClick={toggleCart}>×</button>
                </div>
                
                <div className="cart-content">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon"></div>
                            <h3>Корзина пуста</h3>
                            <p>Добавьте товары из каталога</p>
                            <button className="cart-continue-btn" onClick={toggleCart}>
                                Продолжить покупки
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-header">
                                <span>Товары в корзине ({totalItems})</span>
                                <button className="cart-clear-btn" onClick={clearCart}>
                                    Очистить корзину
                                </button>
                            </div>
                            
                            <div className="cart-items-list">
                                {cart.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-image">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/80x60/edf2f7/4a5568?text=KB";
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="cart-item-details">
                                            <h4 className="cart-item-title">{item.name}</h4>
                                            <p className="cart-item-price">{item.price} тг.</p>
                                            
                                            <div className="cart-item-controls">
                                                <div className="quantity-control">
                                                    <button 
                                                        className="quantity-btn minus"
                                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="quantity-value">{item.quantity || 1}</span>
                                                    <button 
                                                        className="quantity-btn plus"
                                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <button 
                                                    className="cart-item-remove"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="cart-item-total">
                                            <span className="cart-item-total-price">
                                                {item.price * (item.quantity || 1)} тг.
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="cart-summary">
                                <div className="cart-total">
                                    <div className="cart-total-row">
                                        <span>Итого:</span>
                                        <span className="cart-total-price">{totalPrice} тг.</span>
                                    </div>
                                </div>
                                
                                <div className="cart-actions">
                                    <button className="cart-checkout-btn">
                                        Оформить заказ
                                    </button>
                                    <button className="cart-continue-shopping" onClick={toggleCart}>
                                        Продолжить покупки
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;