import { TextareaBlock } from "../../interactiveElements/TextareaBlock";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface EditGroupProps {
  exerciseInstructions: string;
  saveEdit: (state: string) => void;
  cancelEdit: (state: string) => void;
}

export function EditGroup({
  exerciseInstructions,
  saveEdit,
  cancelEdit,
}: EditGroupProps) {
  const [state, setState] = useState(exerciseInstructions);

  return (
    <>
      <div className="flex flex-col w-full gap-4 min-h-max text-black dark:text-white">
        <div className="flex w-full justify-between mt-8 mb-3 px-4 pb-6 border-b-2 border-slate-400 dark:border-slate-600">
          <label className="flex text-4xl text-slate-600 dark:text-white">
            Editar
          </label>
          <div className="flex gap-4">
            <button
              className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group  transition-all duration-75 ease-in-out active:scale-90"
              onClick={() => cancelEdit(state)}
            >
              <IoClose className="size-5" />
              Cancelar
            </button>
          </div>
        </div>
        <strong>Instruções do Grupo:</strong>
        <TextareaBlock
          toolbar={true}
          rows={6}
          placeholder="Coloque aqui as instruções do grupo..."
          value={state}
          onChange={(value) => setState(value)}
        />
        <div className="flex gap-2 p-4 border-t-2 border-slate-400 dark:border-slate-600">
          <button
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group  transition-all duration-75 ease-in-out active:scale-90"
            onClick={() => saveEdit(state)}
          >
            <FiSave className="size-5" />
            Guardar e fechar
          </button>
          <button
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group  transition-all duration-75 ease-in-out active:scale-90"
            onClick={() => cancelEdit(state)}
          >
            <IoClose className="size-5" />
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
