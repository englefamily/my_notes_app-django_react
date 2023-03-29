import React, {useState, useEffect} from 'react'
// import notes from '../assets/data' //Not needed as moving to use\state()
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {

  let [notes, setNotes] = useState([])

  useEffect(() =>{
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch('/api/notes/')
    let data = await response.json()
    console.log('DATA:', data)
    setNotes(data)
  }

  return (
    <div className='notes'>
        <div className='notes-header'>
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
        </div>

        <div className='notes-list'>
            {notes.map((note, index) => (
                // <p>{note.body}</p> // import the note body as single block, without iteration
                <ListItem key={index} note={note} />
            ))}
        </div> 
        <AddButton />
    </div>
  )
}

export default NotesListPage