import React, { useState } from 'react';
import DeleteModal from './DeleteModal';

import style from './style.module.css';

const DeleteBtn = ({ setIsOpen, pin, openModal }) => {
  return (
    <div>
      <p className={style.deleteBtn} onClick={() => setIsOpen(true)}>
        Delete
      </p>
      {openModal ? (
        <DeleteModal setIsOpen={setIsOpen} pinId={pin} />
      ) : null}
    </div>
  );
};

export default DeleteBtn;
