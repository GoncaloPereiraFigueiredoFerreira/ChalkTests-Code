import { useReducer } from "react";
import { ImgPos } from "../Exercise/Header/ExHeader";
import "./EditExercise.css";
import { EditHeader } from "../Exercise/Header/EditHeader";
import { TFEdit } from "../Exercise/TF/TFEdit";
import {
  ListExerciseActionKind,
  useListExerciseContext,
} from "../ListExercises/ListExerciseContext";
import {
  Exercise,
  ExerciseJustificationKind,
  ExerciseType,
  ExerciseComponent,
  ExerciseContext,
} from "../Exercise/Exercise";

//------------------------------------//
//                                    //
//         ExerciseReducer            //
//                                    //
//------------------------------------//

export enum EditActionKind {
  CHANGE_STATEMENT = "CHANGE_STATEMENT",
  // ADD_IMG = "ADD_IMG",
  // REMOVE_IMG = "REMOVE_IMG",
  CHANGE_IMG_URL = "CHANGE_IMG_URL",
  CHANGE_IMG_POS = "CHANGE_IMG_POS",
  CHANGE_SOLUTION_TEXT = "CHANGE_SOLUTION_TEXT",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CHANGE_ITEM_TF = "CHANGE_ITEM_TF",
  CHANGE_ITEM_TEXT = "CHANGE_ITEM_TEXT",
  CHANGE_JUSTIFY_KIND = "CHANGE_JUSTIFY_KIND",
}

export interface EditAction {
  type: EditActionKind;
  statement?: {
    imagePath?: string;
    imagePosition?: ImgPos;
    text?: string;
  };
  data?:
    | string
    | {
        // for MC use chosen option id and value true.
        // the other options will be false automaticaly
        id: string;
        text?: string;
        value?: boolean;
      };
  justifyKind?: ExerciseJustificationKind;
}

