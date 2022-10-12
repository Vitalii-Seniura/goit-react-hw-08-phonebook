import { GlobalStyle } from '../components/GlobalStyle';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactForm } from '../components/ContactForm/contactForm';
import ContactList from '../components/ContactList/contactList';
import Filter from '../components/Filter/filter';
import PropTypes from 'prop-types';
import { setFilter } from 'redux/contacts/filterSlice';
import { operations, selectors } from '../redux/contacts';

export default function Contacts() {
  const dispatch = useDispatch();
  const filterCont = useSelector(selectors.selectFilter);
  const items = useSelector(selectors.selectItems);
  const isLoading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);

  const addContactList = ({ name, number }) => {
    const searchName = name.toLowerCase();
    items.find(contact => contact.name.toLowerCase() === searchName)
      ? alert('contact is already in contacts')
      : dispatch(operations.addContact({ name, number }));
  };

  const handleDelete = itemId => {
    dispatch(operations.deleteContact(itemId));
  };

  const handleFindChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  const filterContact = items.filter(item =>
    item.name.toLowerCase().includes(filterCont.toLowerCase())
  );

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactList} />
      <h2>Contacts</h2>
      <Filter value={filterCont} onChange={handleFindChange} />
      {isLoading && !error && <b>Request in progress.....</b>}
      {error && <p>{error}</p>}
      <ContactList contacts={filterContact} onLeaveFeedback={handleDelete} />
      <GlobalStyle />
    </div>
  );
}

Contacts.propTypes = {
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
