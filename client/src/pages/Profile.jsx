import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { ref as dbRef, set, getDatabase } from 'firebase/database'; 
import { app, db } from '../firebase.js'; 
import { updateUserStart,updateUserSuccess, updateUserFailure } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser , loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  
    
  useEffect(() => {
    if(file)  {
      handleFileUpload(file);
    }
  }, [file]);

     const handleFileUpload = (file) => {
    // 1. Check file size limit (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    }

    setFileUploadError(false);
    setFilePerc(20); // Show "Uploading 20%" status

    // 2. Clear out forbidden chars from the filename to prevent DB path crashes
    const cleanFileName = file.name.replace(/[.#$[\]]/g, '_');
    const dbFileName = new Date().getTime() + '_' + cleanFileName;

    const reader = new FileReader();
    // Start reading the raw file data as a Base64 text string
    reader.readAsDataURL(file); 
    
    reader.onload = async () => {
      const base64ImageString = reader.result;
      setFilePerc(100); // Image string compilation successfully done!

      try {
        // 3. FIXED: Save that text string directly into the database using 'dbRef'
        await set(dbRef(db, '/' + dbFileName), {
          avatar: base64ImageString,
        });

        // Update local state instantly so the image flips on the screen
        setFormData({ ...formData, avatar: base64ImageString });
        console.log("Image uploaded successfully!");
      } catch (error) {
        setFileUploadError(true);
        console.error("Database tracking block error:", error);
      }
    };
  };


  // 1. Add this function right below your handleFileUpload block
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }

    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit}
      className="flex flex-col gap-4">
         <input onChange={(e)=>setFile(e.target.files[0])}
          type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()}
         className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src={formData.avatar || currentUser.avatar} alt="profile" />
         <p className="text-sm self-center">
          {fileUploadError ? (
          <span className="text-red-700">Error Image upload (image must be less than 2 mb)
          </span>
           ): filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePerc}%`}
            </span>
            ): filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploaded!</span>
             ) : (
              ""
            )}
         </p>
        <input  defaultValue={currentUser.username} onChange={handleChange}  className="border p-3 rounded-lg" type="text" placeholder="username" id="username" />
        <input  defaultValue={currentUser.email} onChange={handleChange}  className="border p-3 rounded-lg" type="email" placeholder="email" id="email" />
        <input  onChange={handleChange}  className="border p-3 rounded-lg" type="password" placeholder="password" id="password" />
        <button disabled= {loading} className="bg-green-400 text-white rounded-lg p-3 cursor-pointer uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}

export default Profile