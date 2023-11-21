import { useRouter } from "next/router";

const PostSinglePage = ({
  params,
  searchQuery,
}: {
  params: {
    postId: string;
  };
  searchQuery: {
    q: string;
  };
}) => {
  return (
    <div>
      <h1>Post Single Page {params.postId}</h1>
    </div>
  );
};

export default PostSinglePage;
