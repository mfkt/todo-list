import React from 'react';
import { ItemDto } from '../model/itemDto';
import ItemsStyle from '../styles/components/ItemsStyle';

interface Props {
  lists: ItemDto;
}

const Item: React.FC<Props> = (props) => {
  return <ItemsStyle />;
};

export default Item;
