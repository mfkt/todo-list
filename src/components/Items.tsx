import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ItemDto } from '../model/itemDto';
import Item from './Item';
import ItemsStyle from '../styles/components/ItemsStyle';
import {
  getItemsBySearchText,
  getItemsByState,
  sortToNextDeadline
} from '../utils/arrayUtils';

const Items: React.FC = () => {
  const [itemState, setItemState] = useState<string>('ALL');
  const [filterState, setFilterState] = useState<string>('');
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );
  const items = useMemo<ItemDto[]>(() => {
    if (selectedList) {
      const filteredArray =
        itemState !== 'ALL'
          ? getItemsByState(selectedList.items, itemState)
          : selectedList.items;
      let filteredBySearchText: ItemDto[];
      if (filterState && filterState !== '') {
        filteredBySearchText = getItemsBySearchText(filteredArray, filterState);
      } else {
        filteredBySearchText = filteredArray;
      }
      return sortToNextDeadline([...filteredBySearchText]);
    }
    return [];
  }, [itemState, filterState, selectedList]);

  const handleItemsState = (state: string) => {
    setItemState(state);
  };

  const handleFilterState = (state: string) => {
    setFilterState(state);
  };

  if (selectedList) {
    return (
      <ItemsStyle
        headline={`${selectedList.name} items`}
        onFilterStateChange={handleFilterState}
        onItemStateChange={handleItemsState}
      >
        {items.length > 0 ? (
          items.map((item: ItemDto) => <Item item={item} key={item.title} />)
        ) : (
          <div>Is Empty!</div>
        )}
      </ItemsStyle>
    );
  } else {
    return <div>Not selected!</div>;
  }
};

export default Items;
