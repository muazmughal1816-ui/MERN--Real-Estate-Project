import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='border-slate-200 shadow-md mb-1'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
            <span className='text-slate-500'>Mughal'z</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
            <input className='bg-slate-100 focus:outline-none p-2 rounded-lg w-24 sm:w-64' type="text" placeholder='Search...'/>
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/home'>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            ) : (
                <li className=' text-slate-700 hover:underline cursor-pointer'>Sign in</li>
            )}
                
            </Link>
        </ul>
        </div>
    </header>
  )
}

export default Header