import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchLists } from '../features/lists/listSlice';

import { ListDto } from '../model/listDto';

import ProgressStyle from '../styles/components/ProgressStyle';
import ListsStyle from '../styles/components/ListsStyle';
import List from './List';

import { Center } from '../styles/components/LayoutStyle';

const Lists: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.data.list);
  const status = useSelector((state: RootState) => state.data.status);
  const error = useSelector((state: RootState) => state.data.error);

  useEffect(() => {
    if (status === 'idle') {
      console.log(status);
      dispatch(fetchLists());
    }
  }, [status, dispatch]);

  const handleCreateList = (listName: string) => {
    dispatch(
      postList({
        id: 0,
        name: listName,
        items: []
      })
    );
  };

  if (status === 'loading') {
    return <ProgressStyle />;
  } else if (status === 'succeeded') {
    return (
      <ListsStyle headline={t('TODOLists')} onCreateList={handleCreateList}>
        {list.map((list: ListDto) => (
          <List list={list} key={list.id} />
        ))}
      </ListsStyle>
    );
  } else {
    return <Center>{error}</Center>;
  }
};

export default Lists;
