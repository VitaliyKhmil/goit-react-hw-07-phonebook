import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchAddContact,
  fetchDeleteContact,
  fetchAllContacts,
} from 'api/contactsApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contactsApi = await fetchAllContacts();
      return contactsApi;
    } catch (error) {
      toast.error('Oops, something went wrong!');
      return rejectWithValue(error);
    }
  }
);

export const addItem = createAsyncThunk(
  'contacts/addItem',
  async (contact, { rejectWithValue }) => {
    try {
      await fetchAddContact(contact);
      const contactsApi = await fetchAllContacts();
      toast.success('Contact added!');
      return contactsApi;
    } catch (error) {
      toast.error('Oops, something went wrong!');
      return rejectWithValue(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await fetchDeleteContact(id);
      const contactsApi = await fetchAllContacts();
      toast.success('Contact deleted!');
      return contactsApi;
    } catch (error) {
      toast.error('Contact not found!');
      return rejectWithValue(error);
    }
  }
);


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    filterItems: (state, action) => {
      return { ...state, filter: action.payload };
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, _) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        items: [...action.payload],
      };
    },

    [addItem.pending]: (state, _) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [addItem.fulfilled]: (state, action) => {
      return {
        ...state,
        items: [...action.payload],
      };
    },

    [deleteItem.pending]: (state, _) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteItem.fulfilled]: (state, action) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
});



export const { filterItems } = contactsSlice.actions;

export const getItemValue = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
export const contactsReducer = contactsSlice.reducer;