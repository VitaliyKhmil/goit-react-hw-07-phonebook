import { BASE_URL } from 'constants/api';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

export const fetchAllContacts = async () => {
  return await axios.get('/contacts').then(response => response.data);
};

export const fetchAddContact = async contact => {
  return await axios.post('/contacts', contact).then(response => response.data);
};

export const fetchDeleteContact = async id => {
  return await axios.delete(`/contacts/${id}`).then(() => id);
};
