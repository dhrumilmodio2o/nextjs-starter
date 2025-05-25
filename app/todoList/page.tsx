'use client';

import AddTodo from '@/components/ToDoList/AddTodo';
import List from '@/components/ToDoList/List';
import React, { useState } from 'react';

const dummyData = [{ title: 'Dhrumil', description: 'I am dhrumil' }];
const page = () => {
  const [list, setList] = useState([]);

  const onAdd = (title, description) => {
    setList([...list, { title, description }]);
  };

  return (
    <div>
      <AddTodo onAdd={onAdd} />
      <List list={list} />
    </div>
  );
};

export default page;
