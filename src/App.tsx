import React from 'react';
import { useTranslation } from 'react-i18next';
import LandPage from './styles/components/LandPage';
import CardStyle from './styles/components/CardStyle';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Header />
      <LandPage landHeadline={t('invitation')} footer={t('footer')}>
        <div onClick={handleRedirect}>
          <CardStyle title={t('todo')} color='red' />
        </div>
      </LandPage>
    </>
  );
};

export default App;
