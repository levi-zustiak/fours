import styles from './style.module.css';
import { createSignal } from 'solid-js';
import { Button } from '@components/Button';
import { Link, router } from 'inertia-solid';
import { AnimatedContainer } from '@components/AnimatedContainer';
import { TextField } from '@components/TextField';

export function Page() {
  const [values, setValues] = createSignal({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    router.post('/register', values());
  };

  return (
    <AnimatedContainer>
      <div class={styles.container}>
        <h2 style={{ 'margin-bottom': '2rem' }}>Register</h2>
        <form onSubmit={submit} class={styles.form}>
          <div class={styles.fields}>
            <TextField
              label="Username"
              name="name"
              value={values().name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={values().email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              value={values().password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" style={{ 'margin-top': '2rem' }}>
            Submit
          </Button>
        </form>
        <div style={{ display: 'flex', gap: '4px', 'margin-top': '2rem' }}>
          <p>Already have an account?</p>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </AnimatedContainer>
  );
}
