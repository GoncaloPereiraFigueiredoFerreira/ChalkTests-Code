import { Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export function Account() {
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setPassword("");
  }

  return (
    <div className="grid grid-cols-1">
      <button
        className="mb-6 inline-block w-fit rounded bg-[#acacff] hover:bg-[#5555ce] text-black hover:text-white dark:bg-[#dddddd] hover:dark:text-black dark:hover:bg-[#ffd025] bg-[#acacff] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={() => setOpenModal(true)}
      >
        Change Password
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-black dark:text-white">
              Change Password
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Current password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="New password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="name@company.com"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm new password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="name@company.com"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#acacff] hover:bg-[#5555ce] dark:bg-gray-600 hover:dark:bg-[#ffd025] text-black hover:text-white dark:text-white hover:dark:text-black bg-[#acacff] float-right rounded p-2"
            >
              Change
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <button
        className="mb-6 inline-block w-fit rounded bg-red-600 text-white dark:text-black  00 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal "
        onClick={() => setopenModalDelete(true)}
      >
        Delete account
      </button>
      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setopenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-black dark:text-white">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-[#acacff] hover:bg-[#5555ce] dark:bg-gray-600 hover:dark:bg-[#ffd025] text-black hover:text-white dark:text-white hover:dark:text-black p-2 rounded text-white bg-[#acacff] "
                onClick={() => setopenModalDelete(false)}
              >
                {"Yes, I'm sure"}
              </button>
              <button
                className="bg-red-600 p-2 rounded text-white"
                onClick={() => setopenModalDelete(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
