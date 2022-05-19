// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';
import theme from '../theme';

interface Props {
  landHeadline: string;
  footer: string;
  children?: JSX.Element | JSX.Element[];
}

const Body = styled.div`
  width: 100%;
  background: ${theme.colors.light};
  padding-top: 10em;
  padding-bottom: 10em;
`;

const Header = styled.div`
  font-size: 4em;
  text-align: center;
  width: 100%;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  text-align: right;
  background: ${theme.colors.grey};
  color: ${theme.colors.light};
  font-weight: ${theme.fontWeights.extraBold};
`;

const FooterText = styled.p`
  padding-right: 1em;
`;

const Container = styled.div`
  width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;
`;

const LandPage: React.FC<Props> = ({ landHeadline, footer, children }) => {
  return (
    <Body>
      <Header>{landHeadline}</Header>
      <Container>{children}</Container>
      <Footer>
        <FooterText>{footer}</FooterText>
      </Footer>
    </Body>
  );
};

export default LandPage;
