// response.js
export const RESP = {
  POSTGET: [
    {
      postId: 4,
      title: "이것은 서버에서 오는 데이터입니다.",
      nickName: "멋진닉네임",
      frontNum: 2,
      backNum: 3,
      completed: false,
    },
    {
      postId: 3,
      title: "서버 이어지면 바뀔 데이터",
      nickName: "카이저쏘제",
      frontNum: 2,
      backNum: 4,
      completed: true,
    },
  ],

  POSTPOST: {
    result: true,
  },

  POSTPOSTIDGET: {
    postId: 4,
    title: "이것은 서버에서 오는 데이터입니다.",
    nickName: "카이저쏘제",
    frontNum: 2,
    backNum: 3,
    completed: false,
    post_content: "프로젝트 같이 하실분 모집합니다!",
  },
  POSTPOSTIDDELETE: {
    result: true,
  },
  POSTPOSTIDPPUT: {
    result: true,
  },

  COMMENTSPOSTIDGET: [
    {
      postId: 4,
      username: "bkw9604",
      nickName: "항해99",
      commentId: 1,
      comment_content: "저요저요! 4번게시물 댓글내용1",
    },
    {
      postId: 4,
      username: "bkw9603",
      nickName: "항해100",
      commentId: 2,
      comment_content: "저요저요! 4번게시물 댓글내용2",
    },
    {
      postId: 3,
      username: "bkw9604",
      nickName: "항해101",
      commentId: 3,
      comment_content: "저요저요! 3번게시물 댓글내용1",
    },
  ],
  COMMENTSPOSTIDPOST: {
    result: true,
  },

  COMMENTSIDGET: {
    postId: 1,
    username: "1",
    nickName: "test1",
    commentId: 1,
    comment_content: "저요저요! 댓글내용1",
  },

  COMMENTSIDPUT: {
    result: true,
  },

  COMMENTSIDDELETE: {
    result: true,
  },

  REGISTERPOST: {
    result: true,
  },

  LOGINPOST: {
    token: "token",
  },

  IDCHECKPOST: {
    result: true,
  },

  ISLOGINGET: {
    nickName: "카이저쏘제",
    username: "bkw9604",
    position: "프론트엔드",
  },
  FRONTPOSTIDPOST: {
    bool: true,
    frontCnt: 1,
  },
  BACKPOSTIDPOST: {
    bool: true,
    backCnt: 1,
  },
};
