import React from 'react';
import * as Yup from 'yup';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function RegistrationForm() {
  const schema = Yup.object().shape({
    student: Yup.string().required('Aluno é obrigatório'),
    plan: Yup.number()
      .typeError('Deve ser um plano válido')
      .positive()
      .required('Plano é obrigatória'),
    startDate: Yup.date()
      .format()
      .typeError('Deve ser uma data válida')
      .required('Data início é obrigatório'),
  });

  return (
    <ContainerForm
      title="Cadastro de Matrícula"
      onSave={() => {}}
      schema={schema}
    >
      <InputComponent label="Aluno" name="student" type="text" />
      <InputComponent label="Plano" name="plan" type="text" width="25%" />
      <InputComponent
        label="Data de Início"
        name="startDate"
        type="text"
        width="25%"
      />
      <InputComponent
        label="Data de Término"
        disabled
        name="endDate"
        type="text"
        width="25%"
      />
      <InputComponent
        label="Valor final"
        disabled
        name="totalPrice"
        type="text"
        width="25%"
      />
    </ContainerForm>
  );
}
