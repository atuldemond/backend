import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
// Import DOMAIN_NAME from helper.js

const Profile = () => {
  const { control, handleSubmit, setValue, reset } = useForm();
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.DOMAIN_NAME}/user/userdata`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
        setTodos(
          response.data.user.posts.map((post) => ({
            ...post,
            key: post._id,
            date: new Date(post.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTodo = (data) => {
    if (data.title.trim()) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: data.title,
          completed: false,
          date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
          content: data.description,
        },
      ]);

      const createPost = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${process.env.DOMAIN_NAME}/user/createpost`,
            {
              userId: user.user.id,
              title: data.title,
              description: data.description,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Post created successfully:", response.data);
          window.location.reload();
        } catch (error) {
          console.error("Error creating post:", error);
        } finally {
          setIsLoading(false);
        }
      };
      createPost();
    }
  };

  const handleEditTodo = (data) => {
    setTodos(
      todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, title: data.title, content: data.content }
          : todo
      )
    );
    setIsModalOpen(false);
    reset();

    const updatePost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.DOMAIN_NAME}/user/getupdatepost`,
          {
            userId: user.user.id,
            postId: selectedTodo._id,
            title: data.title,
            content: data.content,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Post updated successfully:", response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error updating post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    updatePost();
  };

  const handleViewTodo = (todo) => {
    setSelectedTodo(todo);
    setValue("title", todo.title || ""); // Ensure value is never undefined
    setValue("content", todo.content || ""); // Ensure value is never undefined
    setIsModalOpen(true);
  };

  const handleDeleteTodo = () => {
    const deletePost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.DOMAIN_NAME}/user/deletepost`,
          {
            userId: user.user.id,
            postId: selectedTodo._id,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Post deleted successfully:", response.data);
        setTodos(todos.filter((todo) => todo.id !== selectedTodo.id));
        setIsModalOpen(false);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    deletePost();
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Welcome {user.user.name}
        </h2>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Your To-do Lists
          </h3>
          <ul className="mt-4 space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.key}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg ${
                  todo.completed ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <span className="text-gray-900 font-medium">{todo.date}</span>
                  <button
                    onClick={() => handleViewTodo(todo)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <FaEdit />
                  </button>
                </div>
                <div className="flex items-center mt-2 md:mt-0 space-x-2">
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">
            Create New To-do List
          </h3>
          <form
            method="POST"
            onSubmit={handleSubmit(handleAddTodo)}
            className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3 mt-4"
          >
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/2"
                  placeholder="Enter new to-do"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  className="mt-3 md:mt-0 flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/2"
                  placeholder="Description"
                  rows={3}
                />
              )}
            />
            <button
              type="submit"
              className="mt-3 md:mt-0 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
            >
              Add
            </button>
          </form>
        </div>

        {isModalOpen && selectedTodo && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit To-do
              </h3>
              <form onSubmit={handleSubmit(handleEditTodo)} className="mt-4">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={selectedTodo.title || ""} // Ensure defaultValue is never undefined
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Edit title"
                    />
                  )}
                />
                <Controller
                  name="content"
                  control={control}
                  defaultValue={selectedTodo.content || ""} // Ensure defaultValue is never undefined
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Edit content"
                      rows={5}
                    />
                  )}
                />
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </form>
              <button
                onClick={handleDeleteTodo}
                className="mt-3 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
