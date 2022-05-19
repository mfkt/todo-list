import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  getItemsBySearchText,
  getItemsByState,
  sortToNextDeadline
} from '../utils/arrayUtils';

import { Center } from '../styles/components/LayoutStyle';
import { useTranslation } from 'react-i18next';

import { ItemDto } from '../model/itemDto';

import ItemsStyle from '../styles/components/ItemsStyle';
import Item from './Item';

const Items: React.FC = () => {
  const { t } = useTranslation();
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
        headline={`${selectedList.name} ${t('item')}`}
        onFilterStateChange={handleFilterState}
        onItemStateChange={handleItemsState}
      >
        {items.length > 0 &&
          items.map((item: ItemDto) => <Item item={item} key={item.title} />)}
      </ItemsStyle>
    );
  } else {
    return <Center>{t('NotSelected')}</Center>;
  }
};

export default Items;
