import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Plans() {
  const [plans, setPlans] = useState([{}]);

  useEffect(() => {
    async function getPlans() {
      try {
        const { data } = await api.get(`/plans`);

        const result = data.map(plan => {
          plan.duration =
            plan.duration > 1 ? `${plan.duration} meses` : '1 mês';

          plan.price = `R$${parseFloat(plan.price).toFixed(2)}`;

          return plan;
        });

        setPlans(result);
      } catch (e) {
        toast.error('Não foi possível buscar planos');
      }
    }
    getPlans();
  }, []);

  const onDelete = id => {
    if (window.confirm('Deseja realmente excluir esse plano?')) {
      const newPlans = plans.filter(s => s.id !== id);
      // TODO:: CHAMAR EXCLUSAO
      setPlans(newPlans);
    }
  };

  return (
    <ListComponent
      title="Gerenciando planos"
      columns={['Título', 'Duração', 'Valor p/ Mês']}
      fields={['title', 'duration', 'price']}
      urlEdit="plan"
      data={plans}
      onDelete={onDelete}
      width={800}
    />
  );
}
