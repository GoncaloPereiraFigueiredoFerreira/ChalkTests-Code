import { useContext, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { APIContext } from "../../../APIContext";

export function CreateGroupModal({ open, close }: any) {
  const [name, setGroupName] = useState("");
  const { contactBACK } = useContext(APIContext);

  function onCloseModal() {
    if (name !== "")
      contactBACK(
        "courses",
        "POST",
        undefined,
        {
          description: "",
          name: name,
        },
        "none"
      ).then(() => {
        setGroupName("");
        close();
      });
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // If Enter key is pressed, prevent the default behavior and call the addStudent function
      event.preventDefault();
      onCloseModal();
    }
  };

  return (
    <Modal
      dismissible
      show={open}
      size="md"
      color="gray-600"
      onClose={close}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 w-full ">
          <h3 className="text-xl font-medium text-black dark:text-white">
            Criar um Novo Grupo
          </h3>
          <div>
            <div className="mb-2 block w-full dark:text-white">
              <label htmlFor="name">Nome do Grupo</label>
            </div>
            <TextInput
              type="text"
              id="name"
              className="w-full rounded-md"
              value={name}
              onChange={(event) => setGroupName(event.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            <button
              className="p-2 mt-4 w-full transition-all duration-200 ease-in-out rounded-lg btn-base-color hover:scale-105 active:scale-100"
              onClick={() => onCloseModal()}
            >
              Submeter Novo Grupo
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
