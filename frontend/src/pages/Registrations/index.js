import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Registrations() {
  const [registrations, setRegistrarions] = useState({
    items: [],
    totalPages: 1,
  });
  async function getRegistrations(page) {
    try {
      const {
        data: { rows, totalPages },
      } = await api.get(`/registrations?page=${page}`);
      const result = rows.map(register => {
        register = {
          ...register,
          id: register.id,
          active: register.active ? 'SIM' : 'NÃO',
          student: register.student.name,
          plan: register.plan.title,
          unitPrice: register.plan.price,
          duration: register.plan.duration,
          startDate: format(parseISO(register.startDate), 'dd/MM/yyyy'),
          endDate: format(parseISO(register.endDate), 'dd/MM/yyyy'),
        };

        return register;
      });

      setRegistrarions({ items: result, totalPages });
    } catch (e) {
      toast.error('Não foi possível buscar matrículas');
    }
  }

  useEffect(() => {
    getRegistrations(1);
  }, []);

  const onDelete = async id => {
    if (window.confirm('Deseja realmente excluir essa matrícula?')) {
      try {
        await api.delete(`/registrations/${id}`);

        const newRegistrations = registrations.filter(s => s.id !== id);
        setRegistrarions(newRegistrations);
      } catch (e) {
        toast.error('Não foi possível excluir a matrícula');
      }
    }
  };

  return (
    <ListComponent
      title="Gerenciando matrículas"
      columns={['Aluno', 'Plano', 'Início', 'Término', 'Ativa']}
      fields={['student', 'plan', 'startDate', 'endDate', 'active']}
      urlEdit="registrations-form"
      data={registrations.items}
      onPageChanged={getRegistrations}
      totalPages={registrations.totalPages}
      onDelete={onDelete}
    />
  );
}
