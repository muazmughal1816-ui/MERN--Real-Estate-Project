import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form className='flex flex-col gap-4'>
      <input className='border p-3 rounded-lg'  type="text" placeholder='username' id="username"/>

      <input className='border p-3 rounded-lg'  type="email" placeholder='email' id="email"/>

      <input className='border p-3 rounded-lg'  type="password" placeholder='password' id="password"/>
      <button className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an Account?</p>
      <Link to={"/sign-in"}>
      <span className='text-red-500'>Sign in</span>
      </Link>
    </div>
   </div>
  )
}

export default SignUp