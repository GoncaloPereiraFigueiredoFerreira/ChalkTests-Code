import { useContext, useEffect, useReducer, useState } from "react";
import { ImgPos } from "../Exercise/Header/ExHeader";
import "./EditExercise.css";
import { EditHeader } from "../Exercise/Header/EditHeader";
import {
  Exercise,
  ExerciseJustificationKind,
  ExerciseType,
  ExerciseComponent,
  ExerciseContext,
  ExerciseHeader,
  ResolutionData,
  TFResolutionData,
  MCResolutionData,
  OAResolutionData,
  InitResolutionDataEx,
  InitExercise,
  MCExercise,
  ResolutionItems,
  TFExercise,
  Tag,
} from "../Exercise/Exercise";
import { Rubric, RubricContext } from "../Rubric/Rubric";
import { FiSave } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { APIContext } from "../../../APIContext";
import { Modal, Spinner } from "flowbite-react";
import { TextareaBlock } from "../../interactiveElements/TextareaBlock";
import { TagsFilterModal } from "../Tags/TagsFilterModal";

//------------------------------------//
//                                    //
//         ExerciseReducer            //
//                                    //
//------------------------------------//

export enum EditActionKind {
  CHANGE_TITLE = "CHANGE_TITLE",
  CHANGE_STATEMENT = "CHANGE_STATEMENT",
  ADD_IMG = "ADD_IMG",
  REMOVE_IMG = "REMOVE_IMG",
  CHANGE_IMG_URL = "CHANGE_IMG_URL",
  CHANGE_IMG_POS = "CHANGE_IMG_POS",
  CHANGE_SOLUTION_TEXT = "CHANGE_SOLUTION_TEXT",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CHANGE_ITEM_TF = "CHANGE_ITEM_TF",
  CHANGE_ITEM_MC = "CHANGE_ITEM_MC",
  CHANGE_ITEM_TEXT = "CHANGE_ITEM_TEXT",
  CHANGE_JUSTIFY_KIND = "CHANGE_JUSTIFY_KIND",
  CHANGE_MAX_ANSWERS = "CHANGE_MAX_ANSWERS",
  SET_TOPIC = "SET_TOPIC",
  SET_RUBRIC = "SET_RUBRIC",
  SET_SOLUTION = "SET_SOLUTION",
  SET_SUGESTION = "SET_FULL_EX",
  SET_TAGS = "SET_TAGS",
}

export interface EditAction {
  type: EditActionKind;
  dataString?: string;
  dataImgPos?: ImgPos;
  dataLString?: string[];
  dataItem?: {
    text?: string;
    justification?: string;
    value?: boolean;
  };
  dataTagsList?: Tag[];
  dataSolution?: ResolutionData;
  dataExercise?: Exercise;
  dataRubric?: Rubric;
  dataJK?: ExerciseJustificationKind;
}

