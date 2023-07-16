import {Link, NavLink} from 'react-router-dom';
import './header.scss';


const Header = () => {
    return (
                <header className='app__header'>
                    <h2 className='app__title'>
                        <Link to="/">Hero admin panel
                        </Link></h2>
                        <nav className="signin">
                            <ul className='app__menu'>
                                <li><NavLink to="/signin">
                                    <button className='app__menu button'> Signin </button>
                                </NavLink></li>
                            </ul>
                        </nav>
                </header>
    )
}

export default Header;