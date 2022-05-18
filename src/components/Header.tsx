import React from 'react';
import HeaderStyle from '../styles/components/HeaderStyle';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleTranslation = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <HeaderStyle
      currentLocale={i18n.language}
      onChangeLocale={handleTranslation}
    >
      {' '}
      {t('todoApp')}
    </HeaderStyle>
  );
};

export default Header;
