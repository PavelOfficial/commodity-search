import { useForm, type UseFormRegisterReturn } from "react-hook-form"
import { useCallback, useRef, useState } from "react"
import { useShallow } from 'zustand/shallow'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import "./LoginForm.scss"
import Cross from "./cross.svg?react"
import UserIcon from "./user-icon.svg?react"
import LockIcon from "./lock-icon.svg?react"
import EyeInvisibleIcon from "./eye-invisible-icon.svg?react"
import EyeVisibleIcon from "./eye-visible-icon.svg?react"
import { authUser, useAuthStore } from '../../../model/auth'

const useInputRef = (registerUserNameProps: UseFormRegisterReturn<string>) => {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const registerUserNamePropsRefCallback = registerUserNameProps.ref;
  const setUserNameCallback = useCallback((node: HTMLInputElement) => {
    userInputRef.current = node;

    registerUserNamePropsRefCallback(node);
  }, []);

  registerUserNameProps.ref = setUserNameCallback;

  return userInputRef;
};

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

  const registerUserNameProps = register("userName");
  const userNameInputRef = useInputRef(registerUserNameProps);

  const registerPasswordProps = register("password");
  const userPasswordRef = useInputRef(registerPasswordProps);

  return (
    <form onSubmit={handleSubmit(async (data) => {
      await authUser(data);
      // console.log(data) 
    })} className="login-form">
      <label className="form-label" htmlFor="user-name">Логин</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon" onClick={() => {
          if (userPasswordRef.current) {
            userPasswordRef.current.focus();
          }
        }}>
          <UserIcon />
        </div>
        <div className="enhanced-input__controls">
          <input {...registerUserNameProps} id="user-name" />
          {!!userNameValue && <button type="button" className="enhanced-input__action"
            onClick={() => {
              setValue("userName", "");
              
              if (userNameInputRef.current) {
                userNameInputRef.current.focus();
              }           
            }}>
            <Cross />
          </button>}
        </div>
      </div>
      {errors.userName && <div className="form-error-message">{errors.userName.message}</div>}
      <label className="form-label" htmlFor="password">Пароль</label>
      <div className="enhanced-input">
        <div className="enhanced-input__icon" onClick={() => {
          if (userPasswordRef.current) {
            userPasswordRef.current.focus();
          }
        }}>
          <LockIcon />
        </div>
        <div className="enhanced-input__controls">
          <input type={passwordVisible ? "text" : "password"} {...registerPasswordProps} id="password" />
          <button type="button" className="enhanced-input__action" onClick={() => setPasswordVisible((visible) => !visible)}>
            {passwordVisible ? <EyeVisibleIcon /> : <EyeInvisibleIcon />}
          </button>
        </div>
      </div>
      {errors.password && <div className="form-error-message">{errors.password.message}</div>}      
      <label className="form-label form-checkbox-label">
        <input className="form-checkbox-label__input" type="checkbox" {...register("rememberMe")} /><span className="form-checkbox-label__hint">Запомнить меня</span>
      </label>
      {authError && <div className="form-error-message">Не удалось авторизоваться. {authError}.</div>}
      <button className="primary-button primary-button_full-width form-submit" type="submit">Войти</button>
    </form>
  );
}
