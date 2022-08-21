import React from "react";

function Box({ boxHeader, inputFields, formType, onSubmit }) {
  return (
    <div className="box">
      <div className="box-header">{boxHeader}</div>
      <form className={`${formType} user-form`} onSubmit={onSubmit}>
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
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
}

export default Box;
