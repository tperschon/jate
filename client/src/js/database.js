import { openDB } from 'idb';

const initdb = async () =>
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

// function to POST to db
export const putDb = async (content) => {
  // create db connection with version #
  const jateDb = await openDB('jate', 1);
  // create transaction with privileges, initialize object store with it
  const trans = jateDb.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  // pass in the content, await so we can post to log after
  const result = await store.put({ editor: content });
  // post result to log
  console.log('Data saved: ', result);
};

// function to GET from db
export const getDb = async () => {
  // create db connection with version #
  const jateDb = await openDB('jate', 1);
  // create transaction with privileges, initialize object store with it
  const trans = jateDb.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  // get only the first key from the data
  const result = await store.getAll();
  // WE HAVE TO ONLY RETURN THE MOST RECENT ENTRY
  return result[0].editor;
};

initdb();
