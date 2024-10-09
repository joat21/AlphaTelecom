import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      {/* пока главной страницей оставлю ЛК клиента, потом решим как лучше сделать */}
      {/* и в целом нужно будет роутинг потом донастроить */}
      <Route path="/" element={<h1>ЛК клиента</h1>}></Route>
      <Route path="/tariffs" element={<h1>Тарифы</h1>} />
      <Route path="/tariffs/:id" element={<h1>Тариф такой то</h1>} />
      <Route
        path="/tariff-constructor"
        element={<h1>Конструктор тарифов</h1>}
      />
      <Route path="/client-auth" element={<h1>Вход для клиентов</h1>} />
      <Route path="/admin-auth" element={<h1>Вход для операторов</h1>} />
      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}

export default App;
