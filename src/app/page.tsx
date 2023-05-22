import styles from './page.module.css';
import LoginForm from './components/LoginForm';
export default function Home() {
  return (
    <div className="main-container">
    <h1>Login Page</h1>
    <LoginForm />
    </div>
  )
}
