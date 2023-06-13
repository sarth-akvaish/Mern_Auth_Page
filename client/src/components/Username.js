import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/Validate';
import styles from '../styles/username.module.css'
import { useAuthStore } from '../store/store';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername)


  // useEffect(() => {
  //   console.log(username);
  // });

  const formik = useFormik({
    initialValues: {
      username: ""
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // console.log(values)
      setUsername(values.username);
      navigate('/password');
    }
  })

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} ></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-6">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6 py-4">
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
              <button type='submit' className={styles.btn} style={{ marginTop: "10px" }}>Let's go</button>
            </div>
            <div className="text-center py-1">
              <span className='text-gray-500'>Not a Memeber <Link className='text-red-500' to='/register'>Register Now</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
