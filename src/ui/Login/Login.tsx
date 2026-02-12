import "./Login.scss"
import LoginSign from "./login-sign.svg?react"
import { LoginForm } from "./LoginForm/LoginForm";
import { authGuard } from '@/ui/authGuard';
import { HrLine } from '@/lib/ui-kit/HrLine/HrLine';

export const LoginBase = () => {
  return (
    <div className="auth-backdrop">
      <div className="auth-card">
        <div className="auth-card__inner">
          <div className="auth-card__header">
            <div className="auth-circle">
              <div className="auth-circle__inner">
                <LoginSign />
              </div>
            </div>
          </div>
          <h1 className="welcome-header">Добро пожаловать!</h1>
          <div className="auth__call-to-action">Пожалуйста, авторизуйтесь</div>
          <LoginForm />
          <HrLine>или</HrLine>          
          <div className="auth__additional-actions">Нет аккаунта? <a href="#">Создать</a></div>
        </div>
      </div>
    </div>
  );
}

export const Login = authGuard(LoginBase);
