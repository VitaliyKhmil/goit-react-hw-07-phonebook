import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchAddContact,
  fetchDeleteContact,
  fetchAllContacts,
} from 'api/fetchContacts';
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
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove(state, action) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
    filterItems(state, action) {
      return { ...state, filter: action.payload };
    },
  },
});



export const { add, remove, filterItems } = contactsSlice.actions;

export const getItemsValue = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;