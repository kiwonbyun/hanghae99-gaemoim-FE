import React from "react";
import styled from "styled-components";


const Select = (props) => {

  const { _ref } = props;



  return (
    <React.Fragment>
      <Slt ref={_ref}>
        <option value="0">0명</option>
        <option value="1">1명</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option value="4">4명</option>
      </Slt>
    </React.Fragment>
  );
}


const Slt = styled.select`
  font-family: 'Pretendard-Regular';

  margin: 0 24px 0 4px;
  padding: 2px;

  border: 1px solid #333; 
`;



export default Select;