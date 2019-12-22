import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { parse, toDate, addMonths, parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import AsyncSelect from '~/components/ReactAsyncSelect';
import DatePicker from '~/components/ReactDatePicker';
import Select from '~/components/ReactSelect';
import api from '~/services/api';
import history from '~/services/history';
import { Container } from '~/components/InputComponent/styles';
import ContainerForm from '~/components/ContainerForm';
import InputComponent from '~/components/InputComponent';

export default function RegistrationForm() {
  const schema = Yup.object().shape({
    student: Yup.string().required('Aluno é obrigatório'),
    plan: Yup.number()
      .typeError('Deve ser um plano válido')
      .positive()
      .required('Plano é obrigatório'),
    startDate: Yup.string()
      .typeError('Data Início é obrigatório')
      .required('Data início é obrigatório'),
  });

  const [register, setRegister] = useState({
    id: null,
    startDate: new Date(),
    plan: {},
    student: {},
    price: '',
    endDate: '',
  });
  const [plans, setPlans] = useState([]);
  const [pageTitle, setPageTitle] = useState('Cadastro de Matrícula');

  useEffect(() => {
    async function getPlans() {
      const { data } = await api.get('/plans');
      setPlans(
        data.map(item => {
          return { value: item.id, label: item.title, ...item };
        })
      );
    }
    const { state } = history.location;
    if (state) {
      setRegister({
        ...state,
        startDate: toDate(parse(state.startDate, 'dd/MM/yyyy', new Date())),
        plan: {
          value: state.planId,
          label: state.plan,
          price: state.unitPrice,
          duration: state.duration,
        },
        student: { value: state.studentId, label: state.student },
        price: `R$${parseFloat(state.price).toFixed(2)}`,
        endDate: state.endDate,
      });
      setPageTitle('Edição de Matrícula');
    }

    getPlans();
  }, []);

  const saveExistentRegister = async ({ student, plan, startDate }) => {
    return api.put(`/registrations/${register.id}`, {
      studentId: student,
      planId: plan,
      startDate,
    });
  };

  const saveNewRegister = async ({ student, plan, startDate }) => {
    return api.post('/registrations', {
      studentId: student,
      planId: plan,
      startDate,
    });
  };

  const save = async (formData, { resetForm }) => {
    formData.startDate = new Date(formData.startDate).toISOString();
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

  const loadStudents = async name => {
    const { data } = await api.get(`/students?q=${name}`);

    return data.map(student => {
      return { value: student.id, label: student.name };
    });
  };

  let timeout;
  const studentsPromise = inputValue =>
    new Promise(resolve => {
      clearTimeout(timeout);

      timeout = setTimeout(async () => {
        resolve(await loadStudents(inputValue));
      }, 1000);
    });

  const updatePriceAndEndDate = ({ unitPrice, duration, date }) => {
    if (!date || !unitPrice) {
      return { price: '', endDate: '' };
    }
    const startDateParsed = date.toISOString()
      ? parseISO(date.toISOString())
      : parse(date, 'dd/MM/yyyy', new Date());
    const endDate = format(addMonths(startDateParsed, duration), 'dd/MM/yyyy');
    const price = `R$${parseFloat(parseFloat(unitPrice) * duration).toFixed(
      2
    )}`;
    return { price, endDate };
  };

  const onChangePlans = e => {
    if (!e) {
      setRegister({
        ...register,
        plan: {},
      });
      return;
    }
    const { value, label, price, duration } = e;
    const { price: totalPrice, endDate } = updatePriceAndEndDate({
      unitPrice: price,
      duration,
      date: register.startDate,
    });
    setRegister({
      ...register,
      plan: { value, label, price, duration },
      price: totalPrice,
      endDate,
    });
  };

  const onChangeStudent = e => {
    if (!e) {
      setRegister({ ...register, student: {} });
      return;
    }
    const { value, label } = e;
    setRegister({ ...register, student: { value, label } });
  };

  const onChangeDatePicker = date => {
    const { price: unitPrice, duration } = register.plan;
    const { price, endDate } = updatePriceAndEndDate({
      unitPrice,
      duration,
      date,
    });
    setRegister({ ...register, startDate: date, price, endDate });
  };

  return (
    <ContainerForm title={pageTitle} onSave={save} schema={schema}>
      <Container>
        <AsyncSelect
          styles={{
            control: styles => ({ ...styles, height: 45 }),
          }}
          name="student"
          placeholder="Busque o aluno..."
          id="student"
          label="Aluno"
          value={register.student}
          onChange={onChangeStudent}
          callback={studentsPromise}
        />
      </Container>
      <Container width="25%">
        <Select
          placeholder="Selecione o plano"
          options={plans}
          name="plan"
          label="Plano"
          value={register.plan}
          onChange={onChangePlans}
        />
      </Container>
      <Container width="25%">
        <DatePicker
          selected={register.startDate}
          label="Data inicial"
          onChange={onChangeDatePicker}
          name="startDate"
          id="startDate"
        />
      </Container>

      <InputComponent
        label="Data de Término"
        name="endDate"
        disabled
        type="text"
        width="25%"
        value={register.endDate || ''}
      />
      <InputComponent
        label="Valor final"
        name="totalPrice"
        disabled
        type="text"
        width="25%"
        value={register.price || ''}
      />
    </ContainerForm>
  );
}
