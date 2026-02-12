import { useForm } from "react-hook-form"
import {  useState } from "react"
import { useShallow } from 'zustand/shallow'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import "./LoginForm.scss"
import Cross from "./cross.svg?react"
import UserIcon from "./user-icon.svg?react"
import LockIcon from "./lock-icon.svg?react"
import EyeInvisibleIcon from "./eye-invisible-icon.svg?react"
import EyeVisibleIcon from "./eye-visible-icon.svg?react"
import { authUser, useAuthStore } from '@/model/auth'
import { EnhancedInput } from '@/lib/ui-kit/EnhancedInput/EnhancedInput'

// 1. Define the Yup validation schema
const schema = yup.object({
  userName: yup.string().required("Введите имя пользователя").min(3, "Имя пользователя должно быть как минимум 3 символа"),
  password: yup.string().required("Введите пароль").min(4, "Пароль пользователя должен быть как минимум 4 символа"),
  rememberMe: yup.boolean().required(),
}).required();

export const LoginForm = () => {    
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, authError] = useAuthStore(useShallow((state) => [state.rememberMe, state.error]))
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
      rememberMe: rememberMe,
    },
    resolver: yupResolver(schema)
  });

  const userNameValue = watch("userName");

  return (
    <form onSubmit={handleSubmit(async (data) => {
      await authUser(data);
    })} className="login-form">
      <label className="form-label" htmlFor="user-name">Логин</label>
      <EnhancedInput
        inputProps={register("userName")}
        controlIcon={<Cross />} 
        showControlButton={!!userNameValue}
        onControlButtonClick={() => setValue("userName", "")}
        inputIcon={<UserIcon />}
      />
      {errors.userName && <div className="form-error-message">{errors.userName.message}</div>}
      <label className="form-label" htmlFor="password">Пароль</label>
      <EnhancedInput
        inputProps={register("password")}
        controlIcon={passwordVisible ? <EyeVisibleIcon /> : <EyeInvisibleIcon />} 
        showControlButton={true}
        onControlButtonClick={() => setPasswordVisible((visible) => !visible)}
        inputIcon={<LockIcon />}
        inputType={passwordVisible ? "text" : "password"}
      />
      {errors.password && <div className="form-error-message">{errors.password.message}</div>}      
      <label className="form-label form-checkbox-label">
        <input className="form-checkbox-label__input" type="checkbox" {...register("rememberMe")} /><span className="form-checkbox-label__hint">Запомнить меня</span>
      </label>
      {authError && <div className="form-error-message">Не удалось авторизоваться. {authError}.</div>}
      <button className="primary-button primary-button_full-width form-submit" type="submit">Войти</button>
    </form>
  );
}
