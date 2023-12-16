import { useState } from "react";
import { ExerciseJustificationKind } from "../Exercise";
import { ExerciseHeader } from "../Header/ExHeader";
import { TFPreviewProps } from "../TF/TFPreview";

export function MCPreview({
  id,
  items,
  position,
  statement,
  justifyKind,
}: TFPreviewProps) {
  const [chosenOption, setChosenOption] = useState("");
  return (
    <>
      <ExerciseHeader header={statement}></ExerciseHeader>
      <ul>
        {Object.entries(items).map(([index, value]) => (
          <div key={index}>
            <label
              htmlFor={"mc" + id + index + position}
              className="flex px-4 py-2 gap-2 items-center hover:bg-gray-300"
            >
              <input
                id={"mc" + id + index + position}
                name={"mc" + id + position}
                type="radio"
                className="radio-blue mr-3"
                onChange={() => setChosenOption(index)}
              ></input>
              {value.text}
            </label>
            <MCJustify
              index={index}
              chosenOption={chosenOption}
              justifyKind={justifyKind}
            ></MCJustify>
          </div>
        ))}
      </ul>
    </>
  );
}

function MCJustify(props: any) {
  let justify =
    props.justifyKind === ExerciseJustificationKind.JUSTIFY_ALL ||
    (props.justifyKind === ExerciseJustificationKind.JUSTIFY_UNMARKED &&
      props.chosenOption != props.index) ||
    (props.justifyKind === ExerciseJustificationKind.JUSTIFY_MARKED &&
      props.chosenOption === props.index);

  return props.justifyKind === ExerciseJustificationKind.NO_JUSTIFICATION ? (
    <div className="col-span-3"></div>
  ) : (
    <div
      className={`${justify ? "h-28" : "h-0"} transition-[height] duration-75`}
    >
      <div className="h-full px-7 overflow-hidden">
        <textarea
          className={`${justify ? "" : "hidden"} basic-input-text`}
          name={"justification"}
          rows={3}
          placeholder="Justifique a sua resposta"
        ></textarea>
      </div>
    </div>
  );
}