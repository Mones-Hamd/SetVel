import { useContext } from 'react';
import { ContactContext } from '../context/Contactcontext';
import useFetch from './useFetch';

export const useContact = (id,fId) => {
  //
  const { setContacts, setContact } = useContext(ContactContext);

  const ROUT = `/contacts/${id}`;
  const DELETEROUT=`/contacts/${fId}`;
  const CONTACTROUT = `/contacts`;
  const onReceived =  (data) => {
    let contacts =[];
    for (let item in data.contacts[0]){
      contacts.push(data.contacts[0][item])
    };

    setContacts(contacts);
  };
  const useContacts = useFetch(ROUT, onReceived);
  const useContact = useFetch(CONTACTROUT, async (data) => {
    await setContact(data.contacts);
  });
const useUpdate =useFetch(ROUT,(data)=>{

})
const useDelete =useFetch(DELETEROUT,(data)=>{

})

  const getContacts = () => {
    const requestOpt = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    useContacts.performFetch(requestOpt);
  };
  const postContact = (data) => {
    const requestOpt = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        
      
      },
      body: JSON.stringify(data)
      ,
    };
    useContact.performFetch(requestOpt);
  };
  const updateContact = (data) => {
    const requestOpt = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        
      
      },
      body: JSON.stringify(data)
      ,
    };
    useUpdate.performFetch(requestOpt);
  };
  const deleteContact = () => {
    const requestOpt = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        
      
      },
      
    };
    useDelete.performFetch(requestOpt);
  };

  return {
    getContacts: {
      isLoading: useContacts.isLoading,
      isSuccess: useContacts.isSuccess,
      perform: getContacts,
      isError: useContacts.error,
      cancel: useContacts.cancelFetch,
    },
    postContact: {
      isLoading: useContact.isLoading,
      isSuccess: useContact.isSuccess,
      perform: postContact,
      isError: useContact.error,
      cancel: useContact.cancelFetch,
    },
    updateContact: {
      isLoading: useUpdate.isLoading,
      isSuccess: useUpdate.isSuccess,
      perform: updateContact,
      isError: useUpdate.error,
      cancel: useUpdate.cancelFetch,
    },
  deleteContact: {
      isLoading: useDelete.isLoading,
      isSuccess: useDelete.isSuccess,
      perform: deleteContact,
      isError: useDelete.error,
      cancel: useDelete.cancelFetch,
    },
  };
};
