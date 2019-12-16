import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
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

  const [register, setRegister] = useState({});
  const [plans, setPlans] = useState([]);
  const [pageTitle, setPageTitle] = useState('Cadastro de Matrícula');

  useEffect(() => {
    const { state } = history.location;
    if (state) {
      setRegister({
        state,
      });
      setPageTitle('Edição de Matrícula');
    }
  }, []);

  const saveExistentRegister = async ({ studentId, planId, startDate }) => {
    return api.put(`/registrations/${register.id}`, {
      studentId,
      planId,
      startDate,
    });
  };

  const saveNewRegister = async ({ studentId, planId, startDate }) => {
    return api.post('/registrations', {
      studentId,
      planId,
      startDate,
    });
  };

  const save = async (formData, { resetForm }) => {
    try {
      if (register.id) {
        await saveExistentRegister(formData);
      } else {
        await saveNewRegister(formData);
        resetForm({});
      }
      toast.success('Matrícula salva com sucesso');
    } catch (e) {
      toast.error('Não foi possível salvar a matrícula');
    }
  };

  return (
    <ContainerForm title={pageTitle} onSave={save} schema={schema}>
      <InputComponent label="Aluno" name="student" type="text" />
      <InputComponent label="Plano" name="plan" type="text" width="25%" />
      <InputComponent
        label="Data de Início"
        name="startDate"
        mask="99/99/9999"
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
