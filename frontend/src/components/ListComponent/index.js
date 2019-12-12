import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '~/services/history';
import Button from '../ButtonComponent';

import { Container, Search } from './styles';

export default function ListComponent({
  title,
  columns,
  fields,
  data,
  urlEdit,
  onDelete,
  width,
  search,
  searchChange,
}) {
  const insertClick = () => {
    history.push(urlEdit);
  };

  return (
    <Container width={width}>
      <div>
        <h1>{title}</h1>
        <div>
          <Button title="Cadastrar" onClick={insertClick} />
          {search && (
            <Search placeholder="Buscar Aluno" onChange={searchChange} />
          )}
        </div>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              {columns.map(item => (
                <th key={item}>{item}</th>
              ))}
              <th width="50" />
              <th width="50" />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, key) => {
                return (
                  <tr key={key}>
                    {fields.map(field => (
                      <td key={field}>{item[field]}</td>
                    ))}
                    <td>
                      <Link to={`${urlEdit}/${item.id}`}>editar</Link>
                    </td>
                    <td>
                      <button type="button" onClick={() => onDelete(item.id)}>
                        apagar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </Container>
  );
}

ListComponent.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  urlEdit: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  width: PropTypes.number,
  search: PropTypes.bool,
  searchChange: PropTypes.func,
};

ListComponent.defaultProps = {
  search: false,
  searchChange: () => {},
  width: 1100,
};
