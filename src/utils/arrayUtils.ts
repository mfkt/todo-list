import { ItemDto } from '../model/itemDto';
import { ItemStatsDto } from '../model/itemStats';
import { convertDateToString, getCurrentDate } from './dateUtils';

const getItemsByState = (items: ItemDto[], state: string): ItemDto[] => {
  return items.filter((item: ItemDto) => item.state === state);
};

const getItemsBySearchText = (
  items: ItemDto[],
  searchText: string
): ItemDto[] => {
  return items.filter(
    (item: ItemDto) =>
      item.title === searchText ||
      item.text === searchText ||
      item.deadline === searchText ||
      item.state === searchText
  );
};

const countItemsByState = (items: ItemDto[], state: string): ItemStatsDto => {
  const filteredArray = getItemsByState(items, state);
  return {
    selected: filteredArray.length,
    totalLength: items.length
  };
};

const sortToNextDeadline = (items: ItemDto[]): ItemDto[] => {
  const today = convertDateToString(getCurrentDate().toString());
  console.log(items);
  console.log(today);
  return items.sort((itemA: ItemDto, itemB: ItemDto) => {
    if (itemA.deadline < itemB.deadline) {
      return -1;
    }
    if (itemA.deadline > itemB.deadline) {
      return 1;
    }
    return 0;
  });
};

export {
  getItemsByState,
  getItemsBySearchText,
  countItemsByState,
  sortToNextDeadline
};
