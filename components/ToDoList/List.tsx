import React from 'react';

const List = ({ list }) => {
  return (
    <ul className="flex">
      {list.map(({ title, description }) => (
        <li key={title} className="border-2 border-indigo-600  rounded-xl">
          <span className="mr-10 text-lg px-4 py-2"> {title}</span>
          <hr></hr>
          <span className="px-4 py-2 text-xs"> {description}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
