export interface ItemDto {
  id: string;
  title: string;
  text?: string;
  deadline: string;
  state: 'ACTIVE' | 'FINISHED';
}
