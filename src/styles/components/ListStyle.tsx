import React from 'react';
import { ListDto } from '../../model/listDto';
// @ts-ignore
import styled from 'styled-components';

type Props = {
  list: ListDto;
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

const ListStyle: React.FC<Props> = (props) => {
  return (
    <Body>
      <Header>Item</Header>
      <Footer>Footer</Footer>
    </Body>
  );
};

export default ListStyle;
