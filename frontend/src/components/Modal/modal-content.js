import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';

function ModalContent({ handleClose, children }) {
  ModalContent.handleClickOutside = () => handleClose();
  return <section className="modal-main">{children}</section>;
}

const clickOutsideConfig = {
  handleClickOutside: () => ModalContent.handleClickOutside,
};

export default onClickOutside(ModalContent, clickOutsideConfig);

ModalContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