function EditReducer(state: EditState, action: EditAction) {
  const exercise = state.exercise;
  const solution = state.solution;

  const changeStatement = (statement: ExerciseHeader): EditState => {
    return {
      ...state,
      exercise: {
        ...exercise,
        base: { ...exercise.base, statement: statement },
      },
    };
  };

  switch (action.type) {
    case EditActionKind.CHANGE_TITLE:
      return {
        ...state,
        exercise: {
          ...exercise,
          base: {
            ...exercise.base,
            title: action.dataString,
          },
        },
      } as EditState;

      throw new Error("Invalid action");

    case EditActionKind.CHANGE_STATEMENT:
      const newStatement1: ExerciseHeader = {
        ...exercise.base.statement,
        text: action.dataString ?? "",
      };
      return changeStatement(newStatement1);

    case EditActionKind.ADD_IMG:
      const newStatement2: ExerciseHeader = {
        ...exercise.base.statement,
        imagePath: "",
        imagePosition: ImgPos.BOT,
      };
      return changeStatement(newStatement2);

    case EditActionKind.REMOVE_IMG:
      const newStatement3: ExerciseHeader = {
        text: exercise.base.statement.text,
      };
      return changeStatement(newStatement3);

    case EditActionKind.CHANGE_IMG_URL:
      const newStatement4: ExerciseHeader = {
        ...exercise.base.statement,
        imagePath: action.dataString ?? "",
      };

      return changeStatement(newStatement4);

    case EditActionKind.CHANGE_IMG_POS:
      const newStatement5: ExerciseHeader = {
        ...exercise.base.statement,
        imagePosition: action.dataImgPos ?? ImgPos.BOT,
      };
      return changeStatement(newStatement5);

    case EditActionKind.ADD_ITEM:
      if (
        exercise.type === ExerciseType.MULTIPLE_CHOICE ||
        exercise.type === ExerciseType.TRUE_OR_FALSE
      ) {
        const newSolution: TFResolutionData | MCResolutionData = {
          ...solution,
        } as MCResolutionData;
        if (exercise.props.items && newSolution.items) {
          const newSolItems = { ...newSolution.items };
          const newItems = { ...exercise.props.items };
          newItems[action.dataString!] = {
            text: "",
            justification: "",
            value: false,
          };
          newSolItems[action.dataString!] = {
            text: "",
            justification: "",
            value: false,
          };
          return {
            solution: { ...solution, items: newSolItems } as ResolutionData,
            exercise: {
              ...exercise,
              props: { ...exercise.props, items: newItems },
            },
          };
        }
      }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_ITEM_TEXT:
      if (
        exercise.type === ExerciseType.MULTIPLE_CHOICE ||
        exercise.type === ExerciseType.TRUE_OR_FALSE
      ) {
        const newSolution: TFResolutionData | MCResolutionData = {
          ...solution,
        } as MCResolutionData;
        const newItems = { ...exercise.props.items };
        const newSolutionItems = { ...newSolution.items };

        newItems[action.dataString!].text = action.dataItem!.text!;
        newSolutionItems[action.dataString!].text = action.dataItem!.text!;
        return {
          exercise: {
            ...exercise,
            props: { ...exercise.props, items: newItems },
          } as Exercise,
          solution: { ...solution, items: newSolutionItems } as ResolutionData,
        };
      } else throw new Error("Invalid action");

    case EditActionKind.CHANGE_ITEM_TF:
      if (exercise.type === ExerciseType.TRUE_OR_FALSE) {
        const newSolution: TFResolutionData | MCResolutionData = {
          ...solution,
        } as MCResolutionData;
        const newItems = { ...newSolution.items };
        newItems[action.dataString!].value = action.dataItem!.value!;
        return {
          ...state,
          solution: {
            ...state.solution,
            items: newItems,
          } as ResolutionData,
        };
      } else throw new Error("Invalid action");

    case EditActionKind.CHANGE_ITEM_MC:
      if (exercise.type === ExerciseType.MULTIPLE_CHOICE) {
        const newSolution: TFResolutionData | MCResolutionData = {
          ...solution,
        } as MCResolutionData;
        const newItems = { ...newSolution.items };
        const selectedID = action.dataString!;
        Object.keys(newItems).map((key) => {
          newItems[key].value = key === selectedID;
        });
        return {
          ...state,
          solution: {
            ...state.solution,
            items: newItems,
          } as ResolutionData,
        };
      } else throw new Error("Invalid action");

    case EditActionKind.REMOVE_ITEM:
      if (
        exercise.type === ExerciseType.MULTIPLE_CHOICE ||
        exercise.type === ExerciseType.TRUE_OR_FALSE
      ) {
        const newSolution: TFResolutionData | MCResolutionData = {
          ...solution,
        } as MCResolutionData;
        const newItems = { ...exercise.props.items };
        delete newItems[action.dataString!];

        const newSolutionItems = { ...newSolution.items };
        delete newSolutionItems[action.dataString!];
        return {
          exercise: {
            ...exercise,
            props: { ...exercise.props, items: newItems },
          },

          solution: {
            ...solution,
            items: newSolutionItems,
          } as ResolutionData,
        };
      } else throw new Error("Invalid action");

    case EditActionKind.CHANGE_SOLUTION_TEXT:
      if (exercise.type === ExerciseType.OPEN_ANSWER) {
        const newSolution: OAResolutionData = {
          ...solution,
        } as OAResolutionData;

        newSolution.text = action.dataString!;
        return { ...state, solution: newSolution };
      }

      throw new Error("Invalid action");

    case EditActionKind.CHANGE_JUSTIFY_KIND:
      if (
        exercise.type === ExerciseType.MULTIPLE_CHOICE ||
        exercise.type === ExerciseType.TRUE_OR_FALSE
      )
        if (exercise.props.justifyType != action.dataJK!) {
          return {
            ...state,
            exercise: {
              ...exercise,
              props: {
                ...exercise.props,
                justifyType: action.dataJK!,
              },
            },
          };
        }
      throw new Error("Invalid action");

    case EditActionKind.CHANGE_MAX_ANSWERS:
      if (exercise.type === ExerciseType.CHAT) {
        return {
          ...state,
          exercise: {
            ...exercise,
            props: {
              ...exercise.props,
              maxAnswers: Number.parseInt(action.dataString!),
            },
          },
        };
      }
      throw new Error("Invalid action");

    case EditActionKind.SET_TOPIC:
      if (exercise.type === ExerciseType.CHAT) {
        const newTopics = [...action.dataLString!];
        return {
          ...state,
          exercise: {
            ...exercise,
            props: {
              ...exercise.props,
              topics: newTopics,
            },
          },
        };
      }
      throw new Error("Invalid action");

    case EditActionKind.SET_RUBRIC:
      if (
        exercise.type === ExerciseType.OPEN_ANSWER ||
        exercise.type === ExerciseType.CHAT
      ) {
        return { ...state, rubric: action.dataRubric };
      }
      throw new Error("Invalid action");

    case EditActionKind.SET_SOLUTION:
      if (
        exercise.type === ExerciseType.MULTIPLE_CHOICE ||
        exercise.type === ExerciseType.TRUE_OR_FALSE
      ) {
        return {
          ...state,
          solution: action.dataSolution ?? InitResolutionDataEx(exercise),
        };
      }
      throw new Error("Invalid action");

    case EditActionKind.SET_SUGESTION:
      return {
        ...state,
        solution: action.dataExercise
          ? InitResolutionDataEx(action.dataExercise)
          : state.solution,
        exercise: action.dataExercise ?? state.exercise,
      };

    case EditActionKind.SET_TAGS:
      return {
        ...state,
        exercise: {
          ...state.exercise,
          base: { ...state.exercise.base, tags: action.dataTagsList! },
        },
      };

    default:
      return state;
  }
}

