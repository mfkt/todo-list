import dayjs, { Dayjs } from 'dayjs';

const convertDateToString = (date: string): string => {
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss');
};

const getCurrentDate = (): Dayjs => {
  return dayjs();
};

export { convertDateToString, getCurrentDate };
