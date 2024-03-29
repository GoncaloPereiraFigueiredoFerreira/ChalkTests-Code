import {
  ExerciseJustificationKind,
  MCExercise,
  MCResolutionData,
  SolveProps,
} from "../Exercise";
import { useEffect, useReducer } from "react";
import { ExerciseHeaderComp } from "../Header/ExHeader";
import { TextareaBlock } from "../../../interactiveElements/TextareaBlock";

export interface MCSolveProps {
  exercise: MCExercise;
  position: string;
  context: SolveProps;
}

// MCAction Definition
export interface MCAction {
  type: MCActionKind;
  index: string;
  payload?: string;
  state?: MCResolutionData;
}

export enum MCActionKind {
  CHOOSE = "CHOOSE",
  JUSTIFY = "JUSTIFY",
  SETSTATE = "SETSTATE",
}

// Takes the current ExerciseState and an action to update the ExerciseState
function ExerciseMCReducer(mcState: MCResolutionData, mcAction: MCAction) {
  switch (mcAction.type) {
    case MCActionKind.CHOOSE:
      const newItems = { ...mcState.items };

      Object.keys(newItems).map(
        (index) => (newItems[index].value = index === mcAction.index)
      );
      return { ...mcState, items: newItems };

    case MCActionKind.JUSTIFY:
      const newItemsJUST = { ...mcState.items };
      newItemsJUST[mcAction.index].justification = mcAction.payload ?? "";
      return { ...mcState, items: newItemsJUST };

    case MCActionKind.SETSTATE:
      return { ...mcAction.state! };

    default:
      return mcState;
  }
}

export function MCSolve(props: MCSolveProps) {
  const initState: MCResolutionData = props.context
    .resolutionData as MCResolutionData;

  const [state, dispatch] = useReducer(ExerciseMCReducer, initState);

  useEffect(() => {
    props.context.setExerciseSolution(state);
  }, [state]);

  useEffect(() => {
    dispatch({
      type: MCActionKind.SETSTATE,
      index: "",
      state: initState,
    });
  }, [props.exercise]);

  return (
    <>
      <ExerciseHeaderComp
        header={props.exercise.base.statement}
      ></ExerciseHeaderComp>
      <ul>
        {Object.entries(state.items).map(([index, value]) => (
          <div key={index}>
            <label
              htmlFor={
                "mc" + props.exercise.identity?.id + index + props.position
              }
              className="flex px-4 py-1 gap-2 items-center hover:bg-gray-300 text-black dark:text-white"
            >
              <input
                id={"mc" + props.exercise.identity?.id + index + props.position}
                name={"mc" + props.exercise.identity?.id + props.position}
                type="radio"
                className="radio-blue mr-3"
                checked={value.value}
                onChange={() =>
                  dispatch({
                    type: MCActionKind.CHOOSE,
                    index: index,
                  })
                }
              ></input>
              {value.text}
            </label>
            <MCJustify
              index={index}
              state={state}
              dispatch={dispatch}
              justifyKind={props.exercise.props.justifyType}
            ></MCJustify>
          </div>
        ))}
      </ul>
    </>
  );
}

function MCJustify(props: any) {
  const justify: boolean =
    (props.justifyKind === ExerciseJustificationKind.JUSTIFY_ALL &&
      "value" in props.state.items[props.index]) ||
    (props.justifyKind === ExerciseJustificationKind.JUSTIFY_FALSE &&
      "value" in props.state.items[props.index] &&
      !props.state.items[props.index].value) ||
    (props.justifyKind === ExerciseJustificationKind.JUSTIFY_TRUE &&
      "value" in props.state.items[props.index] &&
      props.state.items[props.index].value);

  return props.justifyKind === ExerciseJustificationKind.NO_JUSTIFICATION ? (
    <div className="col-span-3"></div>
  ) : (
    <div
      className={`${justify ? "h-28" : "h-0"} transition-[height] duration-75`}
    >
      <div className="h-full px-7 overflow-hidden">
        <TextareaBlock
          className={`${justify ? "" : "hidden"} basic-input-text`}
          placeholder="Justifique a sua resposta"
          value={props.state.items[props.index].justification}
          onChange={(text: string) =>
            props.dispatch({
              type: MCActionKind.JUSTIFY,
              index: props.index,
              payload: text,
            })
          }
        ></TextareaBlock>
      </div>
    </div>
  );
}
