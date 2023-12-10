import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPosts,
} from "./postsSlice";

import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);
  const dispatch = useDispatch();

  let content;

  if (postStatus === "loading") {
    content = <p>"Loading... "</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [dispatch, postStatus]);

  return <section>{content}</section>;
};
export default PostsList;
