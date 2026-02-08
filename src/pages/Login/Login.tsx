import "./Login.scss"
import LoginSign from "./login-sign.svg?react"
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <div class="auth-backdrop">
      <div class="auth-card">
        <div class="auth-card__inner">
          <div class="auth-card__header">
            <div class="auth-circle">
              <div class="auth-circle__inner">
                <LoginSign />
              </div>
            </div>
          </div>
          <h1 class="welcome-header">Добро пожаловать!</h1>
          <div class="auth__call-to-action">Пожалуйста, авторизуйтесь</div>
          <LoginForm />
          <div class="hr-line">
            <div class="hr-line__before-hr"></div>
            <div class="hr-line__text">или</div>
            <div class="hr-line__after-hr"></div>
          </div>
          <div class="additional-actions">Нет аккаунта? <a href="#">Создать</a></div>
        </div>
      </div>
    </div>
  );
}
