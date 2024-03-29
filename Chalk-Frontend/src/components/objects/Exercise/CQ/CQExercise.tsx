import {
  CQExercise,
  ExerciseComponentProps,
  ExerciseContext,
  PreviewProps,
  SolveProps,
} from "../Exercise";
import { CQEdit } from "./CQEdit";
import { CQPreview } from "./CQPreview";
import { CQSolve } from "./CQSolve";

export function CQExerciseComp({
  exercise,
  position,
  context,
}: ExerciseComponentProps) {
  let exerciseDisplay = <></>;
  switch (context.context) {
    case ExerciseContext.SOLVE:
      exerciseDisplay = (
        <CQSolve
          exercise={exercise as CQExercise}
          position={position}
          context={context as SolveProps}
        />
      );
      break;

    case ExerciseContext.PREVIEW:
      exerciseDisplay = (
        <CQPreview
          exercise={exercise as CQExercise}
          position={position}
          context={context as PreviewProps}
        />
      );
      break;

    case ExerciseContext.EDIT:
      exerciseDisplay = (
        <CQEdit exercise={exercise as CQExercise} context={context} />
      );
      break;

    case ExerciseContext.GRADING:
      exerciseDisplay = <></>;
      break;
    case ExerciseContext.REVIEW:
      exerciseDisplay = <></>;
      break;
  }
  return context.context !== ExerciseContext.EDIT ? (
    <>
      <div className="p-4 text-2xl font-medium text-black dark:text-white">
        {position + ") " + exercise.base.title}
      </div>
      <div className="px-12 text-lg">{exerciseDisplay}</div>
    </>
  ) : (
    <div className="text-lg">{exerciseDisplay}</div>
  );
}
