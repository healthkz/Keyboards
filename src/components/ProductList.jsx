import {useState, useEffect} from 'react'; 
import {collection, getDocs} from 'firebase/firestore';
import {db} from './FirebaseConfig.js';
import '../App.css';

const ProductList = ({addToCart}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [addedProductId, setAddedProductId] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Keyboards'));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductId(product.id);
        
        // сброс анимации через 2 секунды (хотя зачем писать коммент если все и так понятно)
        setTimeout(() => {
            setAddedProductId(null);
        }, 2000);
    };
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка продуктов...</p>
            </div>
        );
    }
    
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">⌨️</div>
                <h3>Нет доступных продуктов</h3>
                <p>Список пуст или недоступен</p>
            </div>
        );
    }
    
    return (
        <div className="products-container">
            <div className="products-header">
                <h1>Наши клавиатуры</h1>
                <p>Найдено {filteredProducts.length} моделей</p>
                <br />
                <input 
                    type="text" 
                    placeholder='Поиск клавиатур...' 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            
            <div className="products-grid">
                {filteredProducts.map((product) => ( 
                    <div className="product-card" key={product.id}>
                        <div className="product-image-container">
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/400x300/edf2f7/4a5568?text=No+Image";
                                }}
                            />
                            {addedProductId === product.id && (
                                <div className="product-added-badge">Добавлено!</div>
                            )}
                        </div>
                        
                        <div className="product-content">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            
                            <div className="product-footer">
                                <span className="product-price">{product.price} тг.</span>
                                <button 
                                    className={`add-to-cart-button ${addedProductId === product.id ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {addedProductId === product.id ? '✓ Добавлено' : 'Добавить в корзину'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredProducts.length === 0 && searchQuery && (
                <div className="no-results">
                    <p>По запросу "{searchQuery}" ничего не найдено</p>
                    <button 
                        className="clear-search"
                        onClick={() => setSearchQuery('')}
                    >
                        Очистить поиск
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductList;