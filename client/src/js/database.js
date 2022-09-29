import { openDB } from 'idb';
// version number we're using
const ver = 1;

const initdb = async () =>
  openDB('jate', ver, {
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
  const jateDb = await openDB('jate', ver);
  // create transaction with privileges, initialize object store with it
  const trans = jateDb.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  // pass in the content, await so we can post to log after
  const result = await store.add({ content: content });
  // post result to log
  console.log('Data saved: ', result);
};

// function to GET from db
export const getDb = async () => {
  // create db connection with version #
  const jateDb = await openDB('jate', ver);
  // create transaction with privileges, initialize object store with it
  const trans = jateDb.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  // get all the data, awaiting so we can post to log after
  const result = await store.getAll();
  console.log('Result: ', result);
  return result;
};

initdb();
