import { ItemDto } from './itemDto';

export interface ListDto {
  id: number;
  name: string;
  items: ItemDto[];
}
