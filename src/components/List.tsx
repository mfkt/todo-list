import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectList } from '../features/lists/listSlice';

import { ListDto } from '../model/listDto';
import ListStyle from '../styles/components/ListStyle';

interface Props {
  list: ListDto;
}

const List: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );

  const handleSelectList = (listId: number) => {
    dispatch(selectList(listId));
  };

  return (
    <ListStyle
      list={props.list}
      onSelectList={handleSelectList}
      selectedList={selectedList?.id === props.list.id}
    />
  );
};

export default List;
