import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function StudentForm() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(10, 'Deve possuir ao minímo 10 caracteres')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Deve ser um e-mail válido')
      .required('E-mail é obrigatório'),
    birthDate: Yup.date()
      .format()
      .typeError('Data deve ser válida')
      .required('Data de nascimento é obrigatória'),
    weight: Yup.string().required('Peso é obrigatório'),
    height: Yup.string().required('Altura é obrigatório'),
  });
  const [student, setStudent] = useState({});
  const [pageTitle, setPageTitle] = useState('Cadastro de Aluno');

  useEffect(() => {
    const { state } = history.location;
    if (state) {
      const newState = {
        ...state,
        weight: state.weight.padStart(6, '0'),
        height: parseFloat(state.height).toFixed(2),
        birthDate: format(parseISO(state.birthDate), 'dd/MM/yyyy'),
      };
      setStudent(newState);
      setPageTitle('Edição de Aluno');
    }
  }, []);

  const saveExistentStudent = async ({
    name,
    email,
    birthDate,
    weight,
    height,
  }) => {
    return api.put(`/students/${student.id}`, {
      name,
      email,
      birthDate,
      weight: weight.replace('Kg', ''),
      height: height.replace('m', ''),
    });
  };

  const saveNewStudent = async ({ name, email, birthDate, weight, height }) => {
    return api.post('/students', {
      name,
      email,
      birthDate,
      weight: weight.replace('Kg', ''),
      height: height.replace('m', ''),
    });
  };

  const save = async (formData, { resetForm }) => {
    try {
      if (student.id) {
        await saveExistentStudent(formData);
      } else {
        await saveNewStudent(formData);
        resetForm({});
      }
      toast.success('Aluno salvo com sucesso');
    } catch (e) {
      toast.error('Não foi possível salvar aluno');
    }
  };

  return (
    <ContainerForm
      initialData={student}
      title={pageTitle}
      onSave={save}
      schema={schema}
    >
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
        value={student.birthDate || ''}
        onChange={e => setStudent({ ...student, birthDate: e.target.value })}
      />
      <InputComponent
        label="Peso (em kg)"
        name="weight"
        type="text"
        width="30%"
        mask="999.9Kg"
        value={student.weight || ''}
        onChange={e => setStudent({ ...student, weight: e.target.value })}
      />
      <InputComponent
        label="Altura"
        mask="9.99m"
        name="height"
        type="text"
        width="30%"
        value={student.height || ''}
        onChange={e => setStudent({ ...student, height: e.target.value })}
      />
    </ContainerForm>
  );
}
