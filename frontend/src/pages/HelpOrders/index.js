import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';

export default function HelpOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getHelpOrders() {
      try {
        const { data } = await api.get(`/help-orders`);

        const result = data.map(register => {
          register.studentName = register.student.name;
          return register;
        });

        setOrders(result);
      } catch (e) {
        toast.error('Não foi possível buscar pedidos de ajuda');
      }
    }
    getHelpOrders();
  }, []);

  return (
    <Container>
      <div>
        <h1>Pedidos de Auxílio</h1>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th width="50" />
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map(order => {
                return (
                  <tr key={order.id}>
                    <td>{order.studentName}</td>
                    <td>
                      <button type="button">responder</button>
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
