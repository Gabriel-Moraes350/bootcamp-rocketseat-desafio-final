import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Registrations() {
  const [registrations, setRegistrarions] = useState([{}]);

  useEffect(() => {
    async function getRegistrations() {
      try {
        const { data } = await api.get(`/registrations`);

        const result = data.map(register => {
          register = {
            id: register.id,
            active: register.active ? 'SIM' : 'NÃO',
            student: register.student.name,
            plan: register.plan.title,
            startDate: format(parseISO(register.startDate), 'dd/MM/yyyy'),
            endDate: format(parseISO(register.endDate), 'dd/MM/yyyy'),
          };

          return register;
        });

        setRegistrarions(result);
      } catch (e) {
        toast.error('Não foi possível buscar matrículas');
      }
    }
    getRegistrations();
  }, []);

  const onDelete = id => {
    if (window.confirm('Deseja realmente excluir essa matrícula?')) {
      const newRegistrations = registrations.filter(s => s.id !== id);
      // TODO:: CHAMAR EXCLUSAO
      setRegistrarions(newRegistrations);
    }
  };

  return (
    <ListComponent
      title="Gerenciando matrículas"
      columns={['Aluno', 'Plano', 'Início', 'Término', 'Ativa']}
      fields={['student', 'plan', 'startDate', 'endDate', 'active']}
      urlEdit="registrations"
      data={registrations}
      onDelete={onDelete}
    />
  );
}
