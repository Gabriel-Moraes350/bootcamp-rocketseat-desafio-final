import React from 'react';
import PropTypes from 'prop-types';
import ModalContent from './modal-content';

function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <ModalContent handleClose={handleClose}>{children}</ModalContent>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
