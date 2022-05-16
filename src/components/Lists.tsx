import React, { useEffect } from 'react';
import ListsStyle from '../styles/components/ListsStyle';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  postList,
  fetchLists,
  selectList,
  putList
} from '../features/lists/listSlice';
import { ListDto } from '../model/listDto';

const Lists: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.data.list);
  const status = useSelector((state: RootState) => state.data.status);
  const selectedList = useSelector(
    (state: RootState) => state.data.selectedList
  );
  const newList: ListDto = {
    id: 0,
    name: 'Updated',
    items: [
      {
        id: 0,
        title: 'title',
        state: 'FINISHED',
        deadline: '12.12.2022'
      }
    ]
  };

  useEffect(() => {
    console.log(selectedList);
    if (status === 'idle') {
      console.log(status);
      dispatch(fetchLists());
    }
  }, [status, dispatch, selectedList]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'succeeded') {
    return (
      <div>
        <button
          onClick={() => {
            dispatch(postList(newList));
          }}
        >
          Create List
        </button>
        <ListsStyle>
          {list.map((list: ListDto) => (
            <div
              onClick={() => {
                dispatch(selectList(list.id));
                dispatch(
                  putList({
                    id: list.id,
                    name: 'Updated',
                    items: [
                      {
                        id: 0,
                        title: 'title',
                        state: 'ACTIVE',
                        deadline: '12.12.2022'
                      },
                      {
                        id: 2,
                        title: 'title2',
                        state: 'FINISHED',
                        deadline: '12.12.2022'
                      },
                      {
                        id: 3,
                        title: 'title3',
                        state: 'ACTIVE',
                        deadline: '12.12.2022'
                      }
                    ]
                  })
                );
              }}
              key={list.id}
            >
              {list.name}
            </div>
          ))}
        </ListsStyle>
      </div>
    );
  } else {
    return <div>error</div>;
  }
};

export default Lists;
