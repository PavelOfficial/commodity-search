import type { ReactNode } from 'react'

import "./HrLine.scss"

interface Props {
    children: ReactNode
}

export const HrLine = ({ children }: Props) => {
    return (
        <div className="hr-line">
            <div className="hr-line__before-hr"></div>
            <div className="hr-line__text">{children}</div>
            <div className="hr-line__after-hr"></div>
        </div>
    )
}