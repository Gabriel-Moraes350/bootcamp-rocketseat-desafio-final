import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import { Container, ModalForm } from './styles';
import Modal from '~/components/Modal';

export default function HelpOrders() {
  const [orders, setOrders] = useState({ items: [], totalPages: 1 });
  const [answerOrder, setAnswerOrder] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = order => {
    setAnswerOrder(order);
    setOpen(true);
  };

  const schema = Yup.object().shape({
    answer: Yup.string().required('Necessário informar uma resposta!'),
  });

  async function getHelpOrders(page) {
    try {
      const { data } = await api.get(`/help-orders?page=${page}`);

      const result = data.rows.map(register => {
        register.studentName = register.student.name;
        return register;
      });

      setOrders({ items: result, totalPages: data.totalPages });
    } catch (e) {
      toast.error('Não foi possível buscar pedidos de ajuda');
    }
  }

  useEffect(() => {
    getHelpOrders(1);
  }, []);

  const handleSubmit = async ({ answer }, { resetForm }) => {
    try {
      await api.post(`/help-orders/${answerOrder.id}`, {
        answer,
      });
      
      resetForm();
      setOpen(false);

      getHelpOrders(1);
      toast.success('Pergunta respondida com sucesso!');
    } catch (e) {
      if (e.response) {
        const { data } = e.response;
        toast.error(data.error);
        return;
      }
      toast.error('Não foi possível responder o aluno');
    }
  };

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
              {orders.items &&
                orders.items.map(order => {
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
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Próxima"
            pageCount={orders.totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={({ selected }) => getHelpOrders(selected + 1)}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
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
