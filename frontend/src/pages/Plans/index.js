import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Plans() {
  const [plans, setPlans] = useState({ items: [], totalPages: 1 });
  async function getPlans(page) {
    try {
      const {
        data: { rows, totalPages },
      } = await api.get(`/plans?page=${page}`);

      const result = rows.map(plan => {
        plan.durationText =
          plan.duration > 1 ? `${plan.duration} meses` : '1 mês';

        plan.price = `R$${parseFloat(plan.price).toFixed(2)}`;

        return plan;
      });

      setPlans({ items: result, totalPages });
    } catch (e) {
      toast.error('Não foi possível buscar planos');
    }
  }
  useEffect(() => {
    getPlans(1);
  }, []);

  const onDelete = async id => {
    if (window.confirm('Deseja realmente excluir esse plano?')) {
      try {
        await api.delete(`/plans/${id}`);
        const newPlans = plans.filter(s => s.id !== id);
        setPlans(newPlans);
      } catch (e) {
        toast.error('Não foi possível excluir plano');
      }
    }
  };

  return (
    <ListComponent
      title="Gerenciando planos"
      columns={['Título', 'Duração', 'Valor p/ Mês']}
      fields={['title', 'durationText', 'price']}
      urlEdit="plans-form"
      onPageChanged={getPlans}
      totalPages={plans.totalPages}
      data={plans.items}
      onDelete={onDelete}
      width={800}
    />
  );
}
