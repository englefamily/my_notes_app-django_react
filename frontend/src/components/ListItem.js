import React from 'react'
import { Link } from "react-router-dom";

// Using "Prop"
// const ListItem = (props) => {
//     console.log('Props:', props)
//     return (
//         <div>
//             <h3>{props.note.body}</h3>
//         </div>
//   )
// }

let getDate = (note) => {
    const updatedDate = new Date(note.updated);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return updatedDate.toLocaleString('en-GB', options);
  }

let getTitle = (note) => {
    const title = note.body.split('\n')[0]
    
    if(title.length > 45){
        return title.slice(0, 45)
    }

    return title
}

let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if(content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}

const ListItem = ({note}) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className='notes-list-item'>
            <h3>{getTitle(note)}</h3>
            <p><span>{getDate(note)}</span>{getContent(note)}</p>
            </div>
        </Link>
  )
}

export default ListItem