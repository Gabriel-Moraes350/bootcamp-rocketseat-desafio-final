import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { differenceInYears, parseISO } from 'date-fns';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Students() {
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState([{}]);
  let timeout = 0;

  useEffect(() => {
    async function getStudents() {
      try {
        const { data } = await api.get(`/students?q=${searchText}`);

        const result = data.map(student => {
          student.age = differenceInYears(
            new Date(),
            parseISO(student.birthDate)
          );

          return student;
        });

        setStudents(result);
      } catch (e) {
        toast.error('Não foi possível buscar estudantes');
      }
    }
    getStudents();
  }, [searchText]);

  const onSearchChange = e => {
    const { value } = e.target;
    clearTimeout(timeout);

    timeout = setTimeout(() => setSearchText(value), 500);
  };

  const onDelete = id => {
    if (window.confirm('Deseja realmente excluir esse aluno?')) {
      const newStudents = students.filter(s => s.id !== id);
      // TODO:: CHAMAR EXCLUSAO
      setStudents(newStudents);
    }
  };

  return (
    <ListComponent
      title="Gerenciando alunos"
      columns={['Nome', 'E-mail', 'Idade']}
      fields={['name', 'email', 'age']}
      urlEdit="students-form"
      data={students}
      onDelete={onDelete}
      search
      searchChange={onSearchChange}
    />
  );
}
