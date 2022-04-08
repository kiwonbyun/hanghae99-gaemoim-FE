import React from "react";
import styled from "styled-components";


const Badge = (props) => {

    const { type } = props;


    return (
        <React.Fragment>
            <Bdg {...props}>{type}</Bdg>
        </React.Fragment>
    );

}


Badge.defaultProps = {
    type: null,
}




const Bdg = styled.div`
    font-family: 'Pretendard-Regular';
    display: fles;
    text-align: center;
    align-items: center;
    justify-content: center;

    width: 45px;
    height: 20px;

    border: none;
    border-radius: 20px;

    color: #fff;
    font-size: 0.9em;
    font-weight: 500; 

    background-color: ${(props)=> props.type=="모집완료"?"#E6D5B8":"#FF9B26"};
`;


export default Badge;