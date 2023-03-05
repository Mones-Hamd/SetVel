import React from 'react';
import { useState, createContext } from 'react';
export const ContactContext = createContext();
export const ContactsProvider = ({ children }) => {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const value = {
    contacts,
    contact,
    setContact,
    setContacts,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
