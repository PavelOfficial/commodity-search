import { useState } from 'react';
import { Modal } from 'react-responsive-modal';

import "./AddProductButton.scss"

import Cross from "../../Login/LoginForm/cross.svg?react"

import PlusCircle from "./plus-circle.svg?react"

export const AddProductButton = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <button type="button"
                    onClick={openModal}
                    className="primary-button primary-button_simple">
                <div className="button-icon"><PlusCircle /></div>Добавить
            </button>
            <Modal
                open={modalIsOpen}
                onClose={closeModal}
            >
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type="button" className='icon-button' onClick={closeModal}>
                            <Cross />
                        </button>
                    </div>
                    <h2>Добавить товар</h2>
                    
                    <form onSubmit={() => {}}>
                        <div>
                            <label className="form-label" htmlFor="title-input">
                                Наименование
                            </label>
                            <input
                                className="form-input"
                                type="text" 
                                name="title" 
                                id="title-input"
                            />
                        </div>
                        
                        <label>
                            <label className="form-label" htmlFor="price-input">
                                Цена
                            </label>
                            <input 
                                className="form-input"
                                type="number" 
                                name="price" 
                                id="price-input"
                            />
                        </label>
                        <label>
                            <label className="form-label" htmlFor="brand-input">
                                Вендор
                            </label>
                            <input 
                                className="form-input"
                                type="text" 
                                name="brand"
                                id="brand-input" 
                            />
                        </label>
                        <label>
                            <label className="form-label" htmlFor="sku-input">
                                Артикул
                            </label>
                            <input 
                                className="form-input"
                                type="text" 
                                name="sku" 
                                id="sku-input" 
                            />
                        </label>
                        <div className="form-controls">
                            <button className="primary-button primary-button_simple" type="submit">
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}