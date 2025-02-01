export function renderContents(book, strTemplate){
    return `
      ${
        book.chapters.map((chapter, indx) => (
          `
            <header>
              <h2 id='chapter-${chapter.ch}'> 
                ${( ()=> !isNaN(chapter.ch)||romans(chapter.ch) ? `${chapter.ch}.` : `` )()} 
                ${chapter.title} </h2>
            </header>
            <section style='text-align:justify;'> 
              ${
                //`<a href='#footnote-{number}' id='{number}'>{number}</a>`
                ( ()=> {
                    let text = chapter.content
                    text = text.replace(/^/gm, '<p>')
                    text = text.replace(/$/gm, '</p>')
                    let matches = text.matchAll(new RegExp(book.rgx, 'gm'))
                    if (matches===null) return text
                    for (let each of matches){
                      text = text.replace(each[0], 
                        strTemplate.replaceAll('{number}', `${ chapter.ch }.${ each[1] }`) )
                    }
                    return text
                })()
              }
            </section>
          `
        )).join('')
      }

`
}

export function renderFootnotes(book, strTemplate){
  //`<p popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </p>` 
  //`<p id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </p>`
  return `<section style='text-align:justify;'>
    ${
      (()=>{ 
      return book.chapters.map((chapter)=>(
      `${
        chapter.footnotes.map((footnote)=> ( strTemplate
          .replaceAll('{number}',`${chapter.ch}.${footnote.id}`)
          .replaceAll('{content}', footnote.note
            //.replace(/^/gm, '<p>')
            .replace(/$/gm, '<br>')
          ) ) 
        ).join('')
      }`
      )).join('')

      })()



      }
    </section>
    `
}

export function renderIndex(book){
  return `
  <ul style='text-align:justify;'>
    ${
      (()=>{
        return book.chapters.map((chapter)=>(
`<li> <a href='#chapter-${chapter.ch}'> ${( ()=> !isNaN(chapter.ch)||romans(chapter.ch) ? `<span>${chapter.ch}.</span>` : `` )()} ${ chapter.title }</a></li>`
      )).join('')
      })()
    }
  </ul>
  `

}



export function renderHTML(object){
  return `
<main>
  <nav>
    ${renderIndex(object)}
  </nav>
  <article>
    ${renderContents(object, `<a href='#footnote-{number}' id='{number}'>{number}</a>`)}
  </article>
  <hr>
  <footer>
    ${renderFootnotes(object, `<section id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </section>`)}
  </footer>
</main>
`

}


export function romans(number){
 return new Set([ "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX","XL","XLI","XLII","XLIII","XLIV","XLV","XLVI","XLVII","XLVIII","XLIX","L","LI","LII","LIII","LIV","LV","LVI","LVII","LVIII","LIX","LX","LXI","LXII","LXIII","LXIV","LXV","LXVI","LXVII","LXVIII","LXIX","LXX","LXXI","LXXII","LXXIII","LXXIV","LXXV","LXXVI","LXXVII","LXXVIII","LXXIX","LXXX","LXXXI","LXXXII","LXXXIII","LXXXIV","LXXXV","LXXXVI","LXXXVII","LXXXVIII","LXXXIX","XC","XCI","XCII","XCIII","XCIV","XCV","XCVI","XCVII","XCVIII","XCIX","C" ]).has(number)
}


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


export const fetching =  async (endpoint, setData, setError, setLoading, ) => {
  try {
    const cached = await getFromDB('booksDB', 'books', endpoint)
    if (cached) {
      setData(cached.data)
    } else {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
      const data = await response.json()
      console.log(data)
      setData(data)

      await saveToDB('booksDB', 'books', {id:endpoint, data: data})

    }
  } catch (error) {
    console.error('Error fetching books:', error)
    setError(error)

  } finally {
    setLoading(false)
  }

}

export function useIDB(endpoint, initialState){
  const [state, setState] = useState(initialState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    fetching(endpoint, setState, setError, setLoading)

  }, [endpoint])

  return [state, error, loading]
}
