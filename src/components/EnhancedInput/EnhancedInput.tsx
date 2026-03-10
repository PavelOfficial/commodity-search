import type { UseFormRegisterReturn } from 'react-hook-form';
import {  useRef } from 'react';

import type { EnhancedInputProps } from './EnhancedInput.props';
import "./EnhancedInput.scss"

const useInputRef = (registerUserNameProps: UseFormRegisterReturn<string>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextRegisterUserNameProps = { ...registerUserNameProps };
  const registerUserNamePropsRefCallback = nextRegisterUserNameProps.ref;
  const setUserNameCallback = (node: HTMLInputElement) => {
    inputRef.current = node;

    registerUserNamePropsRefCallback(node);
  };

  nextRegisterUserNameProps.ref = setUserNameCallback;

  return  { inputRef, nextRegisterUserNameProps };
};

export const EnhancedInput = (props: EnhancedInputProps) => {
    const  { inputRef, nextRegisterUserNameProps } = useInputRef(props.inputProps)

    return (
        <div className="enhanced-input">
            <div className="enhanced-input__icon" onClick={() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}>
                {props.inputIcon}
            </div>
            <div className="enhanced-input__controls">
            <input type={props.inputType || "text"} {...nextRegisterUserNameProps} id="user-name" />
            {props.showControlButton && <button type="button" className="enhanced-input__action"
                onClick={() => {
                    props.onControlButtonClick();
                
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }           
                }}>
                    {props.controlIcon}
                </button>
            }
            </div>
      </div>
    );
}