import type { CheckboxProps } from './Checkbox.props';
import "./Checkbox.scss"

export const Checkbox = (props: CheckboxProps) => {
    return (
        <div className="checkbox-container">            
            <input type="checkbox" {...props} />
            <div className="checkmark"></div>
        </div>
    );
}