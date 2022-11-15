import { openDB } from 'idb';

const initdb = async () =>
// Creating a new database named 'jate' which will be using version 1 of the database.
  openDB('jate', 1, {
    
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic for a method that accepts some content and adds it to the database

// Export a function that will be used to POST to the database.
export const putDb = async (content) =>{
 console.log('Post to the database');

// Create a connection to the database database and version to use.
  const contactDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

// Open up the desired object store.
  const store = tx.objectStore("jate");

// Use the .put() method on the store and pass in the content.
  const request = store.put({id:1, text:content});

// Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

// Logic for a method that gets all the content from the database.

// Export a function that  we will use to GET to the database.
export const getDb = async () =>{
 console.log('GET from the database');

// Create a connection to the database database and version we want to use.
   const contactDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate'); 

  // Use the .getAll() method to get all data in the database.
   const result = await store.getAll();
   
  // Get confirmation of the request.
  console.log('result.value', result);
    return result.value;

};
initdb();
