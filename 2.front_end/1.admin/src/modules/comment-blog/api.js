import fetchAxios from "../../configs/axios";

async function fetchCommentBlogsGets(payload) {
  return await fetchAxios({
    method: "get",
    url: "/comment-blog?idBlog=" + payload.idBlog,
  });
}



async function fetchCommentBlogsRemove(payload) {
  return await fetchAxios({
    method: "delete",
    url: "/comment-blog/" + payload.id,
  });
}

export { fetchCommentBlogsRemove, fetchCommentBlogsGets };
