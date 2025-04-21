import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
export default function SubList({
  index,
  curValue,
  addSubData,
  setAddSubData,
  setSubEdit,
  setSubCurrInputVal,
}) {
  return (
    <>
      <li
        key={index}
        className="flex items-center justify-between w-[360px] h-11 px-2 rounded-xs mx-auto bg-gray-300"
      >
        <p>{curValue.name}</p>
        <div className="flex gap-2 me-2">
          <button
            type="button"
            className="text-[18px] opacity-50 hover:cursor-pointer"
            onClick={() => {
              setSubEdit(curValue);
              setSubCurrInputVal(curValue.name);
            }}
          >
            <CiEdit />
          </button>
          <button
            type="button"
            className="text-[18px] opacity-50 hover:cursor-pointer"
          >
            <MdOutlinePostAdd />
          </button>
          <button className="hover:cursor-pointer" type="button">
            <MdDelete
              className="opacity-50  hover:cursor-pointer"
              onClick={() =>
                setAddSubData(addSubData.filter((e) => e !== curValue))
              }
            />
          </button>
        </div>
      </li>
    </>
  );
}