function EditReducer(state: Exercise, action: EditAction) {
  switch (action.type) {
    case EditActionKind.CHANGE_STATEMENT:
      if (action.statement != undefined)
        if (action.statement.text != undefined) {
          let newStatement = {
            ...state.statement,
            text: action.statement.text,
          };
          return { ...state, statement: newStatement };
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_IMG_URL:
      if (action.statement != undefined)
        if (action.statement.imagePath != undefined) {
          let newStatement = {
            ...state.statement,
            imagePath: action.statement.imagePath,
          };
          return { ...state, statement: newStatement };
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_IMG_POS:
      if (action.statement != undefined)
        if (action.statement.imagePosition != undefined) {
          let newStatement = {
            ...state.statement,
            imagePosition: action.statement.imagePosition,
          };
          return { ...state, statement: newStatement };
        }
      throw new Error("Invalid action");

    case EditActionKind.ADD_ITEM:
      if (
        action.data != undefined &&
        typeof action.data != "string" &&
        (state.type === ExerciseType.MULTIPLE_CHOICE ||
          state.type === ExerciseType.TRUE_OR_FALSE)
      ) {
        let newState = { ...state };
        console.log(action.data);

        if (newState.solution != undefined) {
          if (newState.items && newState.solution.items) {
            newState.solution.items[action.data.id] = {
              justification: "",
              value: false,
            };
            newState.items[action.data.id] = {
              text: "",
              type: "string",
            };
            return newState;
          }
        } else throw new Error("Invalid state");
      }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_ITEM_TEXT:
      if (action.data != undefined && state.items != undefined)
        if (typeof action.data != "string" && action.data.text != undefined) {
          let newItems = { ...state.items };

          newItems[action.data.id].text = action.data.text;
          return {
            ...state,
            items: newItems,
          };
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_ITEM_TF:
      console.log(action);
      if (
        action.data != undefined &&
        state.solution != undefined &&
        typeof action.data != "string"
      )
        if (
          action.data.value != undefined &&
          state.solution.items != undefined
        ) {
          let newItems = { ...state.solution.items };
          if (state.type) newItems[action.data.id].value = action.data.value;
          return {
            ...state,
            solution: { items: newItems },
          };
        }
      throw new Error("Invalid action");

    case EditActionKind.REMOVE_ITEM:
      if (
        action.data != undefined &&
        state.solution != undefined &&
        state.items != undefined
      )
        if (
          typeof action.data != "string" &&
          state.solution.items != undefined
        ) {
          let newItems = { ...state.items };
          delete newItems[action.data.id];
          let newSolutionItems = { ...state.solution.items };
          delete newSolutionItems[action.data.id];
          return {
            ...state,
            items: newItems,
            solution: { items: newSolutionItems },
          };
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_SOLUTION_TEXT:
      if (action.data != undefined && state.type === ExerciseType.OPEN_ANSWER)
        if (typeof action.data === "string") {
          let newState = { ...state };
          if (newState.solution != undefined) {
            if (newState.solution.text) {
              newState.solution.text = action.data;
              return newState;
            }
          } else throw new Error("Invalid state");
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_JUSTIFY_KIND:
      if (
        action.justifyKind != undefined &&
        (state.type === ExerciseType.MULTIPLE_CHOICE ||
          state.type === ExerciseType.TRUE_OR_FALSE)
      )
        if (state.justifyKind != action.justifyKind) {
          return {
            ...state,
            justifyKind: action.justifyKind,
          };
        }
      throw new Error("Invalid action");
    default:
      return state;
  }
}

//------------------------------------//
//                                    //
//           EditExercise             //
//                                    //
//------------------------------------//

interface EditExerciseProps {
  editMenuIsOpen: string;
  setEditMenuIsOpen: (value: string) => void;
}

export function EditExercise({
  editMenuIsOpen,
  setEditMenuIsOpen,
}: EditExerciseProps) {
  const { dispatch, listExerciseState } = useListExerciseContext();
  let exercise = listExerciseState.listExercises[editMenuIsOpen];

  if (exercise.solution === undefined) {
    return <></>; // Not loaded yet
  } else {
    const [state, editDispatch] = useReducer(EditReducer, exercise);

    function editExerciseContent() {
      switch (exercise.type) {
        case ExerciseType.MULTIPLE_CHOICE:
          return <></>;

        case ExerciseType.OPEN_ANSWER:
          return <></>;

        case ExerciseType.TRUE_OR_FALSE:
          return <TFEdit dispatch={editDispatch} state={state} />;

        case ExerciseType.FILL_IN_THE_BLANK:
          return <></>;

        case ExerciseType.CODE:
          return <></>;
      }
    }
    return (
      <>
        <div className="flex flex-col w-full gap-4 min-h-max mt-8 px-16 pb-8 bg-2-1">
          <div className="flex w-full justify-between px-4 pb-6 mb-3 border-b-2 border-gray-2-2">
            <label className="flex text-title-1">Editar</label>
            <button
              className="transition-all duration-100 py-2 px-4 rounded-lg bg-btn-4-2"
              onClick={() => {
                if (editMenuIsOpen === "-1") {
                  // <<< RETIRAR ESTE IF >>>
                  // TEMPORARIO ENQUANTO NAO EXISTE LIGAÇÂO AO BACKEND
                  // PARA SE SABER O ID DO NOVO EXERCICIO
                  dispatch({
                    type: ListExerciseActionKind.EDIT_EXERCISE,
                    payload: {
                      exercise: {
                        ...state,
                        id: "novo id 1000",
                      },
                    },
                  });
                  // <<< RETIRAR ESTE IF (final)>>>
                } else {
                  // <<< MANTER >>>
                  dispatch({
                    type: ListExerciseActionKind.EDIT_EXERCISE,
                    payload: { exercise: state },
                  });
                  // <<< MANTER (final)>>>
                }
                setEditMenuIsOpen("");
              }}
            >
              Guardar e fechar
            </button>
          </div>
          <ExerciseComponent
            position="1"
            exercise={state}
            context={{
              context: ExerciseContext.PREVIEW,
            }}
          ></ExerciseComponent>
          <EditHeader dispatch={editDispatch} state={state} />
          {editExerciseContent()}
          <div className="flex gap-2">
            <button
              className="transition-all duration-100 py-2 px-4 rounded-lg bg-btn-4-2"
              onClick={() => {
                if (editMenuIsOpen === "-1") {
                  // <<< RETIRAR ESTE IF >>>
                  // TEMPORARIO ENQUANTO NAO EXISTE LIGAÇÂO AO BACKEND
                  // PARA SE SABER O ID DO NOVO EXERCICIO
                  dispatch({
                    type: ListExerciseActionKind.EDIT_EXERCISE,
                    payload: {
                      exercise: {
                        ...state,
                        id: "novo id 1000",
                      },
                    },
                  });
                  // <<< RETIRAR ESTE IF (final)>>>
                } else {
                  // <<< MANTER >>>
                  dispatch({
                    type: ListExerciseActionKind.EDIT_EXERCISE,
                    payload: { exercise: state },
                  });
                  // <<< MANTER (final)>>>
                }
                setEditMenuIsOpen("");
              }}
            >
              Guardar e fechar
            </button>
            <button
              className="transition-all duration-100 py-2 px-4 rounded-lg bg-btn-4-2"
              onClick={() => {
                if (editMenuIsOpen === "-1")
                  dispatch({
                    type: ListExerciseActionKind.REMOVE_EXERCISE,
                    payload: { selectedExercise: editMenuIsOpen },
                  });
                setEditMenuIsOpen("");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </>
    );
  }
}
