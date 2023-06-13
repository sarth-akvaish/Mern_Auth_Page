import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { registerValidation } from '../helper/Validate';
import styles from '../styles/username.module.css'
import convertToBase64 from '../helper/Convert';
import { registerUser } from '../helper/helper';

export default function Register() {


  const navigate = useNavigate();
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ""
    },
    enableReinitialize: true,
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully</b>,
        error: <b>Couldn't register</b>
      });
      registerPromise.then(function () { navigate('/') });
    }
  })

  /* Formik doesn't support file upload so we need to create this handler */

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }



  // function previewFile() {
  //   const preview = document.querySelector("img");
  //   const file = document.querySelector("input[type=file]").files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener(
  //     "load",
  //     () => {
  //       // convert image file to base64 string
  //       preview.src = reader.result;
  //     },
  //     false
  //   );

  //   if (file) {
  //     const base64 = reader.readAsDataURL(file);
  //     setFile(base64);
  //   }
  // }


  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Register!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
            <div className="textbox flex flex-col items-center gap-3">
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="email*" placeholder='Email' />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="username*" placeholder='Username' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <button type='submit' className={styles.btn}>Register</button>
            </div>
            <div className="text-center py-1">
              <span className='text-gray-500'>Already User?<Link className='text-red-500' to='/'>{" "}Login Now </Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
} 
