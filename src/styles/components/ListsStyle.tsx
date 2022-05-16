// @ts-ignore
import React, { JSX } from 'react';
// @ts-ignore
import styled from 'styled-components';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Body = styled.div`
  width: 100%;
  background: lightgray;
`;

const Header = styled.div`
  width: 100%;
  background: lightgray;
`;

const Footer = styled.div`
  width: 100%;
  background: lightgray;
`;

const Container = styled.div`
  width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;
`;

const ListsStyle: React.FC<Props> = (props) => {
  return (
    <Body>
      <Header>Lists</Header>
      <Container>{props.children}</Container>
      <Footer>Footer</Footer>
    </Body>
  );
};

export default ListsStyle;
