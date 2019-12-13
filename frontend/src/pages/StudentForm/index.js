import React from 'react';
import * as Yup from 'yup';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function StudentForm() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min('Deve possuir ao minímo 10 caracteres')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Deve ser um e-mail válido')
      .required('E-mail é obrigatório'),
    birthDate: Yup.date()
      .format()
      .typeError('Data deve ser válida')
      .required('Data de nascimento é obrigatória'),
    weight: Yup.number()
      .typeError('Deve ser um número válido')
      .required('Peso é obrigatório'),
    height: Yup.number()
      .typeError('Deve ser um número válido')
      .required('Altura é obrigatório'),
  });

  return (
    <ContainerForm title="Cadastro de Aluno" onSave={() => {}} schema={schema}>
      <InputComponent
        label="Nome Completo"
        name="name"
        type="text"
        placeholder="John Doe"
      />
      <InputComponent
        label="Endereço de E-Mail"
        name="email"
        type="email"
        placeholder="exemplo@gmail.com"
      />
      <InputComponent
        label="Data de nascimento"
        name="birthDate"
        type="text"
        width="30%"
        mask="99/99/9999"
      />
      <InputComponent
        label="Peso (em kg)"
        name="weight"
        type="text"
        width="30%"
        mask="999.99"
      />
      <InputComponent
        label="Altura"
        mask="9.99"
        name="height"
        type="text"
        width="30%"
      />
    </ContainerForm>
  );
}
