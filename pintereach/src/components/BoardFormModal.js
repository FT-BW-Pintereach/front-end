import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

import './BoardFormModal.css'

const BoardFormModal = (props) => {
    const {
      buttonLabel,
      className,
      addCategory
    } = props;
  
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    //state for category (i.e. cat) state in this form
    const [cat, setCat] = useState({name: ''})
  
    const toggle = () => setModal(!modal);

    const changeHandler = e => {
        setCat({...cat, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        addCategory(cat)
        setCat({name: ''})
    }
    console.log('category state!', cat)

  
    return (
        <div className='category-modal'>
            <Button color="danger" onClick={toggle} className='modal-button'>{buttonLabel}New Category</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>New Category...</ModalHeader>
                <form onSubmit={submitHandler}>
                    <ModalBody>
                        <FormGroup>
                        <Label for='category'/>
                        <Input 
                            id='category'
                            type="textarea" 
                            placeholder="example: 'Lambda News'" 
                            rows={1} 
                            name='name'
                            value={cat.name}
                            onChange={changeHandler}
                        />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle} type='submit'>Add</Button>{' '}
                        <Button color="secondary" onClick={toggle} type='submit'>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default BoardFormModal;