import React, { useCallback, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators2 } from "../redux/modules/post";



const Paging = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const post_data = useSelector((state) => state.post.page);
    console.log(post_data)

    const setPage = useCallback((page) => {
        const params = parseInt(page) - 1;
        dispatch(actionCreators2.getPageDB(params))
        history.push(`/${params}`)
    }, []);



    return (
        <Box>
            <Pagination
                activePage={post_data?.nuumber}
                itemsCountPerPage={post_data?.size}
                totalItemsCount={post_data?.totalElements}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={setPage}
            />
        </Box>
    );
};

const Box = styled.div`
width: fit-content;
margin: auto;

.pagination {
    display: flex;
}

ul {
    list-style: none;
    padding: 0;

}

li { 
    margin: 0 8px;
    display: inline-block; 
    display: flex;

    width: 40px; 
    height: 40px; 

    justify-content: center; 
    align-items: center;

    border-radius: 30px;

    font-size: 2em;
    font-weight: 500; 

    transition: 0.2s;
    &:hover{
        font-size: 2.5em;
        font-weight: 800;
        a {
            color:#FF7A00;
        }
    }

li:first-child {
    border-radius: 20px;
}

li:last-child {
    border-radius: 20px;
}

a {
    text-decoration: none;
    color: #333;

}

`


export default Paging;
