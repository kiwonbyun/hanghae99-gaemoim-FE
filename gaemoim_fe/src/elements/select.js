import React from "react";
import styled from "styled-components";


const Select = () => {
  return (
    <React.Fragment>
      <Slt>
        <option>0명</option>
        <option>1명</option>
        <option>2명</option>
        <option>3명</option>
        <option>4명</option>
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