import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';

function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  Modal.handleClickOutside = () => console.log('teste');
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Modal.handleClickOutside,
};

export default onClickOutside(Modal, clickOutsideConfig);
