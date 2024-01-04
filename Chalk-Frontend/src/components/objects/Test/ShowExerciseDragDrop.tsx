import { useEffect, useState } from "react";
import {
  Exercise,
  ExerciseComponent,
  ExerciseComponentProps,
  ExerciseContext,
  ExerciseType,
} from "../Exercise/Exercise";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { PiChatsBold } from "react-icons/pi";
import {
  CreateTestActionKind,
  useCreateTestContext,
} from "./CreateTestContext";
import {
  CheckboxIcon,
  CheckedListIcon,
  GraduateIcon,
  LinkIcon,
  LockIcon,
  SchoolIcon,
  TextIcon,
  WorldSearchIcon,
} from "../SVGImages/SVGImages";

interface ShowExerciseDragDropProps {
  groupPosition: number;
  exercisePosition: number;
  exercise: Exercise;
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
  listExerciseButtons: boolean;
  // este exercicio está selecionado
  exerciseIsSelected: boolean;
  // definir exercicio aberto
  setSelectedExercise: (value: string) => void;
  // definir exercicio selecionado no GroupDragDrop
  setExerciseID: (value: {
    groupPosition: number;
    exercisePosition: number;
  }) => void;
}

export function ShowExerciseDragDrop({
  groupPosition,
  exercisePosition,
  exercise,
  selectedMenu,
  setSelectedMenu,
  listExerciseButtons,
  exerciseIsSelected,
  setSelectedExercise,
  setExerciseID,
}: ShowExerciseDragDropProps) {
  const [typeLabel, setTypeLabel] = useState(<></>);
  const [visibility, setVisibility] = useState(<></>);
  const [preview, setPreview] = useState(<></>);
  const { testState, dispatch } = useCreateTestContext();

  const exerciseComponent: ExerciseComponentProps = {
    exercise: exercise,
    position: (exercisePosition + 1).toString(),
    context: { context: ExerciseContext.PREVIEW },
  };

  const [value, setValue] = useState(
    (exercise.identity.cotation ?? 0).toString()
  );
  const [changeCotationIsActive, setChangeCotationIsActive] = useState(false);

  function handleChange(value: string) {
    const result = value.match(/^(0*)(\d*[\.,]?\d{0,2})$/);
    if (result) {
      let resultStr = result[2].toString();
      if (resultStr !== "") setValue(resultStr);
      else setValue("0");
    }
  }

  function handleBlur() {
    setChangeCotationIsActive(false);
    dispatch({
      type: CreateTestActionKind.CHANGE_EXERCISE_COTATION,
      exercise: {
        groupPosition: groupPosition,
        exercisePosition: exercisePosition,
        newCotation: parseFloat(value),
      },
    });
  }

  function handleClick() {
    setChangeCotationIsActive(true);
    const inputElement = document.getElementById("cotation");
    if (inputElement) inputElement.focus();
  }

  useEffect(() => {
    switch (exercise.type) {
      case ExerciseType.MULTIPLE_CHOICE:
        setTypeLabel(
          <label className="caracteristics-exercise gray-icon">
            <CheckedListIcon size="size-4" />
            Escolha múltipla
          </label>
        );

        setPreview(<ExerciseComponent {...exerciseComponent} />);
        break;
      case ExerciseType.OPEN_ANSWER:
        setTypeLabel(
          <label className="caracteristics-exercise gray-icon">
            <TextIcon size="size-4" />
            Resposta aberta
          </label>
        );
        setPreview(<ExerciseComponent {...exerciseComponent} />);
        break;
      case ExerciseType.TRUE_OR_FALSE:
        setTypeLabel(
          <label className="caracteristics-exercise gray-icon">
            <CheckboxIcon size="size-4" />
            Verdadeiro ou falso
          </label>
        );
        setPreview(<ExerciseComponent {...exerciseComponent} />);
        break;

      case ExerciseType.CHAT:
        setTypeLabel(
          <label className="caracteristics-exercise gray-icon">
            <div className="h-full scale-125">
              <PiChatsBold />
            </div>
            Chat Question
          </label>
        );
        setPreview(<ExerciseComponent {...exerciseComponent} />);
        break;
    }
  }, [exercise]);

  useEffect(() => {
    switch (exercise.identity.visibility) {
      case "private":
        setVisibility(
          <label className="caracteristics-exercise gray-icon">
            <LockIcon size="size-4" />
            Privado
          </label>
        );
        break;
      case "not-listed":
        setVisibility(
          <label className="caracteristics-exercise gray-icon">
            <LinkIcon size="size-4" />
            Não listado
          </label>
        );
        break;
      case "course":
        setVisibility(
          <label className="caracteristics-exercise gray-icon">
            <GraduateIcon size="size-4" />
            Curso
          </label>
        );
        break;
      case "institutional":
        setVisibility(
          <label className="caracteristics-exercise gray-icon">
            <SchoolIcon size="size-4" />
            Institucional
          </label>
        );
        break;
      case "public":
        setVisibility(
          <label className="caracteristics-exercise gray-icon">
            <WorldSearchIcon size="size-4" />
            Público
          </label>
        );
        break;
      default:
        break;
    }
  }, [exercise]);

  return (
    <div
      className={`${
        exerciseIsSelected ? "max-h-full" : "max-h-[78px]"
      } transition-[max-height] overflow-hidden duration-300 rounded-lg bg-3-2 group-hover`}
    >
      <div className="flex flex-col h-full px-5 py-2.5">
        <div className="flex items-center text-sm font-normal transition-all mb-4 group">
          <button
            className="flex flex-col gap-1.5 h-14 justify-center cursor-default"
            onClick={() =>
              exerciseIsSelected
                ? setSelectedExercise("")
                : setSelectedExercise(exercise.identity.id)
            }
          >
            <label className="flex min-w-max font-medium text-xl">
              {exercise.base.title}
            </label>
          </button>
          <button
            className={` ${
              listExerciseButtons
                ? exerciseIsSelected
                  ? "mr-[75px] pr-4 border-r-2"
                  : "group-hover:mr-[75px] group-hover:pr-4 group-hover:border-r-2"
                : exerciseIsSelected
                ? "mr-[118px] pr-4 border-r-2"
                : "group-hover:mr-[118px] group-hover:pr-4 group-hover:border-r-2"
            } pl-4 w-full h-full flex relative justify-end items-center gap-4 z-10 duration-100 transition-[margin] cursor-default bg-3-2 border-gray-1`}
            onClick={() =>
              exerciseIsSelected
                ? setSelectedExercise("")
                : setSelectedExercise(exercise.identity.id)
            }
          >
            <div className="flex flex-col justify-center">
              {visibility}
              {typeLabel}
            </div>
          </button>
          <div className="flex flex-row-reverse w-0 items-center gap-4 z-0">
            {listExerciseButtons ? (
              <button
                className="btn-options-exercise gray-icon"
                onClick={() => {
                  setExerciseID({
                    groupPosition: groupPosition,
                    exercisePosition:
                      testState.test.groups[groupPosition].exercises.length,
                  });
                  dispatch({
                    type: CreateTestActionKind.ADD_EXERCISE,
                    exercise: {
                      groupPosition: groupPosition,
                      exercisePosition:
                        testState.test.groups[groupPosition].exercises.length,
                      exercise: exercise,
                    },
                  });
                }}
              >
                <FaArrowRightToBracket />
                Adicionar
              </button>
            ) : (
              <>
                <button
                  className="btn-options-exercise gray-icon"
                  onClick={() => {
                    setExerciseID({
                      groupPosition: groupPosition,
                      exercisePosition: -1,
                    });
                    dispatch({
                      type: CreateTestActionKind.REMOVE_EXERCISE,
                      exercise: {
                        groupPosition: groupPosition,
                        exercisePosition: exercisePosition,
                      },
                    });
                  }}
                >
                  <HiOutlineTrash className="size-5" />
                  Eliminar
                </button>
                <button
                  className="btn-options-exercise gray-icon"
                  onClick={() => {
                    if (selectedMenu !== "edit-exercise") {
                      setSelectedMenu("edit-exercise");
                      setExerciseID({
                        groupPosition: groupPosition,
                        exercisePosition: exercisePosition,
                      });
                      dispatch({
                        type: CreateTestActionKind.SELECT_EXERCISE_POSITION,
                        exercise: {
                          groupPosition: groupPosition,
                          exercisePosition: exercisePosition,
                        },
                      });
                    }
                  }}
                >
                  <FaPencilAlt className="size-5" />
                  Editar
                </button>
              </>
            )}
          </div>

          {!listExerciseButtons ? (
            changeCotationIsActive ? (
              <input
                id="cotation"
                className="flex ml-4 w-14 px-2 py-1 rounded-lg bg-input-2"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => handleBlur()}
                autoFocus
              />
            ) : (
              <div
                className="flex ml-4 min-w-fit rounded-lg appearance-none bg-3-1 bg-input-1"
                onClick={() => handleClick()}
              >
                <p className="flex justify-center text-base min-w-[56px] px-2 py-1">
                  {value} pts
                </p>
              </div>
            )
          ) : null}
        </div>
        <div
          className={`${
            !exerciseIsSelected ? "hidden" : "flex"
          } flex-wrap w-full text-sm font-normal gap-2 mx-1 mb-4 pb-4 border-b-2 border-gray-1`}
        >
          <div className="bg-yellow-600 tag-exercise">Matemática</div>
          <div className="bg-blue-600 tag-exercise">4º ano</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-blue-600 tag-exercise">4º ano</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-blue-600 tag-exercise">4º ano</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-green-600 tag-exercise">escolinha</div>
          <div className="bg-blue-600 tag-exercise">4º ano</div>
        </div>
        <div
          className={`${
            !exerciseIsSelected ? "scale-y-0" : ""
          } flex flex-col mx-4 mb-4 border rounded-lg ex-1 border-gray-1`}
        >
          {preview}
        </div>
      </div>
    </div>
  );
}
