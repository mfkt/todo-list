import React, { useEffect } from 'react';
import ListsStyle from '../styles/components/ListsStyle';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { postList, fetchLists } from '../features/lists/listSlice';
import { ListDto } from '../model/listDto';
import List from './List';
import ProgressStyle from '../styles/components/ProgressStyle';

const Lists: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.data.list);
  const status = useSelector((state: RootState) => state.data.status);

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
      <ListsStyle headline='TODO lists' onCreateList={handleCreateList}>
        {list.map((list: ListDto) => (
          <List list={list} key={list.id} />
        ))}
      </ListsStyle>
    );
  } else {
    return <div>error</div>;
  }
};

export default Lists;
