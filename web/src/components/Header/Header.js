import './styles.css'
import logo from '../../assets/logo.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeItem } from '../../utils/storage'
import FormEditProfile from '../FormEditProfile/FormEditProfile';

function Header({ imgProfile, userName, logoutIcon }) {

  const [openFormEditProfile, setOpenFormEditProfile] = useState(false)
  const navigate = useNavigate()

  function handleClickLogout() {
    removeItem('userId')
    removeItem('token')
    navigate('/login')
  }
  return (
    <header>
      <img src={logo} alt='Logo' />
      {
        imgProfile && userName && logoutIcon &&
        <div className='header-links'>
          <img
            src={imgProfile}
            alt='Profile icon'
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenFormEditProfile(true)}
          />
          <span className='user-name'>{userName}</span>
          <img
            src={logoutIcon}
            alt='Logout icon'
            className='btn-logout'
            onClick={() => handleClickLogout()}
          />
        </div>
      }
      {
        openFormEditProfile &&
        <FormEditProfile setOpenFormEditProfile={setOpenFormEditProfile} />
      }
    </header>
  )
}

export default Header;