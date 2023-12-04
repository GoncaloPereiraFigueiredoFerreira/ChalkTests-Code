import { useReducer } from "react";
import { ExerciseHeader } from "../Header/ExHeader";
import { Exercise, ExerciseJustificationKind, TFStatement } from "../Exercise";

type TFState = TFStatement[];

// Type of actions allowed on the state
enum TFActionKind {
  CHOOSE = "CHOOSE",
  JUSTIFY = "JUSTIFY",
}

// TFAction Definition
interface TFAction {
  type: TFActionKind;
  index: number;
  value: string;
}

interface ExerciseProps {
  position: string;
  contexto: string;
  exercise: Exercise;
}

export function TFExercise({ position, contexto, exercise }: ExerciseProps) {
  let exerciseDisplay = <></>;
  if (exercise.problem && exercise.problem.justify)
    switch (contexto) {
      case "solve":
        <TFSolve
          id={exercise.id}
          position={position}
          problem={exercise.resolution?.true_or_false as TFStatement[]}
          statement={exercise.statement}
          justify={exercise.problem.justify}
        ></TFSolve>;
        break;

      case "preview":
        <TFPreview
          id={exercise.id}
          position={position}
          problem={exercise.problem}
          statement={exercise.statement}
        ></TFPreview>;
        break;

      case "correct":
        exerciseDisplay = <></>;
        break;

      case "psolution":
        exerciseDisplay = <></>;
        break;
    }
  return (
    <>
      <div className="m-5 text-title-2">{position + ") " + name}</div>
      <div className="m-5 text-lg">{exerciseDisplay}</div>
    </>
  );
}

function SolveReducer(state: TFState, action: TFAction): TFState {
  switch (action.type) {
    case TFActionKind.CHOOSE:
      let chooseState = [...state];
      chooseState[action.index].tfvalue = action.value;
      return chooseState;

    case TFActionKind.JUSTIFY:
      let justifyState = [...state];
      justifyState[action.index].justification = action.value;
      return justifyState;

    default:
      throw new Error();
  }
}

function TFSolve(props: any) {
  let initState: TFState = [];
  props.problem.statements.map((statment: TFStatement) =>
    initState.push({
      phrase: statment.phrase,
      tfvalue: statment.tfvalue,
      justification: statment.justification,
    })
  );

  const [state, dispatch] = useReducer(SolveReducer, initState);

  return (
    <>
      <ExerciseHeader header={props.statement}></ExerciseHeader>
      <div className="grid-layout-exercise mt-4 gap-2 min-h-max items-center">
        <div className="flex text-xl font-bold px-4">V</div>
        <div className="flex text-xl font-bold px-4">F</div>
        <div></div>
        {state.map((_solve: TFStatement, index: number) => {
          return (
            <TFShowStatement
              key={index}
              id={index}
              name={`radio-button-${index}-${props.id}-${props.position}`}
              justify={props.justify}
              state={state}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </>
  );
}

function TFShowStatement(props: any) {
  return (
    <>
      <div className="flex items-start justify-center">
        <input
          className="radio-green"
          type="radio"
          name={props.name}
          onClick={() => {
            props.state[props.id].tfvalue === "true"
              ? props.dispatch({
                  type: TFActionKind.CHOOSE,
                  index: props.id,
                  value: "",
                })
              : props.dispatch({
                  type: TFActionKind.CHOOSE,
                  index: props.id,
                  value: "true",
                });
          }}
          checked={props.state[props.id].tfvalue === "true"}
          readOnly
        ></input>
      </div>
      <div className="flex items-start justify-center">
        <input
          className="radio-red"
          type="radio"
          name={props.name}
          onClick={() => {
            props.state[props.id].tfvalue === "false"
              ? props.dispatch({
                  type: TFActionKind.CHOOSE,
                  index: props.id,
                  value: "",
                })
              : props.dispatch({
                  type: TFActionKind.CHOOSE,
                  index: props.id,
                  value: "false",
                });
          }}
          checked={props.state[props.id].tfvalue === "false"}
          readOnly
        ></input>
      </div>
      <div className="">
        <p>{props.state[props.id].phrase}</p>
      </div>
      <TFJustify
        id={props.id}
        state={props.state}
        dispatch={props.dispatch}
        justify={props.justify}
      ></TFJustify>
    </>
  );
}

function TFJustify(props: any) {
  let justify =
    (props.justify === ExerciseJustificationKind.JUSTIFY_ALL &&
      props.state[props.id].tfvalue != "") ||
    (props.justify === ExerciseJustificationKind.JUSTIFY_FALSE &&
      props.state[props.id].tfvalue === "false") ||
    (props.justify === ExerciseJustificationKind.JUSTIFY_TRUE &&
      props.state[props.id].tfvalue === "true");
  return props.justify === ExerciseJustificationKind.NO_JUSTIFICATION ? (
    <div className="col-span-3"></div>
  ) : (
    <div
      className={`${
        justify ? "h-28" : "h-0"
      } col-span-3 transition-[height] duration-75`}
    >
      <div className="h-full px-7 overflow-hidden">
        <textarea
          className={`${justify ? "" : "hidden"} basic-input-text`}
          name={"justification" + props.id}
          rows={3}
          placeholder="Justifique a sua resposta"
          value={props.state[props.id].justification}
          onChange={(e) =>
            props.dispatch({
              type: TFActionKind.JUSTIFY,
              index: props.id,
              value: e.target.value,
            })
          }
        ></textarea>
      </div>
    </div>
  );
}

function TFPreview(props: any) {
  let initState: TFState = [];
  props.problem.statements.map((text: any) =>
    initState.push({ phrase: text, tfvalue: "", justification: "" })
  );

  const [state, dispatch] = useReducer(SolveReducer, initState);

  console.log(props.problem.statements);
  return (
    <>
      <ExerciseHeader header={props.statement}></ExerciseHeader>
      <div className="grid-layout-exercise mt-4 gap-2 min-h-max items-center">
        <div className="flex text-xl font-bold px-4">V</div>
        <div className="flex text-xl font-bold px-4">F</div>
        <div className="flex text-xl font-bold px-4">{props.justify}</div>
        <div></div>
        {state.map((_solve: TFStatement, index: number) => {
          return (
            <div className="">
              <p key={index}>{props.state[props.id].phrase}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
