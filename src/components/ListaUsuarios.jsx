import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

import {
  fetchUsers,
  setSelectedUser,
  fetchPosts,
  fetchTodos,
} from "../features/users/usersSlice";
import { Card, Button, Modal } from "antd";
import { PostList } from "./PostList";
import { TodosList } from "./TodosList";
import { Formulario } from "./Formulario";

export const ListaUsuarios = () => {
  const dispatch = useDispatch();
  const { users, status, error, selectedUser } = useSelector(
    (state) => state.users
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
  const [isTodosModalOpen, setIsTodosModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showPostsModal = () => {
    setIsPostsModalOpen(true);
  };
  const showTodosModal = () => {
    setIsTodosModalOpen(true);
  };

  const showFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePostsCancel = () => {
    setIsPostsModalOpen(false);
  };
  const handleTodosCancel = () => {
    setIsTodosModalOpen(false);
  };
  const handleFormCancel = () => {
    setIsFormModalOpen(false);
  };

  if (status === "loading")
    return <div className="text-center text-gray-500">Cargando...</div>;
  if (status === "failed")
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {users.map((user) => (
        <Card
          key={user.id}
          hoverable
          style={{ width: "100%" }}
          title={user.name}
          extra={
            <Button
              type="primary"
              className="!bg-cyan-600 hover:bg-cyan-800"
              onClick={() => {
                dispatch(setSelectedUser(user));
                showModal();
              }}
            >
              Ver más
            </Button>
          }
        >
          <p>
            <strong className="text-slate-500">Usuario:</strong> {user.username}
          </p>
          <p>
            <strong className="text-slate-500">Email:</strong> {user.email}
          </p>
        </Card>
      ))}
      {selectedUser && (
        <Modal
          title={`Detalles: ${selectedUser.name}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <p>
            <strong>Usuario:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Sitio web:</strong> {selectedUser.website}
          </p>
          <div className="mt-4 flex !space-x-6">
            <Button
              type="primary"
              color="cyan"
              variant="solid"
              onClick={() => {
                dispatch(fetchPosts(selectedUser.id));
                showPostsModal();
              }}
            >
              Mostrar Posts
            </Button>
            <Button
              className="ml-10"
              type="primary"
              color="cyan"
              variant="solid"
              onClick={() => {
                dispatch(fetchTodos(selectedUser.id));
                showTodosModal();
              }}
            >
              Mostrar tareas
            </Button>
          </div>
        </Modal>
      )}
      <Modal
        open={isPostsModalOpen}
        onCancel={handlePostsCancel}
        footer={null}
        width={1100}
      >
        <PostList />
      </Modal>
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px", fontWeight: "600" }}>
              Tareas del usuario
            </span>
            <PlusCircleOutlined
              style={{
                fontSize: "20px",
                color: "#43b67e",
                cursor: "pointer",
                marginTop: "3px",
              }}
              onClick={showFormModal}
            />
          </div>
        }
        open={isTodosModalOpen}
        onCancel={handleTodosCancel}
        footer={null}
        width={800}
      >
        <TodosList />
      </Modal>
      <Modal
        title={
          <span style={{ fontSize: "24px", fontWeight: "600" }}>
            Agregar tarea
          </span>
        }
        open={isFormModalOpen}
        onCancel={handleFormCancel}
        footer={null}
      >
        <Formulario />
      </Modal>
    </div>
  );
};
