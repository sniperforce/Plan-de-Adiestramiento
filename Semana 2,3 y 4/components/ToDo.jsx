import React from 'react';

const ToDo = ({
  id,
  title,
  description,
  is_complete,
  mongoId,
  deleteTodo,
  completedTodo,
}) => {
  return (
    <tr className="bg-white border-b border-gray-200 ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${is_complete ? 'line-through' : ''}`}>
        {title}
      </td>
      <td className={`px-6 py-4 ${is_complete ? 'line-through' : ''}`}>
        {description}
      </td>
      <td className="px-6 py-4">{is_complete ? 'Completed' : 'Pending'}</td>
      <td className="px-6 py-4 flex gap-1 ">
        <button
          className="w-[80px] py-2 px-4 bg-red-500 text-white rounded-[16px] cursor-pointer"
          onClick={() => deleteTodo(mongoId)}
        >
          Delete
        </button>
        <button
          className="w-[80px] py-2 px-4 bg-green-500 text-white rounded-[16px] cursor-pointer"
          onClick={() => completedTodo(mongoId, is_complete)}
        >
          {is_complete ? 'Undo' : 'Done'}
        </button>
      </td>
    </tr>
  );
};

export default ToDo;
