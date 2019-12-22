import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import { Container, ModalForm } from './styles';
import Modal from '~/components/Modal';

export default function HelpOrders() {
  const [orders, setOrders] = useState([]);
  const [answerOrder, setAnswerOrder] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = order => {
    setAnswerOrder(order);
    setOpen(true);
  };

  const handleSubmit = async ({ answer }, { resetForm }) => {
    try {
      const { data } = await api.post(`/help-orders/${answerOrder.id}`, {
        answer,
      });
      if (data.error) {
        throw new Error(data.error);
      }
      resetForm();
      setOpen(false);

      //remove answered order
      const newOrders = orders.filter(o => o.id !== answerOrder.id);
      setOrders(newOrders);

      toast.success('Pergunta respondida com sucesso!');
    } catch (e) {
      toast.error('Não foi possível responder o aluno');
    }
  };

  const schema = Yup.object().shape({
    answer: Yup.string().required('Necessário informar uma resposta!'),
  });

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
    <>
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
                        <button type="button" onClick={() => openModal(order)}>
                          responder
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      </Container>
      <Modal show={open} handleClose={handleClose}>
        <ModalForm>
          <Form schema={schema} onSubmit={handleSubmit}>
            <h4>Pergunta do Aluno</h4>
            <p>{answerOrder.question}</p>
            <h4>Sua Resposta</h4>
            <Input multiline name="answer" placeholder="Resposta..." />
            <button type="submit">Responder aluno</button>
          </Form>
        </ModalForm>
      </Modal>
    </>
  );
}
