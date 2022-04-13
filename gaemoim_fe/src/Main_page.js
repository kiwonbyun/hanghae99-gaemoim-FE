import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "./elements/Button";
import { useHistory, useParams } from "react-router-dom";
import post, { actionCreators2 } from "./redux/modules/post";
import Pagination from "react-js-pagination";

const Mainpage = (props) => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.pagelist?.content);
  const pageNum = useSelector((state) => state.post.pagelist?.totalPages);
  const totalElementsNum = useSelector(
    (state) => state.post?.pagelist?.totalElements
  );

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    history.push(`/${page}`);
  };
  React.useEffect(() => {
    console.log(params.id);
    dispatch(actionCreators2.getPostpageDB(params.id));
  }, [params.id]);

  if (is_login) {
    return (
      <Container>
        {post_list?.map((p, idx) => {
          return (
            <Postbox
              key={p.postId}
              onClick={() => {
                history.push(`/detail/${p.postId}`);
              }}
            >
              <div>
                <p>{p.title}</p>
                <span>
                  프론트엔드 {p.frontNum} | 백엔드 {p.backNum}
                </span>
              </div>
              <div>
                <span>{p.nickName}</span>
                {p.completed ? (
                  <Button color="light">모집완료</Button>
                ) : (
                  <Button>모집중</Button>
                )}
              </div>
            </Postbox>
          );
        })}
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={totalElementsNum}
          pageRangeDisplayed={pageNum}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
        <Addbutton
          onClick={() => {
            history.push("/write");
          }}
        >
          글쓰기
        </Addbutton>
      </Container>
    );
  }
  return (
    <Container>
      {post_list?.map((p, idx) => {
        return (
          <Postbox
            key={p.postId}
            onClick={() => {
              history.push(`/detail/${p.postId}`);
            }}
          >
            <div>
              <p>{p.title}</p>
              <span>
                프론트엔드 {p.frontNum} | 백엔드 {p.backNum}
              </span>
            </div>
            <div>
              <span>{p.nickName}</span>
              {p.completed ? (
                <Button color="light">모집완료</Button>
              ) : (
                <Button>모집중</Button>
              )}
            </div>
          </Postbox>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Postbox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 2px solid #e6d5b8;
  margin-bottom: 20px;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 25px;
        margin-top: -5px;
      }
      span {
        margin-top: -10px;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
      button {
        margin-top: 10px;
        font-size: 15px;
        width: 70px;
        height: 25px;
      }
    }
  }
`;
const Addbutton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: none;
  color: white;
  background-color: #e45826;
  position: fixed;
  bottom: 70px;
  right: 70px;
  cursor: pointer;
`;

export default Mainpage;
