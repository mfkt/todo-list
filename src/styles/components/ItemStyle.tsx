import React from 'react';
// @ts-ignore
import styled from 'styled-components';
import { ItemDto } from '../../model/itemDto';

type Props = {
  item: ItemDto;
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

const ItemStyle: React.FC<Props> = (props) => {
  return (
    <Body>
      <Header>Item</Header>
      <Footer>Footer</Footer>
    </Body>
  );
};

export default ItemStyle;
