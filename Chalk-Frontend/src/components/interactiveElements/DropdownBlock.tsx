import { useState } from "react";
import { DownArrowIcon, UpArrowIcon } from "../objects/SVGImages/SVGImages";
import "./DropdownBlock.css";
import { CustomFlowbiteTheme, Dropdown, theme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary: "bg-red-500 hover:bg-red-600",
  },
};

interface DropdownBlockProps {
  style?: string;
  setChosenOption: (value: any) => void;
  chosenOption: any;
  options: any[];
  text: string;
  clearOption?: string;
  placement?: "bottom" | "top";
}

export function DropdownBlock({
  style,
  setChosenOption,
  chosenOption,
  options,
  text,
  clearOption,
  placement,
}: DropdownBlockProps) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <Dropdown
      label=""
      placement={placement ? placement : "auto"}
      className="dark:bg-gray-600"
      renderTrigger={() => (
        <button
          className={`${
            style ? style : ""
          } dropdown bg-btn-2-hover border-gray-2-1 group`}
        >
          <label> {chosenOption === null ? text : chosenOption} </label>
          {placement === "bottom" ? DownArrowIcon() : null}
          {placement === "top" ? UpArrowIcon() : null}
        </button>
      )}
    >
      {chosenOption != null && clearOption ? (
        <Dropdown.Item
          as="button"
          theme={{
            base: "bg-btn-3-1 inline-flex px-4 py-2 w-full text-sm group",
          }}
          onClick={() => {
            setChosenOption(null);
            setDropdownIsOpen(false);
          }}
        >
          <span>{clearOption}</span>
        </Dropdown.Item>
      ) : null}
      {options.map((value, index) =>
        chosenOption === value ? null : (
          <Dropdown.Item
            as="button"
            theme={{
              base: "bg-btn-3-1 inline-flex px-4 py-2 w-full text-sm group",
            }}
            key={index}
            onClick={() => {
              setChosenOption(value);
              setDropdownIsOpen(false);
            }}
          >
            <span>{value}</span>
          </Dropdown.Item>
        )
      )}
    </Dropdown>
  );
}