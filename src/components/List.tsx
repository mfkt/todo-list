import React from 'react';
import { ListDto } from '../model/listDto';
import ListStyle from '../styles/components/ListsStyle';

interface Props {
  lists: ListDto;
}

const List: React.FC<Props> = (props) => {
  return <ListStyle />;
};

export default List;
