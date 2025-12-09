const Home = () => {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1 className="hero-title">Добро пожаловать в наш магазин!</h1>
        <p className="hero-subtitle">Здесь будут лучшие клавиатуры для профессионалов и энтузиастов</p>
        
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">⌨️</div>
            <h3>Эргономичные модели</h3>
            <p>Клавиатуры, созданные для комфортной работы и игр</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Быстрая доставка</h3>
            <p>Доставляем по всему Казахстану за 1-3 дня</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Гарантия качества</h3>
            <p>Официальная гарантия на все товары 12 месяцев</p>
          </div>
        </div>
        
        <div className="cta-section">
          <p>Изучите нашу коллекцию механических клавиатур</p>
          <a href="/product" className="cta-button">
            Смотреть каталог
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;