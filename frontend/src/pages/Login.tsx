import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../features/auth/authSlice';
import { RootState } from '../app/store';

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s: RootState) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
