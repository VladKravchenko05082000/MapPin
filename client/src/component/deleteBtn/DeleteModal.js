import React from 'react';
import style from './modalDelete.module.css';
import axios from 'axios';

const DeleteModal = ({ setIsOpen, pinId }) => {
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`/pins/delete/`, { data: { _id: pinId } })
        .then(setIsOpen(false))
        .then(document.location.reload());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <div className={style.modalCloseBtn}>
          <button onClick={() => setIsOpen(false)}> X </button>
        </div>
        <div className={style.modalTitle}>
          <h2 style={{ fontWeight: '900' }}>Delete Pin</h2>
        </div>
        <div className={style.modalBody}>
          <p>Do you sure, you wan`t delete pin?</p>
        </div>
        <div className={style.modalFooter}>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleDeleteSubmit}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
