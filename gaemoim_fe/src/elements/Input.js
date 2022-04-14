import React, { Children } from "react";
import styled from "styled-components";
import Button from "./Button";

const Input = (props) => {

  const { type, label, size, placeholder } = props;



  if (type == "line") {
    return (
      <React.Fragment>
        <Label {...props}>{label}</Label>
        <BlackInput {...props} />
      </React.Fragment>
    );
  }

  if (type == "checkbox") {
    return (
      <React.Fragment>
        <CheckBox {...props} />
        <Label>{label}</Label>
      </React.Fragment>
    );
  }

  if (type === "textarea") {
    return (
      <React.Fragment>
        <Label {...props}>{label}</Label>
        <Textarea {...props} />
      </React.Fragment>

    );
  }

  return (

    <React.Fragment>
      <Label>{label}</Label>
      <InputBox {...props} />
    </React.Fragment>

  );



}

Input.defaultProps = {
  label: null,
  type: null,
  placeholder: null,
  size: null,
}

const Label = styled.label`
  font-family: 'Pretendard-Regular';

  padding: 2px;
  font-size: ${(props) => props.size === "post" ? "1.5em" : "1.5em"};
  font-weight: 600;
`

const InputBox = styled.input`
  font-family: 'Pretendard-Regular';

  box-sizing: border-box;
  padding: 0 10px;

  width: 100%;
  height: 40px;

  border: none;
  border-bottom: 2px solid #E6D5B8;

  placeholder: ${(props) => props.placeholder};

  transition: 0.3s;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #FF9B26;
  }
  
  &::placeholder {
    font-size:0.85em;
    color: #888;
  }

`


const BlackInput = styled.input`
  font-family: 'Pretendard-Regular';

  box-sizing: border-box;
  padding: 0 10px;

  width: 100%;
  height: 40px;

  border: none;
  border-bottom: 2px solid #999;

  font-size: 2em;

  placeholder: ${(props) => props.placeholder};

  transition: 0.3s;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #1B1A17;
  }
  
  &::placeholder {
    font-size:0.85em;
    color: #888;
  }

`


const CheckBox = styled.input`

  &[type='checkbox'], &[type='checkbox']:checked {
    border-radius: 100%;
  }
  &[type='checkbox'] {
    background-color: #fff;
    border: 2px solid #FF9B26;
  }
  &[type='checkbox']:checked {
  background-color: #FF9B26;
}

`

const Textarea = styled.textarea`
  font-family: 'Pretendard-Regular';

  box-sizing: border-box;
  margin: 10px 0;
  padding: 10px;

  width: 100%;
  height: ${(props) => props.size === "post" ? "400px" : "100px"};

  border: 2px solid #999;
  border-radius: none;

  resize: none;
  placeholder: ${(props) => props.placeholder};

  transition: 0.3s;

  &:focus {
    outline:none;
    border: 2px solid #1B1A17;
  }
`



export default Input;