import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from '../features/auth/authThunks';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status === 'success') {
      navigate('/login', { replace: true });
    }
  }, [status, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      registerUser({
        name,
        email,
        password,
      }),
    );
  };

  return (
    <section style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Register</h2>

      {status === 'loading' && <Loading />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

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
            minLength={6}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <Button type="submit" disabled={status === 'loading'}>
          Register
        </Button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Sudah punya akun?{' '}
        <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
