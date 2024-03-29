import {
  ExerciseComponentProps,
  ExerciseContext,
  OAExercise,
  PreviewProps,
  SolveProps,
} from "../Exercise";
import { OASolve } from "./OASolve";
import { OAPreview } from "./OAPreview";

export function OAExerciseComp({
  position,
  context,
  exercise,
}: ExerciseComponentProps) {
  let exerciseDisplay = <></>;
  switch (context.context) {
    case ExerciseContext.SOLVE:
      exerciseDisplay = (
        <OASolve
          position={position}
          context={context as SolveProps}
          exercise={exercise as OAExercise}
        />
      );
      break;

    case ExerciseContext.PREVIEW:
      exerciseDisplay = (
        <OAPreview
          position={position}
          context={context as PreviewProps}
          exercise={exercise as OAExercise}
        />
      );
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
    <>
      {context.context !== ExerciseContext.EDIT ? (
        <div className="p-4 text-2xl font-medium text-black dark:text-white">
          {position + ") " + exercise.base.title}
        </div>
      ) : null}
      <div className="px-12 text-lg">{exerciseDisplay}</div>
    </>
  );
}
