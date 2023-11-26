import { IPost } from "@/types";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  post: IPost;
  handleDelete: (id: number) => void;
};

const PostCard = ({ post, handleDelete }: Props) => {
  const router = useRouter();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/posts/${post.id}`)}>
          Voir plus
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => {
            handleDelete(post.id as number);
          }}
        >
          Supprimer
        </Button>
        <Button size="small" color="warning">
          Modifier
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
