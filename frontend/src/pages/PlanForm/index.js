import React from 'react';
import * as Yup from 'yup';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function PlanForm() {
  const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    duration: Yup.number()
      .typeError('Deve ser um número válido')
      .positive()
      .required('Duração é obrigatória'),
    price: Yup.number()
      .typeError('Deve ser um número válido')
      .required('Preço é obrigatório'),
  });

  return (
    <ContainerForm title="Cadastro de Plano" onSave={() => {}} schema={schema}>
      <InputComponent label="Título do plano" name="title" type="text" />
      <InputComponent
        label="Duração (em meses)"
        name="duration"
        type="text"
        width="30%"
      />
      <InputComponent
        label="Preço Mensal"
        name="price"
        type="text"
        width="30%"
        mask="999.99"
      />
      <InputComponent
        label="Preço total"
        disabled
        name="totalPrice"
        type="text"
        width="30%"
      />
    </ContainerForm>
  );
}