interface EditState {
  exercise: Exercise;
  rubric?: Rubric;
  solution: ResolutionData;
}

//------------------------------------//
//                                    //
//           EditExercise             //
//                                    //
//------------------------------------//

interface EditExerciseProps {
  position?: string;
  exercise: Exercise;
  solution: ResolutionData;
  rubric?: Rubric;
  saveEdit: (state: EditState) => void;
  cancelEdit: (state: EditState) => void;
}

export function EditExercise({
  position,
  exercise,
  solution,
  rubric,
  saveEdit,
  cancelEdit,
}: EditExerciseProps) {
  const initState: EditState = {
    exercise: exercise,
    solution: solution ?? InitResolutionDataEx(exercise),
    rubric: rubric,
  };
  const [state, editDispatch] = useReducer(EditReducer, initState);
  const [openModal, setOpenModal] = useState(false);
  const [exSugestion, setSugestion] = useState<Exercise>();
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [openTagsModal, setTagsModal] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const { contactBACK } = useContext(APIContext);

  function generateEx() {
    if (text !== "" || input !== "") {
      setWaiting(true);
      setSugestion(undefined);
      getAIQuestion(state.exercise.type, text, input);
    }
  }

  function onCloseModal() {
    setOpenModal(false);
    setInput("");
    setText("");
  }

  useEffect(() => {
    if (
      exercise.type == ExerciseType.CHAT ||
      exercise.type == ExerciseType.OPEN_ANSWER
    )
      editDispatch({
        type: EditActionKind.SET_RUBRIC,
        dataRubric: rubric,
      });
  }, [rubric]);

  useEffect(() => {
    if (
      exercise.type == ExerciseType.MULTIPLE_CHOICE ||
      exercise.type == ExerciseType.TRUE_OR_FALSE
    )
      editDispatch({
        type: EditActionKind.SET_SOLUTION,
        dataSolution: solution,
      });
  }, [solution]);

  const getAIQuestion = (type: ExerciseType, text: string, input: string) => {
    let endpoint = "";
    switch (type) {
      case ExerciseType.TRUE_OR_FALSE:
        endpoint = "trueOrFalse";
        break;
      case ExerciseType.OPEN_ANSWER:
        endpoint = "openAnswer";
        break;
      case ExerciseType.MULTIPLE_CHOICE:
        endpoint = "multipleChoice";
        break;
      case ExerciseType.CHAT:
        return;
    }
    contactBACK("ai/new/" + endpoint, "POST", undefined, {
      text: text,
      input: input,
    }).then((json) => {
      let newEx: Exercise | undefined = InitExercise(type);
      switch (type) {
        case ExerciseType.TRUE_OR_FALSE:
          newEx.base.statement.text = text;
          let resItemsTF: ResolutionItems = {};
          json.list.map((statement: any, index: number) => {
            resItemsTF[index.toString()] = {
              text: statement.question,
              value: statement.correct,
            };
          });
          (newEx as TFExercise).props.items = resItemsTF;
          break;
        case ExerciseType.OPEN_ANSWER:
          newEx.base.statement.text = json.question;
          break;
        case ExerciseType.MULTIPLE_CHOICE:
          newEx.base.statement.text = json.question;
          let resItems: ResolutionItems = {};
          let answers: string[] = json.answers;
          answers.map((option: string, index: number) => {
            resItems[index.toString()] = {
              text: option,
              value: json.correct === index,
            };
          });
          (newEx as MCExercise).props.items = resItems;
          break;
      }
      setWaiting(false);
      setSugestion(newEx);
    });
  };

  const acceptQuestion = () => {
    if (exSugestion) {
      editDispatch({
        type: EditActionKind.SET_SUGESTION,
        dataExercise: exSugestion,
      });
      setSugestion(undefined);
      onCloseModal();
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4 min-h-max mt-8 bg-2-1 text-black dark:text-white">
        <div className="flex w-full justify-between px-4 pb-6 mb-3 border-b-2 border-slate-400 dark:border-slate-600">
          <label className="flex text-4xl text-slate-600 dark:text-white">
            Editar
          </label>
          <button
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group active:scale-90"
            onClick={() => cancelEdit(state)}
          >
            <IoClose className="size-5" />
            Cancelar
          </button>
        </div>
        <div className="mx-4 mb-4 border rounded-lg bg-white dark:bg-slate-800 border-slate-400 dark:border-slate-500">
          <ExerciseComponent
            position={position ? position : "1"}
            exercise={state.exercise}
            context={{
              context: ExerciseContext.PREVIEW,
            }}
          ></ExerciseComponent>
        </div>
        {state.exercise.type !== ExerciseType.CHAT && (
          <div className="px-4 pt-8 pb-4 border-t-2 border-slate-400 dark:border-slate-600">
            <button
              type="button"
              className="w-full py-2 px-4 text-base rounded-lg font-medium btn-base-color"
              onClick={() => setOpenModal(true)}
            >
              Sugestão para a criação do exercício
            </button>
            <Modal
              show={openModal}
              size="4xl"
              onClose={onCloseModal}
              popup
              dismissible
            >
              <Modal.Header />
              <label className="flex w-full max-w-4xl justify-between mb-4 px-4 pb-2.5 text-4xl text-slate-600 dark:text-white border-b-2 border-slate-400">
                Sugestão de Exercício
              </label>
              <Modal.Body>
                <div className="flex flex-col text-xl p-4">
                  <label className="pb-4">
                    Defina o texto de base para a criação da pergunta e as
                    diretrizes a seguir
                  </label>
                  <div>
                    <label className="text-xl pb-4">Texto de base:</label>
                    <TextareaBlock
                      toolbar={false}
                      value={text}
                      rows={3}
                      onChange={(e) => {
                        setText(e);
                      }}
                    ></TextareaBlock>
                  </div>
                  <div>
                    <label className="text-xl pb-4">Diretrizes:</label>
                    <TextareaBlock
                      toolbar={false}
                      value={input}
                      rows={3}
                      onChange={(e) => {
                        setInput(e);
                      }}
                    ></TextareaBlock>
                  </div>
                  {exSugestion && (
                    <ExerciseComponent
                      exercise={exSugestion}
                      position={"1"}
                      context={{ context: ExerciseContext.PREVIEW }}
                    />
                  )}
                  {!waiting ? (
                    <div className="flex justify-between w-full">
                      <button
                        type="button"
                        className="py-4 px-8 text-base rounded-lg font-medium btn-base-color active:scale-90"
                        onClick={() => {
                          generateEx();
                        }}
                      >
                        Gerar Novo Exercício
                      </button>
                      {exSugestion && (
                        <button
                          type="button"
                          className="py-4 px-8 text-base rounded-lg font-medium btn-base-color active:scale-90"
                          onClick={() => {
                            acceptQuestion();
                          }}
                        >
                          Guardar Exercício
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex w-full justify-center">
                      <Spinner></Spinner>
                    </div>
                  )}
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}

        <div className="flex flex-col gap-4 px-4 justify-between pt-8 border-t-2 border-slate-400 dark:border-slate-600">
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">Título:</p>
            <input
              className="rounded-lg w-full border-2 border-slate-300 focus:ring-0 bg-inherit dark:border-slate-700 dark:focus:border-slate-700"
              placeholder="Novo Teste"
              value={state.exercise.base.title}
              onChange={(e) =>
                editDispatch({
                  type: EditActionKind.CHANGE_TITLE,
                  dataString: e.target.value,
                } as EditAction)
              }
            />
          </div>
        </div>

        <div className="px-5 py-2 rounded-lg flex justify-between">
          <div className="flex space-x-3 items-center">
            <p className="text-xl font-medium">Tópicos:</p>
            {state.exercise.base.tags.map((tag) => {
              return <p>{tag.name}</p>;
            })}
          </div>
          <button
            type="button"
            onClick={() => setTagsModal(true)}
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group"
          >
            Escolher Tags
          </button>

          <TagsFilterModal
            header="Selecione as tags a adicionar ao seu Exercício"
            openModal={openTagsModal}
            setOpenModal={setTagsModal}
            setTagsList={(tags) => {
              editDispatch({
                type: EditActionKind.SET_TAGS,
                dataTagsList: tags,
              });
            }}
          ></TagsFilterModal>
        </div>

        <div className="px-5 rounded-lg">
          <EditHeader dispatch={editDispatch} state={state.exercise} />
        </div>
        <div className="pt-8 px-4 border-t-2 border-slate-400 dark:border-slate-600">
          <h3 className="pb-4 font-medium text-xl">Detalhes do Exercício:</h3>
          <ExerciseComponent
            position={position ?? "1"}
            exercise={state.exercise}
            context={{
              context: ExerciseContext.EDIT,
              dispatch: editDispatch,
              solutionData: state.solution,
            }}
          ></ExerciseComponent>
        </div>
        {(state.exercise.type === ExerciseType.CHAT ||
          state.exercise.type === ExerciseType.OPEN_ANSWER) && (
          <div className="py-2 px-4">
            <p className="text-xl font-medium">Rúbrica:</p>
            <Rubric
              context={{
                context: RubricContext.EDIT,
                setRubric: (rubric: Rubric) => {
                  editDispatch({
                    type: EditActionKind.SET_RUBRIC,
                    dataRubric: rubric,
                  });
                },
              }}
              rubric={state.rubric ?? { criteria: [] }}
            ></Rubric>
          </div>
        )}
        <div className="flex gap-2 p-4 border-t-2 border-slate-400 dark:border-slate-600">
          <button
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group"
            onClick={() => saveEdit(state)}
          >
            <FiSave className="size-5" />
            Guardar e fechar
          </button>
          <button
            className="flex py-3 px-4 items-center gap-2 text-base rounded-lg font-medium btn-base-color group"
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
