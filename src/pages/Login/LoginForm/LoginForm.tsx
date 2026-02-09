import { useForm   } from 'react-hook-form'
import { useState } from "react"

import "./LoginForm.scss"
import Cross from "./cross.svg?react"
import UserIcon from "./user-icon.svg?react"
import LockIcon from "./lock-icon.svg?react"
import EyeInvisibleIcon from "./eye-invisible-icon.svg?react"
import EyeVisibleIcon from "./eye-visible-icon.svg?react"

export const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {   
    setValue,
    register,
    watch,
    handleSubmit,    
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      rememberMe: false,
    },
  });

  const userNameValue = watch("userName");


  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="login-form">
      <label className="form-label" htmlFor="user-name">Логин</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon">
          <UserIcon />
        </div>
        <input {...register("userName")} id="user-name" />
        {!!userNameValue && <button className="enhanced-input__action" onClick={() => setValue("userName", "")}>
          <Cross />
        </button>}
      </div>
      {errors.userName && <div>Username error</div>}
      <label className="form-label" htmlFor="password">Пароль</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon">
          <LockIcon />
        </div>
        <input type={passwordVisible ? "text" : "password"} {...register("password")}  id="password" />
        <button className="enhanced-input__action" onClick={() => setPasswordVisible((visible) => !visible)}>
          {passwordVisible ? <EyeVisibleIcon /> : <EyeInvisibleIcon />}
        </button>
      </div>
      {errors.password && <div>Password error</div>}
      <label className="form-label form-checkbox-label">
        <input className="form-checkbox-label__input" type="checkbox" {...register("rememberMe")} /><span className="form-checkbox-label__hint">Запомнить меня</span>
      </label>
      <button class="primary-button primary-button_full-width form-submit" type="submit">Войти</button>
    </form>
  );
}
