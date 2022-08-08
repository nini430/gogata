import React, {useState} from 'react';
import logo from '../img/logo.png';
import avatar from '../img/avatar.png';
import {MdShoppingBasket, MdAdd, MdLogout} from 'react-icons/md';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {app} from '../firebase.config';
import {useStateValue} from '../context/stateProvider';
import {actionTypes} from '../context/reducer';

const Header = () => {
  const [{user}, dispatch] = useStateValue();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: {accessToken, providerData},
      } = await signInWithPopup(auth, provider);
      dispatch({type: actionTypes.SET_USER, user: providerData[0]});
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout=()=>{
    setIsMenu(false);
      localStorage.clear();
      dispatch({type:actionTypes.SET_USER,user:null})
  }
  return (
    <header className='w-screen p-3 px-4 fixed z-50 md:p-6 md:px-16 bg-primary'>
      {/* desktip and tablet */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to='/' className='flex items-center gap-3'>
          <img className='w-8 object-cover' src={logo} alt='name' />
          <p className='font-bold text-headingColor text-xl'>City</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul
           initial={{opacity:0,x:200}}
           animate={{opacity:1,x:0}}
           exit={{opacity:0,x:200}}
            className='flex items-center gap-8'>
            <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>
              Home
            </li>
            <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>
              Menu
            </li>
            <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>
              About us
            </li>
            <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>
              Service
            </li>
          </motion.ul>
          <div className='relative flex items-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>
          <div className='relative'>
            <motion.img
              whileTap={{scale: 0.6}}
              onClick={login}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              src={user ? user.photoURL : avatar}
              alt='userprofile'
            />
            {isMenu && (
              <motion.div
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.6}}
                className='w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col items-center right-0 top-12 gap-3'>
                {user && user.email === 'ninigogatishvili1@gmail.com' && (
                  <Link onClick={()=>setIsMenu(false)} to='/createItem'>
                    <p className='text-textColor text-base  flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out'>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p className='text-textColor text-base  flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out' onClick={logout}>
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='flex md:hidden w-full h-full items-center justify-between'>
      <div className='relative flex items-center'>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>
      <Link to='/' className='flex items-center gap-3'>
          <img className='w-8 object-cover' src={logo} alt='name' />
          <p className='font-bold text-headingColor text-xl'>City</p>
        </Link>
        
        <div className='relative'>
            <motion.img
              whileTap={{scale: 0.6}}
              onClick={login}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              src={user ? user.photoURL : avatar}
              alt='userprofile'
            />
            {isMenu && (
              <motion.div
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.6}}
                className='w-40 bg-gray-50 shadow-xl rounded-lg absolute flex flex-col  right-0 top-12'>
                {user && user.email === 'ninigogatishvili1@gmail.com' && (
                  <Link onClick={()=>setIsMenu(false)} to='/createItem'>
                    <p className='text-textColor text-base  flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out'>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <ul
            className='flex   flex-col'>
            <li onClick={()=>setIsMenu(false)} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'>
              Home
            </li>
            <li onClick={()=>setIsMenu(false)} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'>
              Menu
            </li>
            <li onClick={()=>setIsMenu(false)} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'>
              About us
            </li>
            <li onClick={()=>setIsMenu(false)} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'>
              Service
            </li>
          </ul>
                <p className='text-textColor bg-slate-100 text-base  flex px-4 py-2 items-center justify-center gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out m-2 p-2 rounded-md shadow-md' onClick={logout}>
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
