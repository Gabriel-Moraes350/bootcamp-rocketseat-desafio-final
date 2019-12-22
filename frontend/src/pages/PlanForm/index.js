import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function PlanForm() {
  const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    duration: Yup.number()
      .typeError('Deve ser um número válido')
      .positive()
      .required('Duração é obrigatória'),
    price: Yup.string().required('Preço é obrigatório'),
  });

  const [plan, setPlan] = useState({
    title: '',
    price: '',
    duration: '',
    totalPrice: 'R$0.00',
  });

  const [pageTitle, setPageTitle] = useState('Cadastro de Plano');
  const calcTotalPrice = (duration = '', price = '') => {
    const result = `R$${(
      Number(duration) * parseFloat(price.replace('R$', ''))
    ).toFixed(2)}`;
    return result;
  };
  useEffect(() => {
    const { state } = history.location;
    if (state) {
      setPlan({
        ...state,
        totalPrice: calcTotalPrice(state.duration, state.price),
      });
      setPageTitle('Edição de Plano');
    }
  }, []);

  const saveExistentPlan = async ({ title, duration, price }) => {
    return api.put(`/plans/${plan.id}`, {
      title,
      duration,
      price: price.replace('R$', ''),
    });
  };

  const saveNewPlan = async ({ title, duration, price }) => {
    return api.post('/plans', {
      title,
      duration,
      price: price.replace('R$', ''),
    });
  };

  const save = async (formData, { resetForm }) => {
    try {
      if (plan.id) {
        await saveExistentPlan(formData);
      } else {
        await saveNewPlan(formData);
        resetForm({});
      }
      toast.success('Plano salvo com sucesso');
    } catch (e) {
      toast.error('Não foi possível salvar plano');
    }
  };

  return (
    <ContainerForm title={pageTitle} onSave={save} schema={schema}>
      <InputComponent
        label="Título do plano"
        value={plan.title || ''}
        onChange={e => setPlan({ ...plan, title: e.target.value })}
        name="title"
        type="text"
      />
      <InputComponent
        label="Duração (em meses)"
        name="duration"
        type="text"
        width="30%"
        value={plan.duration || ''}
        onChange={e => {
          setPlan({
            ...plan,
            duration: e.target.value,
            totalPrice: calcTotalPrice(e.target.value, plan.price),
          });
        }}
      />
      <InputComponent
        label="Preço Mensal"
        name="price"
        type="text"
        width="30%"
        mask="R$999.99"
        value={plan.price || ''}
        onChange={e => {
          setPlan({
            ...plan,
            price: e.target.value,
            totalPrice: calcTotalPrice(plan.duration, e.target.value),
          });
        }}
      />
      <InputComponent
        label="Preço total"
        name="totalPrice"
        disabled
        type="text"
        width="30%"
        value={plan.totalPrice || ''}
      />
    </ContainerForm>
  );
}
