export interface ItemDto {
  id: number;
  title: string;
  text?: string;
  deadline: string;
  state: 'ACTIVE' | 'FINISHED';
}
