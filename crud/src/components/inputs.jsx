export default function Inputs({
  currentInputValue,
  setCurrentInputValue,
  handleAddData,
  todoToEdit,
}) {
  return (
    <>
      <label htmlFor="text"></label>
      <input
        type="text"
        name=""
        value={currentInputValue}
        className="border w-[315px] float-start ms-3 mb-5 h-9"
        placeholder="enter items as you like"
        onChange={(e) => {
          setCurrentInputValue(e.target.value);
        }}
        id="text"
      />
      <button
        type="button"
        className="bg-green-500 h-9 px-4  hover:cursor-pointer text-white"
        onClick={handleAddData}
      >
        {todoToEdit ? "🖍" : "+"}
      </button>
    </>
  );
}
