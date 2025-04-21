import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { useState } from "react";

export default function List({
  curElem,
  index,
  addData,
  setAddData,
  setTodoToEdit,
  setCurrentInputValue,
  handleCheckBtn,
  setShow,
  show,
}) {
  const [color, setColor] = useState(false);
  const handleCheckBtnColor = () => {
    setColor((prev) => !prev);
  };

  const handleSubItemId = () => {
    show === curElem.id ? setShow(true) : setShow(curElem.id);
  };

  return (
    <>
      <li
        key={index}
        className="flex items-center justify-between w-[360px] h-11 px-2 rounded-xs mx-auto bg-gray-300"
      >
        <p className={`${curElem.completed ? "line-through" : ""}`}>
          {curElem.name}
        </p>
        <div className="flex gap-2 me-2">
          <button
            type="button"
            className="hover:cursor-pointer opacity-50 text-[oklch(0.68 0.01 0)]"
            style={{ color: color ? "green" : "oklch(0.68 0.01 0)" }}
            onClick={() => {
              handleCheckBtn();
              handleCheckBtnColor();
            }}
          >
            <FaRegCircleCheck className={`opacity-50  hover:cursor-pointer`} />
          </button>
          <button
            type="button"
            className="text-[18px] opacity-50 hover:cursor-pointer"
            onClick={() => {
              setTodoToEdit(curElem);
              setCurrentInputValue(curElem.name);
            }}
            disabled={curElem.completed}
          >
            <CiEdit />
          </button>
          <button
            type="button"
            className="text-[18px] opacity-50 hover:cursor-pointer"
            onClick={() => {
              handleSubItemId();
            }}
            disabled={curElem.completed}
          >
            <MdOutlinePostAdd />
          </button>
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() =>
              setAddData(addData.filter((index) => index !== curElem))
            }
            disabled={curElem.completed}
          >
            <MdDelete className="opacity-50  hover:cursor-pointer" />
          </button>
        </div>
      </li>
    </>
  );
}
