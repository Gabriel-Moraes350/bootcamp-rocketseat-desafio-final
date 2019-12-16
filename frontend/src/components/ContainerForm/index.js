import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ButtonComponent';
import { Container } from './styles';
import history from '~/services/history';

export default function ContainerForm({ title, onSave, children, ...props }) {
  const backClick = e => {
    e.preventDefault();
    return history.goBack();
  };

  return (
    <Container {...props} onSubmit={onSave}>
      <div>
        <h1>{title}</h1>
        <div>
          <Button
            color="#CCCCCC"
            type="button"
            title="Voltar"
            onClick={backClick}
          />
          <Button title="Salvar" type="submit" />
        </div>
      </div>
      <section>{children}</section>
    </Container>
  );
}

ContainerForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
