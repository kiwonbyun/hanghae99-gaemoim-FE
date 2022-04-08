// response.js
export const RESP = {
  POSTGET: [
    {
      postId: 4,
      title: "제목4",
      nickName: "니노막시무스",
      frontNum: 2,
      backNum: 3,
      completed: false,
    },
    {
      postId: 3,
      title: "제목3",
      nickName: "카이저쏘제",
      frontNum: 2,
      backNum: 4,
      completed: true,
    },
  ],

  POSTPOST: [
    {
      result: "success",
    },
  ],

  POSTPOSTIDGET: [
    {
      postId: 1,
      title: "제목1",
      nickName: "니노막시무스",
      frontNum: 2,
      backNum: 3,
      completed: false,
      post_content: "프로젝트 같이 할 분 모집합니다!",
    },
  ],

  COMMENTSPOSTIDGET: [
    {
      postId: 1,
      userId: "1",
      nickName: "test1",
      commentId: 1,
      comment_content: "저요저요! 댓글내용1",
    },
    {
      postId: 1,
      userId: "2",
      nickName: "test2",
      commentId: 2,
      comment_content: "저요저요! 댓글내용2",
    },
  ],
  COMMENTSPOSTIDPOST: [
    {
      result: "success",
    },
  ],

  COMMENTSIDGET: [
    {
      postId: 1,
      userId: "1",
      nickName: "test1",
      commentId: 1,
      comment_content: "저요저요! 댓글내용1",
    },
  ],

  COMMENTSIDPUT: [
    {
      result: "success",
    },
  ],

  COMMENTSIDDELETE: [
    {
      result: "success",
    },
  ],

  REGISTERPOST: {
    result: "success",
  },

  LOGINPOST: {
    result: "success",
    token: "token",
    userId: "bkw9603",
    nickName: "카이저쏘제",
    position: "프론트엔드",
  },

  IDCHECKPOST: [
    {
      result: false,
    },
  ],

  ISLOGINGET: {
    nickName: "카이저쏘제",
    userId: "bkw9603",
    position: "프론트엔드",
  },
};
