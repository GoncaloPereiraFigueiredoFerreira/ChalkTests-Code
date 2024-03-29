import { TextareaBlock } from "../../interactiveElements/TextareaBlock";
import {
  ExerciseJustificationKind,
  ExerciseType,
  ResolutionType,
} from "../Exercise/Exercise";
import { AnswerProps } from "./Answer";

export function MCAnswer({ solution }: AnswerProps) {
  //const [rubric, setRubric] = useState<MCRubric>();
  if (solution.data.type == ExerciseType.MULTIPLE_CHOICE) {
    const resDate = solution.data;
    if (solution.type !== ResolutionType.SOLUTION) {
      return (
        <>
          <ul>
            {Object.entries(solution.data.items).map(([index, value]) => {
              const justify =
                resDate.justifyType === ExerciseJustificationKind.JUSTIFY_ALL ||
                (resDate.justifyType ===
                  ExerciseJustificationKind.JUSTIFY_UNMARKED &&
                  !value.value) ||
                (resDate.justifyType ===
                  ExerciseJustificationKind.JUSTIFY_MARKED &&
                  value.value);

              return (
                <div key={index}>
                  <label
                    htmlFor={"mc" + solution.exerciseID + index}
                    className="flex px-4 py-2 gap-2 items-center"
                  >
                    <input
                      id={"mc" + solution.exerciseID + index}
                      name={"mc" + solution.exerciseID}
                      type="radio"
                      className="radio-blue mr-3"
                      checked={value.value}
                      disabled
                    ></input>
                    {value.text}
                  </label>
                  {resDate.justifyType ===
                  ExerciseJustificationKind.NO_JUSTIFICATION ? (
                    <div className="col-span-3"></div>
                  ) : (
                    <div
                      className={`${
                        justify ? "h-28" : "h-0"
                      } transition-[height] duration-75`}
                    >
                      <div className="h-full px-7 overflow-hidden text-black">
                        <TextareaBlock
                          disabled={true}
                          className={`${
                            justify ? "" : "hidden"
                          } basic-input-text`}
                          value={value.justification}
                        ></TextareaBlock>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <ul>
            {Object.entries(solution.data.items).map(([index, value]) => (
              <div key={index}>
                <label
                  htmlFor={"mc" + solution.exerciseID + index}
                  className="flex px-4 py-2 gap-2 items-center hover:bg-gray-300"
                >
                  <input
                    id={"mc" + solution.exerciseID + index}
                    name={"mc" + solution.exerciseID}
                    type="radio"
                    className="radio-blue mr-3"
                    checked={value.value}
                    disabled
                  ></input>
                  {value.text}
                </label>
              </div>
            ))}
          </ul>
        </>
      );
    }
  }
}
