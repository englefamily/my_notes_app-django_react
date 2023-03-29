import React, {useState, useEffect} from 'react'
// import notes from '../assets/data' //Not needed as moving to use\state()
import { useParams, Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"

// Won't work with V6 of "react-router-dom"
// const NotePage = ({ match }) => {
//   let noteId = match.params.id

//   let note = notes.find(note => note.id === Number(noteId))
//   console.log('noteId:', noteId)
//   return (
//     <div>
//         <p>{note.body}</p>
//     </div>
//   )
// }


const NotePage = () => {
  let noteId = useParams().id;
  let navigate = useNavigate(); // use navigate hook instead of history
  // const {id} = useParams();
  // const note = notes.find(note => note.id===Number(id)) // Not needed as moving to use\state()
  let [note, setNote] = useState({}) // If null not working set to {}

  useEffect(() => {
    getNote()
  }, [noteId])

  let getNote = async () => {
    if (noteId === 'new') return
    let response = await fetch(`/api/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

//   let createNote = async () => {
//     await fetch(`/api/notes/create/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(note)
//     })
// }

  let createNote = async () => {
    await fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
}

// let updateNote = async () => {
//     await fetch(`/api/notes/${noteId}/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ ...note, 'updated':new Date()})
//     })
// }

let updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
}

// let deleteNote = async () => {
//   await fetch(`/api/notes/${noteId}/delete`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(note)
//     })      
//     navigate('/'); // navigate back to root page
// }

let deleteNote = async () => {
  await fetch(`/api/notes/${noteId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(note)
    })      
    navigate('/'); // navigate back to root page
}

let handleSubmit = () => {

  if(noteId !== 'new' && !note.body){
    deleteNote()
  } else if (noteId !== 'new'){
      updateNote()
  } else if (noteId === 'new' && note !== null){
      createNote()
  }
  
  navigate('/'); // navigate back to root page
}

return (
  <div className='note'>
    <div className='note-header'>
      <h3>
        <Link to="/" >
          <ArrowLeft onClick={handleSubmit} />
        </Link>
      </h3>
      {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
      ): (
        <button onClick={handleSubmit}>Done</button>
      )} 
      
    </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>

      </textarea>
  </div>
)
}

export default NotePage
