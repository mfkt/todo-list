import React from 'react';
import { ItemDto } from '../model/itemDto';
import ItemStyle from '../styles/components/ItemStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { putList } from '../features/lists/listSlice';

interface Props {
  item: ItemDto;
}

const Item: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );
  const handleRemoveItem = (itemId: number) => {
    console.log(itemId);
    if (selectedList) {
      const newItemArray = selectedList.items.filter(
        (item: ItemDto) => itemId !== item.id
      );
      const newList = { ...selectedList, items: newItemArray };
      dispatch(putList(newList));
    }
  };

  const handleMarkAsFinishedItem = (itemId: number) => {
    console.log(itemId);
    if (selectedList) {
      const newItemArray = selectedList.items.map((item: ItemDto) => {
        if (itemId === item.id) {
          return { ...item, state: 'FINISHED' };
        }
        return item;
      });
      const newList = { ...selectedList, items: newItemArray };
      dispatch(putList(newList));
    }
  };

  return (
    <ItemStyle
      item={props.item}
      onMarkAsFinishedItem={handleMarkAsFinishedItem}
      onRemoveItem={handleRemoveItem}
    />
  );
};

export default Item;
