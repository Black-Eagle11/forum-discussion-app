import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../features/auth/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
        Forum Diskusi
      </Link>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <NavLink to="/" end>
          Threads
        </NavLink>

        <NavLink to="/leaderboard">
          Leaderboard
        </NavLink>

        {user ? (
          <>
            <NavLink to="/new">
              Buat Thread
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#dc2626',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <NavLink to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
