import classNames from 'classnames';
import ArrowLeft from "./arrow-left.svg?react"
import ArrowRight from "./arrow-right.svg?react"

import "./Pagination.scss"

const MAX_PAGE_BUTTONS = 5;

interface Props {
    total: number, 
    skip: number,
    limit: number,
    onSkipChange: (skip: number) => void
}

export const Pagination = ({ total, skip, limit, onSkipChange }: Props) => {
    const totalPageCount = Math.ceil(total / limit);
    const renderPageButtons = new Array(Math.min(MAX_PAGE_BUTTONS, totalPageCount)).fill(null);
    const paginationLength = renderPageButtons.length;
    const selectedPage = Math.floor(skip / limit) + 1; 
    const firstRenderPage = selectedPage <= Math.ceil(paginationLength/2) ? 1 : 
        (
            selectedPage >= totalPageCount - Math.ceil(paginationLength/2) ? 
                totalPageCount - paginationLength + 1 : 
                selectedPage - Math.ceil(paginationLength/2) + 1
        );

    const handlePrevPage = () => {
        const nextSelectedPage = selectedPage - 1;
        if (nextSelectedPage >= 1) {
            onSkipChange((nextSelectedPage - 1) * limit);
        }
    };

    const handleNextPage = () => {
        const nextSelectedPage = selectedPage + 1;
        if (nextSelectedPage <= totalPageCount) {
            onSkipChange((nextSelectedPage - 1) * limit);
        }
    };

    const handleSelectPage = (pageIndex:number) => {
        onSkipChange((pageIndex - 1) * limit);
    };

    return (
        <>
            <button type="button" 
                    onClick={handlePrevPage}
                    className="icon-button pagination-slide-button pagination-arrow-button">
                <ArrowLeft />
            </button>
            {renderPageButtons.map((_, index) => {
                const pageIndex = firstRenderPage + index;
                const selected = pageIndex === selectedPage;

                return (
                    <button type="button" 
                            onClick={() => handleSelectPage(pageIndex)}
                            className={classNames({
                                "ghost-button pagination-slide-button": true,
                                "pagination-slide-button_selected": selected,
                            })}>
                        {firstRenderPage + index}
                    </button>
                );
            })}
            <button type="button" 
                    onClick={handleNextPage}
                    className="icon-button pagination-slide-button pagination-arrow-button">
                <ArrowRight />
            </button>
        </>
    )
}