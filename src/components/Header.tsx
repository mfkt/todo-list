import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import HeaderStyle from '../styles/components/HeaderStyle';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleRedirect = () => {
    navigate('/');
  };

  const handleTranslation = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <HeaderStyle
      onNavigateHome={handleRedirect}
      currentLocale={i18n.language}
      onChangeLocale={handleTranslation}
    >
      {' '}
      {t('todoApp')}
    </HeaderStyle>
  );
};

export default Header;
