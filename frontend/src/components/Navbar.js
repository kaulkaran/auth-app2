import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/login" style={styles.navLink}>Login</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/register" style={styles.navLink}>Register</Link>
                </li>
            </ul>
        </nav>
    );
};

// Basic styles for the navbar
const styles = {
    nav: {
        background: '#333',
        padding: '1rem',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 1rem',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
    }
};

export default Navbar;
