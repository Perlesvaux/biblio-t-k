import {useState, useEffect } from 'react'

export function useLocalStorage(key, initialState){
  const [value, setValue] = useState(()=>{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialState;
  })

  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))

  },[key, value])
  
  return [value, setValue]

}



//const openDB = (dbName, storeName, version = 1) => {
//  return new Promise((resolve, reject) => {
//    const request = indexedDB.open(dbName, version);
//
//    request.onupgradeneeded = (event) => {
//      const db = event.target.result;
//      if (!db.objectStoreNames.contains(storeName)) {
//        db.createObjectStore(storeName, { keyPath: 'id' });
//      }
//    };
//
//    request.onsuccess = (event) => resolve(event.target.result);
//    request.onerror = (event) => reject(event.target.error);
//  });
//};
const openDB = (dbName, storeName, version=1) =>{
  return new Promise((resolve, reject)=>{
    // opens the database with the given dbName & version (Defaults to 1)
    // if the database doesn't exist, creates a new one 
    // if version number is higher than current one, onupgradeneeded is triggered
    const request = indexedDB.open(dbName, version);

    // onupgradeneeded is fired when database is first created or when version changes.
    // inside this event, you can modify object stores
    // here we check if object store storeName already exists.
    // if not, we create it: db.createObjectStore(storeName, {keyPath: 'id'})
    // keyPath:'id' means each record in the store will have a unique auto-incremented id field
    request.onupgradeneeded = (event) =>{
      const db = event.target.result
      if (!db.objectStoreNames.contains(storeName)){
        db.createObjectStore(storeName, {keyPath:'id'})
      }
    };

    // onsuccess is fired when database is successfully opened.
    // the resolve function is called with the database object event.target.result
    request.onsuccess = (event) => resolve(event.target.result)

    // mutatis mutandis: onerror
    request.onerror = (event) => reject(event.target.error)
  })
}


//
//const getFromDB = async (dbName, storeName, id) => {
//  const db = await openDB(dbName, storeName);
//  return new Promise((resolve, reject) => {
//    const transaction = db.transaction(storeName, 'readonly');
//    const store = transaction.objectStore(storeName);
//    const request = store.get(id);
//
//    request.onsuccess = () => resolve(request.result);
//    request.onerror = () => reject(request.error);
//  });
//};

export const getFromDB = async (dbName, storeName, id) =>{
  // opens database and ensures the object store exists
  const db = await openDB(dbName, storeName);
  
  return new Promise((resolve, reject)=>{
    // creates a 'read-only' transaction for the specified object store 
    const transaction = db.transaction(storeName, 'readonly')
    // accesses the object store within the transaction
    const store = transaction.objectStore(storeName)
    // retrieves the record with the specified id from the object store
    const request = store.get(id)

    // if successfully retrieved
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)


  });
}


//
//const saveToDB = async (dbName, storeName, data) => {
//  const db = await openDB(dbName, storeName);
//  return new Promise((resolve, reject) => {
//    const transaction = db.transaction(storeName, 'readwrite');
//    const store = transaction.objectStore(storeName);
//    const request = store.put(data);
//
//    request.onsuccess = () => resolve();
//    request.onerror = () => reject(request.error);
//  });
//};

export const saveToDB = async (dbName, storeName, data) => {
  // opens database. Ensures the object store exists
  const db = await openDB(dbName, storeName);
  return new Promise((resolve, reject)=>{
    // Transaction allows both reading and writing
    const transaction = db.transaction(storeName, 'readwrite')
    // Accesses object store within transaction
    const store = transaction.objectStore(storeName)
    // Saves the data object to the object store.
    // If a record with the same id already exists, it will be updated. Otherwise, a new record will be created.
    const request = store.put(data)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(data.error)
  })
}
