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
  const post_list = useSelector((state) => state.post.list?.content);
  const pageNum = useSelector((state) => state.post.list?.totalPages);
  const itemPerPage = useSelector((state) => state.post.list.size);
  const totalElementsNum = useSelector(
    (state) => state.post?.list?.totalElements
  );
  console.log(totalElementsNum);
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    history.push(`/${page}`);
  };
  React.useEffect(() => {
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
                <div>
                  <span>
                    {p.nickName}/{p.position}
                  </span>
                  {p.completed ? (
                    <Button color="light">모집완료</Button>
                  ) : (
                    <Button>모집중</Button>
                  )}
                </div>
                <div>
                  <span>{p.createdAt}</span>
                </div>
              </div>
            </Postbox>
          );
        })}
        <Grid>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemPerPage}
            totalItemsCount={totalElementsNum}
            pageRangeDisplayed={pageNum}
            onChange={handlePageChange}
          />
        </Grid>
        <Addbutton
          onClick={() => {
            history.push("/write");
          }}
        >
          <div>+</div>
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
              <div>
                <span>
                  {p.nickName}/{p.position}
                </span>
                {p.completed ? (
                  <Button color="light">모집완료</Button>
                ) : (
                  <Button>모집중</Button>
                )}
              </div>
              <div>
                <span>{p.createdAt}</span>
              </div>
            </div>
          </Postbox>
        );
      })}
      <Grid>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={totalElementsNum}
          pageRangeDisplayed={pageNum}
          onChange={handlePageChange}
        />
      </Grid>
    </Container>
  );
};

const Grid = styled.div`
  width: fit-content;
  margin: auto;
`;

const Container = styled.div`
  width: 80%;
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
    &:hover {
      font-size: 2.5em;
      font-weight: 800;
      a {
        color: #ff7a00;
      }
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
`;
const Postbox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  padding: 25px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 2px gray;
  transition: 0.5s;
  &:hover {
    box-shadow: 5px 5px 5px 5px gray;
  }
  div {
    &:first-child {
      display: flex;
      flex-direction: column;

      p {
        font-size: 30px;
        margin-top: -5px;
        margin-bottom: 20px;
      }
      span {
        margin-top: -10px;
      }
    }
    &:nth-child(2) {
      div {
        &:first-child {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          span {
            padding-top: 11px;
          }
          button {
            width: 130px;
            border-radius: 9999px;
            font-size: 30px;
          }
        }
        &:last-child {
          font-size: 15px;
          text-align: end;
        }
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
  right: 50px;
  cursor: pointer;
  text-align: center;
  div {
    margin-top: -8px;
    font-size: 60px;
  }
`;

export default Mainpage;
