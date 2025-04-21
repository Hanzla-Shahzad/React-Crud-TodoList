import { useEffect, useRef, useState } from "react";
import List from "./list";
import Inputs from "./inputs";
import SubList from "./subList";

function Todo() {
  const [addData, setAddData] = useState([]);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [editDis, setEditDis] = useState(false);
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  const [addSubData, setAddSubData] = useState([]);
  const [subCurrInputVal, setSubCurrInputVal] = useState("");
  const [subEdit, setSubEdit] = useState(null);
  const [subEditDis, setSubEditDis] = useState(false);
  useEffect(() => {
    // ref.current.document.style.display = "none";
    console.log("show", show);
  }, [show]);

  const handleAddData = () => {
    if (!currentInputValue) return;
    if (editDis) {
      setTodoToEdit(null);
    } else if (todoToEdit) {
      let temp = [...addData];
      const index = temp.findIndex((e) => e.id === todoToEdit.id);
      temp[index] = { ...temp[index], name: currentInputValue };
      setAddData(temp);
      setTodoToEdit(null);
      setCurrentInputValue("");
      return;
    }

    const newItem = {
      id: addData.length + 1,
      name: currentInputValue,
      completed: false,
    };
    if (currentInputValue === "") {
      return;
    } else {
      setAddData([...addData, newItem]);
      setCurrentInputValue("");
    }
  };

  const handleCheckBtn = (curElem) => {
    const updated = addData.map((item) =>
      item.id === curElem.id ? { ...item, completed: !item.completed } : item
    );
    setAddData(updated);
    if (todoToEdit.id === curElem.id) {
      setCurrentInputValue("");
      setTodoToEdit(null);
    }
    // setEditDis(true);
  };

  // Sub Data Information
  const handleAddSubData = (curElem) => {
    if (!subCurrInputVal) return;
    let newSubItem = {
      ids: Date.now(),
      parentId: curElem.id,
      name: subCurrInputVal,
    };
    setAddSubData([...addSubData, newSubItem]);
    setSubCurrInputVal("");
  };
  const handleSubAddData = () => {
    if (!subCurrInputVal) return;
    else if (subEdit) {
      let t = [...addSubData];
      const idx = t.findIndex((e) => e.ids === subEdit.ids);
      t[idx] = { ...t[idx], name: subCurrInputVal };
      setAddSubData(t);
      setSubEdit(null);
      setSubCurrInputVal("");
    }
  };

  return (
    <>
      <div className="mx-auto w-sm h-auto border py-3">
        <Inputs
          currentInputValue={currentInputValue}
          setCurrentInputValue={setCurrentInputValue}
          handleAddData={handleAddData}
          todoToEdit={todoToEdit}
        ></Inputs>
        <ul>
          {addData &&
            addData.map((curElem, index) => (
              <div key={curElem.id}>
                <List
                  curElem={curElem}
                  index={index}
                  addData={addData}
                  setAddData={setAddData}
                  setTodoToEdit={setTodoToEdit}
                  setCurrentInputValue={setCurrentInputValue}
                  setEditDis={setEditDis}
                  handleCheckBtn={() => handleCheckBtn(curElem)}
                  handleAddData={handleAddData}
                  setShow={setShow}
                  show={show}
                />

                {/* ✅ Show sub-input for the matching todo */}
                {show === curElem.id && (
                  <li ref={ref}>
                    <div className="flex items-center justify-center float-start mt-1">
                      <input
                        type="text"
                        className="border w-[315px] float-start ms-3 mb-5 h-9"
                        placeholder="Enter sub items as you like"
                        value={subCurrInputVal}
                        onChange={(e) => setSubCurrInputVal(e.target.value)}
                      />
                      <button
                        type="button"
                        className="bg-green-500 h-9 px-4 text-white relative bottom-2.5"
                        onClick={() => {
                          handleAddSubData(curElem);
                          handleSubAddData();
                        }}
                      >
                        {subEdit ? "🖍" : "+"}
                      </button>
                    </div>
                  </li>
                )}

                {/* ✅ Show sub-items linked to this todo */}
                {addSubData
                  .filter((sub) => sub.parentId === curElem.id)
                  .map((sub) => (
                    <li key={sub.ids} className="ms-6">
                      <SubList
                        curValue={sub}
                        addSubData={addSubData}
                        setAddSubData={setAddSubData}
                        subCurrInputVal={subCurrInputVal}
                        setSubCurrInputVal={setSubCurrInputVal}
                        setSubEdit={setSubEdit}
                        subEdit={subEdit}
                        handleSubAddData={handleSubAddData}
                        setSubEditDis={setSubEditDis}
                        subEditDis={subEditDis}
                      />
                    </li>
                  ))}
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
