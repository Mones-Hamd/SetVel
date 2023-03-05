import { useContext } from 'react';
import { ContactContext } from '../context/Contactcontext';
import useFetch from './useFetch';

export const useContact = (id) => {
  //
  const { setContacts, setContact } = useContext(ContactContext);

  const ROUT = `/contacts/${id}`;
  const CONTACTROUT = `/contacts/${id}`;
  const onReceived = async (data) => {
    await setContacts(data.data);
  };
  const useContacts = useFetch(ROUT, onReceived);
  const useContact = useFetch(CONTACTROUT, async (data) => {
    await setContact(data.data);
  });

  const getContacts = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    useContacts.performFetch(requestOpt);
  };
  const getContact = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    useContact.performFetch(requestOpt);
  };
  return {
    getContacts: {
      isLoading: useContacts.isLoading,
      isSuccess: useContacts.isSuccess,
      perform: getContacts,
      isError: useContacts.error,
      cancel: useContacts.cancelFetch,
    },
    getContact: {
      isLoading: useContact.isLoading,
      isSuccess: useContact.isSuccess,
      perform: getContact,
      isError: useContact.error,
      cancel: useContact.cancelFetch,
    },
  };
};
