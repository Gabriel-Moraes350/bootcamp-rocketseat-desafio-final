import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { differenceInYears, parseISO } from 'date-fns';
import ListComponent from '~/components/ListComponent';
import api from '~/services/api';

export default function Students() {
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState({
    items: [{}],
    totalPages: 1,
  });

  let timeout = 0;
  async function getStudents(page) {
    try {
      const { data } = await api.get(`/students?q=${searchText}&page=${page}`);
      const result = data.rows.map(student => {
        student.age = differenceInYears(
          new Date(),
          parseISO(student.birthDate)
        );

        return student;
      });

      setStudents({ totalPages: data.totalPages, items: result });
    } catch (e) {
      toast.error('Não foi possível buscar estudantes');
    }
  }
  useEffect(() => {
    getStudents(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const onSearchChange = e => {
    const { value } = e.target;
    clearTimeout(timeout);

    timeout = setTimeout(() => setSearchText(value), 500);
  };

  const onDelete = async id => {
    if (window.confirm('Deseja realmente excluir esse aluno?')) {
      try {
        await api.delete(`/students/${id}`);
        const newStudents = students.data.filter(s => s.id !== id);
        setStudents({ ...students, data: newStudents });
      } catch (e) {
        toast.error('Não foi possível excluir estudante');
      }
    }
  };

  return (
    <ListComponent
      title="Gerenciando alunos"
      columns={['Nome', 'E-mail', 'Idade']}
      fields={['name', 'email', 'age']}
      urlEdit="students-form"
      data={students.items}
      totalPages={students.totalPages}
      onPageChanged={getStudents}
      onDelete={onDelete}
      search
      searchChange={onSearchChange}
    />
  );
}
