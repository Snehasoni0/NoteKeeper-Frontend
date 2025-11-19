import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import { FaBook } from 'react-icons/fa';
function Navbar({ setQuery }) {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }


  return (
    <nav className="bg-gray-800 p-4 text-white flex flex-col md:flex-row lg:flex-row justify-between items-center gap-3">
      <div className="text-xl font-bold">
        <Link to='/' className='flex items-center gap-2'>NoteKeeper <FaBook /></Link>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded w-full lg:w-[400px] "
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {
          !user
            ?
            (
              <>
                <Link to='/login' className='bg-blue-500 px-4 py-2 rounded mr-4'>
                  Login
                </Link>
                <Link to='/register' className='bg-green-500 px-4 py-2 rounded mr-4'>
                  Signup
                </Link>
              </>
            )
            :
            <>
              <span className="mr-4">{user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded cursor-pointer active:scale-95">
                Logout
              </button>
            </>
        }
      </div>
    </nav>
  )
}

export default Navbar