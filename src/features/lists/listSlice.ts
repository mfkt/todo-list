import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { ListDto } from '../../model/listDto';
import { ItemDto } from '../../model/itemDto';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

const axios = require('axios');

interface State {
  list: ListDto[];
  selectedList: ListDto | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

const initialState: State = {
  list: [],
  selectedList: undefined,
  status: 'idle',
  error: ''
};

export const listSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reload: (state: State) => {
      state.status = 'idle';
    },
    addItem: (state: State, action: PayloadAction<ItemDto>) => {
      if (state.selectedList) {
        state.selectedList.items.push(action.payload);
      }
    },
    markItem: (state: State, action: PayloadAction<number>) => {
      const itemToEdit: ItemDto | undefined = state.selectedList?.items.find(
        (item: ItemDto) => item.id === action.payload
      );
      if (itemToEdit) {
        itemToEdit.state = 'FINISHED';
      }
    },
    removeItem: (state: State, action: PayloadAction<number>) => {
      console.log(action.payload);
    },
    selectList: (state: State, action: PayloadAction<number>) => {
      state.selectedList = state.list.find(
        (list: ListDto) => list.id === action.payload
      );
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<NoInfer<State>>) {
    builder
      .addCase(fetchLists.pending, (state: State, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state: State, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchLists.rejected, (state: State, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postList.pending, (state: State, action) => {
        state.status = 'loading';
      })
      .addCase(postList.fulfilled, (state: State, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(postList.rejected, (state: State, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(putList.pending, (state: State, action) => {
        state.status = 'loading';
      })
      .addCase(putList.fulfilled, (state: State, action) => {
        state.status = 'succeeded';
        const list: ListDto | undefined = state.list.find(
          (list: ListDto) => list.id === action.payload.id
        );
        if (list) {
          list.name = action.payload.name;
          list.items = action.payload.items;
        }
      })
      .addCase(putList.rejected, (state: State, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Action creators are generated for each case reducer function
export const { reload, selectList, addItem, markItem, removeItem } =
  listSlice.actions;

export default listSlice.reducer;

export const fetchLists: any = createAsyncThunk(
  'lists/fetchLists',
  async () => {
    const response = await axios.get(
      'https://6280be031020d85205810608.mockapi.io/mf-todo-list/lists'
    );
    return response.data;
  }
);

export const postList: any = createAsyncThunk(
  'lists/postList',
  async (data: ListDto) => {
    const response = await axios.post(
      'https://6280be031020d85205810608.mockapi.io/mf-todo-list/lists',
      {
        name: data.name,
        items: data.items
      }
    );
    return response.data;
  }
);

export const putList: any = createAsyncThunk(
  'lists/putList',
  async (data: ListDto) => {
    const response = await axios.put(
      `https://6280be031020d85205810608.mockapi.io/mf-todo-list/lists/${data.id}`,
      {
        id: data.id,
        name: data.name,
        items: data.items
      }
    );
    return response.data;
  }
);
