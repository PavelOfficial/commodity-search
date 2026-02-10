import classnames from "classnames"

import PlusIcon from "./plus-ico.svg?react"
import MoreIcon from "./more-icon.svg?react"

import { Checkbox } from '../../../lib/ui-kit/Checkbox';
import type { Product } from '../../../model/storeTypes';

import "./ProductTableLine.scss"

const renderPrice = (price: number) => {
    const intPrice = Math.floor(price);
    const decimalPrice = `${String(Math.floor((price % 1) * 100))}00`.slice(0, 2);

    return <>{intPrice}<span className="decimals">,{decimalPrice}</span></>
}

const LOW_RAITING_RATIO = 3

const renderRating = (raiting: number) => {
    const isLowRaiting = raiting < LOW_RAITING_RATIO;

    return (
        <>
            {isLowRaiting ? 
                <span className="low-raiting">{raiting}</span> : 
                raiting
            }
            /5
        </>
    );
}


interface Props {
    product: Product
    selected: boolean
    onSelect: (id: number, selected: boolean) => void
}

export const ProductTableLine = ({ product, selected, onSelect }: Props) => {
    const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>  = (event) => {
        const selected = event.target.checked;
        
        onSelect(product.id, selected);
    };

    console.log("product: ", product);

    return (
        <div className={classnames({
            "commodity-table-line commodity-table-line__table-row": true,
            "commodity-table-line__table-row_active": selected,
        })}>
            <div>
                <Checkbox checked={selected} onChange={handleCheckboxChange} />
            </div>
            <div>
                <div className="commodity-figure">
                    <div className={classnames({
                        "commodity-figure__image": true,
                        "commodity-figure__image_with-content": !!product.images.length,
                    })}>
                        {product.images && product.images.length && 
                            <img src={product.images[0]} alt={`${product.title} - ${product.category}`} />
                        }
                    </div>
                    <div className="commodity-figure__caption">
                        <div className="commodity-figure__caption-name">{product.title}</div>
                        <div className="commodity-figure__caption-category">{product.category}</div>
                    </div>
                </div>
            </div>
            <div className="center-text bold-text">{product.brand}</div>
            <div className="center-text">{product.sku}</div>
            <div className="center-text">{renderRating(product.rating)}</div>
            <div className="center-text">{renderPrice(product.price)}</div>
            <div className="center-content">
                <button type="button" className="primary-button primary-button_tiny">
                    <PlusIcon />
                </button>
                <button type="button" className="icon-button button-more">
                    <MoreIcon />
                </button>
            </div>
        </div>
    );
}