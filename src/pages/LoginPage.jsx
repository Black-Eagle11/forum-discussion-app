import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { loginUser, fetchOwnProfile } from '../features/auth/authThunks';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      loginUser({ email, password }),
    );

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(fetchOwnProfile());
    }
  };

  return (
    <section style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>

      {status === 'loading' && <Loading />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <Button type="submit" disabled={status === 'loading'}>
          Login
        </Button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Belum punya akun?{' '}
        <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default LoginPage;
