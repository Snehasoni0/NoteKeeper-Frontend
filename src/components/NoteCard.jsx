import { FaEdit, FaTrash } from 'react-icons/fa'

function NoteCard({ note, onEdit, deleteNote }) {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-bold'>{note.title}</h2>
      <p>{note.description}</p>
      <div className='flex justify-end mt-2'>
        <button className='text-blue-500 mr-2 cursor-pointer' onClick={() => onEdit(note)}>
          <FaEdit />
        </button>
        <button onClick={()=>deleteNote(note._id)} className='text-red-500 cursor-pointer'>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default NoteCard