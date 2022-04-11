import React from "react";
import styled from "styled-components";


const Button = (props) => {

    const { type, size, color, children } = props;

    const styles = {
        type: type,
        size: size,
        color: color,
    }

    if (type === "circle") {
        return (
            <React.Fragment>
                <CircleBtn {...props}>{children}</CircleBtn>
            </React.Fragment>
        )
    }

    if (size === "XS") {
        return (
            <React.Fragment>
                <SmBtn {...props}>{children}</SmBtn>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Btn {...props}>
                {children}
            </Btn>
        </React.Fragment>
    );
}


Button.defaultProps = {
    type: null,
    children: null,
    color: "#FF9B26",
    size: "",
}



const Btn = styled.button`
    font-family: 'Pretendard-Regular';

    width: ${(props) => props.size === "S" ? "100px;" : "150px"};
    height: ${(props) => props.size === "S" ? "30px;" : "50px"};

    border: none;
    border-radius: 20px;

    color: #fff;
    font-size: ${(props) => props.size === "S" ? "1.3em;" : "2em"};
    font-weight: 800; 

    background-color: ${(props) => props.color === "light" ? "#E6D5B8" : "#FF9B26"};

    transition: 0.3s;
&:hover {
    background-color: ${(props) => props.color === "light" ? "#C2B08F" : "#FF7A00"};
}
`;

const CircleBtn = styled.button`
    font-family: 'Pretendard-Regular';

    width: ${(props) => props.size === "S" ? "100px;" : "150px"};
    height: ${(props) => props.size === "S" ? "100px;" : "150px"};

    border: none;
    border-radius: ${(props) => props.size === "S" ? "100px;" : "150px"};

    color: #fff;

    font-size: ${(props) => props.size === "S" ? "1.8em;" : "2.3em"};
    font-weight: 800; 

    background-color: ${(props) => props.color === "light" ? "#E6D5B8" : "#FF9B26"};

    transition: 0.3s;

&:hover {
    background-color: ${(props) => props.color === "light" ? "#C2B08F" : "#FF7A00"};
}
`;



const SmBtn = styled.button`
font-family: 'Pretendard-Regular';

width: 35px;
height: 20px;

border: none;
border-radius: 3px;

color: #fff;
font-size: 1em;
font-weight: 800; 

background-color: ${(props) => props.color === "light" ? "#E6D5B8" : "#FF9B26"};

transition: 0.3s;

&:hover {
background-color: ${(props) => props.color === "light" ? "#C2B08F" : "#FF7A00"};
}


`;


export default Button;