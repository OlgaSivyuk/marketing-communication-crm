import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
    return (
      <header className={'header'}>
        <Link className='header__logo' to='/'>
          <img alt='Логотип в форме бублика' className='header__logo-img' src={logo} />
        </Link>
        <ul className='header__navigation'>
        <li className='header__navigation-link'>
          <NavLink to='/audience' className='header__button-link'>
            <span className=' header__img header__img-audience'></span>
            Audience
          </NavLink>
          </li>
          <li className='header__navigation-link'>
          <NavLink to='/calender' className='header__button-link'>
            <span className=' header__img header__img-sends'></span>
            Campaign
          </NavLink>
          </li>
        </ul>
      </header>
    );
}

  export default Header;