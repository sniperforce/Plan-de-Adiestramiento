'use client';
import ToDo from '@/components/ToDo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [toDos, setToDos] = useState([]);

  const fetchToDos = async () => {
    const res = await axios('/api');
    setToDos(res.data.toDos);
  };

  const deleteTodo = async (mongoId) => {
    const res = await axios.delete('/api', {
      params: { mongoId },
    });
    toast.success(res.data.message);
    await fetchToDos();
  };

  const completedTodo = async (mongoId, isCompleted) => {
    const res = await axios.put(
      '/api',
      {},
      { params: { mongoId, isCompleted } }
    );
    toast.success(res.data.message);
    await fetchToDos();
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((form) => ({ ...formData, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api code
      const res = await axios.post('/api', formData);

      toast.success(res.data.message);
      setFormData({
        title: '',
        description: '',
      });
      await fetchToDos();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-18 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.title}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.description}
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white cursor-pointer"
        >
          Add ToDo
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {toDos.map((toDo, index) => {
              return (
                <ToDo
                  key={toDo._id}
                  title={toDo.title}
                  description={toDo.description}
                  is_complete={toDo.isCompleted}
                  mongoId={toDo._id}
                  id={index}
                  deleteTodo={deleteTodo}
                  completedTodo={completedTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
