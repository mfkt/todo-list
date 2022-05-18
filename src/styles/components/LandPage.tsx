// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';

type Props = {
  landHeadline: string;
  description: string;
  footer: string;
  children?: JSX.Element | JSX.Element[];
};

const Body = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;
`;

const LandPage: React.FC<Props> = ({
  landHeadline,
  description,
  footer,
  children
}) => {
  return (
    <Body>
      <Header>{landHeadline}</Header>
      <Container>{children}</Container>
      <Footer>{footer}</Footer>
    </Body>
  );
};

export default LandPage;
