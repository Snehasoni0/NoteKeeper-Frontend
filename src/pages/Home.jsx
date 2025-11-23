import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import axiosInstance from '../../lib/axios';

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [currentNote, setCurrentNode] = useState(null);
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      setNotes([]);
      setFilteredNotes([]);
    } else {
      fetchNotes();
    }
  }, [user])

  const fetchNotes = async () => {
    try {
      const { data } = await axiosInstance.get('/api/note', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query, notes])

  const onEdit = (note) => {
    setCurrentNode(note)
    setModelOpen(true);
  }

  const addNote = async (title, description) => {
    try {
      const response = await axiosInstance.post('/api/note/add', { title, description }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (response.data.success) {
        fetchNotes();
        navigate('/');
        setModelOpen(false);
        toast.success("Added Successfully!");
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editNote = async (id, title, description) => {
    try {
      const response = await axiosInstance.put(`/api/note/${id}`, { title, description }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (response.data.success) {
        fetchNotes();
        setModelOpen(false);
        toast.success("Edited Successfully!");
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/note/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (response.data.success) {
        fetchNotes();
        toast.success("Deleted!");
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery} setCurrentNode={setCurrentNode} />

      <div className='grid grid-cols-1 md:grid-cols-3 px-8 pt-5 gap-5'>
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <div>
            <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
          </div>
        )) : <h1 className='w-full h-[80vh] flex justify-center items-center'>No Notes Found....!</h1>
        }
      </div>

      <button onClick={() => {
        setModelOpen(true);
        setCurrentNode(null);
      }
      } className='fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-3 rounded-full cursor-pointer text-2xl'>
        +
      </button>
      {
        isModelOpen && <NoteModel closeModel={() => setModelOpen(false)} addNote={addNote} currentNote={currentNote} editNote={editNote} />
      }
    </div>
  )
}

export default Home