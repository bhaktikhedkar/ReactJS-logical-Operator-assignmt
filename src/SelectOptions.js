import React, { useState } from "react";

function SelectOptions() {
  const [inputs, setInputs] = useState([{ arg: "My Arg", value: true }]);
  const [operator, setOperator] = useState("list...");
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [TwoAndInputFields,setTwoAndInputFields] = useState("");
  const [TwoOrInputFields,setTwoOrInputFields] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index].arg = event.target.value;
    setInputs(values);
  };

  const handleSelectChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value === "true";
    setInputs(values);
  };

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
    if (event.target.value === "constant") {
      setShowSecondSelect(true);
    } else {
      setShowSecondSelect(false);
    }
  };

  const getResult = () => {
    if (operator === "and") {
      return inputs.every((input) => input.value)
        ? "Result: True"
        : "Result: False";
    } else {
      return inputs.some((input) => input.value)
        ? "Result: True"
        : "Result: False";
    }
  };

  function twoAndInputs(e){
    return setTwoAndInputFields(e.target.value)
  }

  function twoOrInputs(e){
    return setTwoOrInputFields(e.target.value)
  } 

  const inputDelete = (index)=>{
    const newInputs = [...inputs];
    newInputs.splice(inputs.length-1, 1);
    setInputs(newInputs);
  }

  function List(){
     setOperator("list...")
     setTwoAndInputFields("")
     setTwoOrInputFields("")
  }
    
    return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            value={input.arg}
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            value={input.value ? "true" : "false"}
            onChange={(event) => handleSelectChange(index, event)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      ))}
      <button onClick={() => setInputs([...inputs, { arg: "", value: true }])}>
        Add
      </button>
      <button onClick={(index)=>inputDelete(index)}>Delete</button>
      <br/>
      <br/>
      <div>
      {showSecondSelect ? (
          <select
            onChange={(event) => handleSelectChange(0, event)}
            value={inputs[0].value ? "true" : "false"}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        ) : (
          // <select value={operator} onChange={handleOperatorChange}>
           <select value={operator} onChange={(e)=>{handleOperatorChange(e);twoAndInputs(e);twoOrInputs(e);}}>
            <option value="list...">list...</option>
            <option value="constant">constant</option>
            <option value="argument">argument</option>
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        )}
         <button value="list..." onClick={(e)=>{List();handleOperatorChange(e);}}>X</button>
        {TwoAndInputFields === 'and' && (
        <div>
        <input type="text"/>
        <br/>
        <input type="text"/>
        </div>
      )}
      {
        TwoOrInputFields === 'or' && (
          <div>
          <input type="text"/>
          <br/>
          <input type="text"/>
          </div>
        )
      }
      </div>
     <br/>
      <div>{getResult()}</div>
    </div>
  );
}

export default SelectOptions;
