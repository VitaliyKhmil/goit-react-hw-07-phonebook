import { ContactButton } from 'components/ContactsList/ContactsList.styled';
import { ContactItemLi } from './ContactsList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getFilterValue, fetchContacts } from 'redux/contacts';
import { useEffect } from 'react';

export const ContactsList = () => {
 const filter = useSelector(getFilterValue);
 const items = useSelector(fetchContacts);
 const dispatch = useDispatch();


  const normalizedValue = filter.toLowerCase();
  const filteredArray = items?.filter(option =>
    option.name.toLowerCase().includes(normalizedValue)
  );

  const deleteContact = contactId => {
    dispatch(deleteItem(contactId));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {filteredArray.map(({ id, name, number }) => {
        return (
          <ContactItemLi key={id}>
            {name}: {number}
            <ContactButton
              onClick={() => {
                deleteContact(id);
              }}
            >
              Delete
            </ContactButton>
          </ContactItemLi>
        );
      })}
    </ul>
  );
};
