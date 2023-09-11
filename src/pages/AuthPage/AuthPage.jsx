import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import ('./AuthPage.css')

export default function AuthPage({ setUser }) {

  const handleLoginSuccess = () => {
  };

  return (
    <main className='auth-page'>
      <div className='image-section'>
        <img src="adrian-curiel-KgYazRO3l8A-unsplash.jpg" alt="" className='auth-image' />
      </div>
      <div className='form-section'>
        <SignUpForm setUser={setUser} />
        <LoginForm setUser={setUser} onLoginSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
}
