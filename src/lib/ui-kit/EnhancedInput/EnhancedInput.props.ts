import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface EnhancedInputProps {
    inputProps: UseFormRegisterReturn<string>,

    controlIcon: ReactNode,
    showControlButton: boolean,
    inputIcon: ReactNode,
    inputType?: string

    onControlButtonClick: () => void
}
