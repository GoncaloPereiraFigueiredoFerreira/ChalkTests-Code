import { ListExercises } from "../../objects/ListExercises/ListExercises";
import { EditExercise } from "../../objects/EditExercise/EditExercise";
import { Searchbar } from "../../objects/Searchbar/Searchbar";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import {
  ListExerciseActionKind,
  ListExerciseContext,
  ListExerciseStateReducer,
} from "../../objects/ListExercises/ListExerciseContext";
import { useIsVisible } from "../HomePage/HomePage";
import { APIContext } from "../../../APIContext";
import {
  ExerciseType,
  ResolutionData,
  TranslateExerciseOUT,
  TranslateResolutionIN,
} from "../../objects/Exercise/Exercise";
import { Rubric, TranslateRubricOut } from "../../objects/Rubric/Rubric";

export function ExerciseBankPage() {
  const [editMenuIsOpen, setEditMenuIsOpen] = useState(false);
  const [exerciseID, setExerciseID] = useState("");
  const { contactBACK } = useContext(APIContext);
  const [rubrics, setRubrics] = useState<{ [id: string]: Rubric }>({});
  const [solutions, setSolutions] = useState<{ [id: string]: ResolutionData }>(
    {}
  );

  const inicialState = {
    listExercises: {},
    selectedExercise: "",
  };

  const [listExerciseState, dispatch] = useReducer(
    ListExerciseStateReducer,
    inicialState
  );

  const setRubric = (id: string, rubric?: Rubric) => {
    if (rubric) {
      const newRubrics = { ...rubrics };
      newRubrics[id] = rubric;
      setRubrics(newRubrics);
    }
  };

  const setSolution = (id: string, solution?: ResolutionData) => {
    if (solution) {
      const newSol = { ...solutions };
      newSol[id] = solution;
      setSolutions(newSol);
    }
  };

  useEffect(() => {
    if (editMenuIsOpen && exerciseID !== "-1") {
      switch (listExerciseState.listExercises[exerciseID].type) {
        case ExerciseType.OPEN_ANSWER:
        case ExerciseType.CHAT:
          if (!(exerciseID in rubrics)) {
            setRubric(exerciseID, { criteria: [] });
            contactBACK("exercises/" + exerciseID + "/rubric", "GET").then(
              (response) => {
                response.json().then((json) => {
                  setRubric(exerciseID, json);
                });
              }
            );
          }
          break;
        case ExerciseType.MULTIPLE_CHOICE:
        case ExerciseType.TRUE_OR_FALSE:
          if (!(exerciseID in solutions)) {
            contactBACK("exercises/" + exerciseID + "/solution", "GET").then(
              (response) => {
                response.json().then((json) => {
                  setSolution(
                    exerciseID,
                    TranslateResolutionIN(
                      json.data,
                      listExerciseState.listExercises[exerciseID]
                    )
                  );
                });
              }
            );
          }

          break;
      }
    }
  }, [editMenuIsOpen]);

  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);
  const [triggered1, setTriggered1] = useState(false);

  useEffect(() => {
    if (isVisible1) setTriggered1(true);
  }, [ref1, isVisible1]);

  return (
    <ListExerciseContext.Provider value={{ listExerciseState, dispatch }}>
      <div
        ref={ref1}
        className={`flex flex-row divide-x-2 border-gray-2-2 transition-all duration-100
                ${
                  isVisible1 || triggered1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-40"
                }`}
      >
        <div className="flex flex-col w-full h-screen overflow-auto bg-2-1">
          <Searchbar></Searchbar>
          <ListExercises
            setExerciseID={(value) => setExerciseID(value)}
            editMenuIsOpen={editMenuIsOpen}
            setEditMenuIsOpen={(value) => setEditMenuIsOpen(value)}
          ></ListExercises>
        </div>
        <div
          className={`${
            editMenuIsOpen ? "w-full px-8 pb-8" : "w-0"
          } flex flex-col h-screen overflow-auto bg-2-1 transition-[width]`}
        >
          {editMenuIsOpen ? (
            <EditExercise
              exercise={listExerciseState.listExercises[exerciseID]}
              rubric={rubrics[exerciseID]}
              solution={solutions[exerciseID]}
              saveEdit={(state) => {
                const { exerciseTR, solutionTR } = TranslateExerciseOUT(
                  state.exercise
                );
                const rubricTR = TranslateRubricOut(
                  state.exercise.type,
                  state.rubric
                );
                setRubric(exerciseID, state.rubric);
                setSolution(exerciseID, state.solution);
                if (exerciseID === "-1") {
                  contactBACK("exercises", "POST", undefined, {
                    exercise: exerciseTR,
                    solution: solutionTR,
                    rubric: Object.keys(rubricTR).length == 0 ? null : rubricTR,
                  }).then((response) => {
                    response.text().then((jsonRes) => {
                      dispatch({
                        type: ListExerciseActionKind.ADD_EXERCISE,
                        payload: {
                          exercise: {
                            ...state.exercise,
                            identity: {
                              ...state.exercise.identity,
                              id: jsonRes,
                              visibility:
                                state.exercise.identity?.visibility ?? "",
                              specialistId:
                                state.exercise.identity?.specialistId ?? "",
                            },
                          },
                        },
                      });
                    });
                  });
                } else {
                  contactBACK("exercises/" + exerciseID, "PUT", undefined, {
                    exercise: exerciseTR,
                    solution: solutionTR,
                    rubric: Object.keys(rubricTR).length == 0 ? null : rubricTR,
                  }).then(() => {
                    dispatch({
                      type: ListExerciseActionKind.EDIT_EXERCISE,
                      payload: { exercise: state.exercise },
                    });
                  });
                }
                setExerciseID("");
                setEditMenuIsOpen(false);
              }}
              cancelEdit={() => {
                if (exerciseID === "-1")
                  dispatch({
                    type: ListExerciseActionKind.REMOVE_EXERCISE,
                    payload: { selectedExercise: exerciseID },
                  });
                setExerciseID("");
                setEditMenuIsOpen(false);
              }}
            ></EditExercise>
          ) : null}
        </div>
      </div>
    </ListExerciseContext.Provider>
  );
}
