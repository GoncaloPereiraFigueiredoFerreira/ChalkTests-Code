import { ExerciseComponentProps, ExerciseContext } from "../Exercise";
import { OASolve } from "./OASolve";
import { OAPreview } from "./OAPreview";

export function OAExercise({
  position,
  context,
  exercise,
}: ExerciseComponentProps) {
  let exerciseDisplay = <></>;
  switch (context.context) {
    case ExerciseContext.SOLVE:
      exerciseDisplay = (
        <OASolve
          statement={exercise.statement}
          resolution={context.resolutionData}
          setResolution={context.setExerciseSolution}
        ></OASolve>
      );
      break;

    case ExerciseContext.PREVIEW:
      exerciseDisplay = <OAPreview statement={exercise.statement}></OAPreview>;
      break;

    case ExerciseContext.EDIT:
      exerciseDisplay = <></>;
      break;

    case ExerciseContext.GRADING:
      exerciseDisplay = <></>;
      break;

    case ExerciseContext.REVIEW:
      exerciseDisplay = <></>;
      break;
  }
  return (
    <div className="">
      <div className="m-5 text-title-2">{position + ") " + exercise.title}</div>
      <div className="m-5 text-lg">{exerciseDisplay}</div>
    </div>
  );
}
