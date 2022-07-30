import React from "react";

function Box({ boxHeader, inputFields, formType }) {
  //   console.log(boxHeader);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="box">
      <div className="box-header">{boxHeader}</div>
      <form className={`${formType} user-form`}>
        {inputFields.map((ele) => {
          return (
            <label key={ele.name}>
              <input
                type={ele.type}
                name={ele.name}
                placeholder={ele.placeholder}
              />
            </label>
          );
        })}
        <input
          type="submit"
          value="Submit"
          className="submit-btn"
          onClick={onSubmit}
        />
      </form>
    </div>
  );
}

export default Box;
