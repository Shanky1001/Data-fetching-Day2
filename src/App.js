
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Login from './Pages/Login';
import Fetch from './HOC/Fetch';

const DashboardMain = Fetch(Dashboard)
function App() {

  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<Login />} />
            <Route path='/dashboard' element={<DashboardMain />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;


