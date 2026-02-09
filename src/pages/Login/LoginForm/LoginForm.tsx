import "./LoginForm.scss"
import Cross from "./cross.svg?react"
import UserIcon from "./user-icon.svg?react"
import LockIcon from "./lock-icon.svg?react"
import EyeInvisibleIcon from "./eye-invisible-icon.svg?react"
import EyeVisibleIcon from "./eye-visible-icon.svg?react"

export const LoginForm = () => {
  return (
    <form className="login-form">
      <label className="form-label" htmlFor="user-name">Логин</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon">
          <UserIcon />
        </div>
        <input name="user" id="user-name" />
        <button className="enhanced-input__action">
          <Cross />
        </button>
      </div>
      <label className="form-label" htmlFor="password">Пароль</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon">
          <LockIcon />
        </div>
        <input type="password" name="password" id="password" />
        <button className="enhanced-input__action">
          <EyeVisibleIcon />
          <EyeInvisibleIcon />
        </button>
      </div>
      <label className="form-label form-checkbox-label">
        <input className="form-checkbox-label__input" type="checkbox" name="remember-me" /><span className="form-checkbox-label__hint">Запомнить меня</span>
      </label>
      <button class="primary-button primary-button_full-width form-submit" type="submit">Войти</button>
    </form>
  );
}
