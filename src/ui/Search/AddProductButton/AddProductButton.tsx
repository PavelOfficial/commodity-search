import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import * as yup from "yup"

import "./AddProductButton.scss"

import Cross from "../../Login/LoginForm/cross.svg?react"

import PlusCircle from "./plus-circle.svg?react"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  title: yup.string().required("Введите наименование"),
  price: yup.string().required("Введите цену"),
  brand: yup.string().required("Введите вендора"),
  sku: yup.string().required("Введите артикул"),
}).required();

export const AddProductButton = () => {
    const {   
        register,
        handleSubmit,    
        formState: { errors },
        reset,
      } = useForm({
        defaultValues: {
          title: "",
          price: "",
          brand: "",
          sku: "",
        },
        resolver: yupResolver(schema)
      });

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        reset();
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
                    
                    <form onSubmit={handleSubmit((state) => { console.log(state); closeModal(); })}>
                        <div>
                            <label className="form-label" htmlFor="title-input">
                                Наименование
                            </label>
                            <input
                                {...register("title")}
                                className="form-input"
                                type="text" 
                                id="title-input"
                            />
                            {errors.title && <div className="form-error-message">{errors.title.message}</div>}
                        </div>
                        
                        <label>
                            <label className="form-label" htmlFor="price-input">
                                Цена
                            </label>
                            <input 
                                {...register("price")}
                                className="form-input"
                                type="number"
                                id="price-input"
                            />
                            {errors.price && <div className="form-error-message">{errors.price.message}</div>}
                        </label>
                        <label>
                            <label className="form-label" htmlFor="brand-input">
                                Вендор
                            </label>
                            <input 
                                {...register("brand")}
                                className="form-input"
                                type="text"
                                id="brand-input" 
                            />
                            {errors.brand && <div className="form-error-message">{errors.brand.message}</div>}
                        </label>
                        <label>
                            <label className="form-label" htmlFor="sku-input">
                                Артикул
                            </label>
                            <input 
                                {...register("sku")}
                                className="form-input"
                                type="text"
                                id="sku-input" 
                            />
                            {errors.sku && <div className="form-error-message">{errors.sku.message}</div>}
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