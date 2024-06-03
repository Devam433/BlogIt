import dbService from "../appwrite/dbConfig"
import { addPosts, setError, setLoading } from "../features/postSlice";
const fetchPost = () => async dispatch => {
    dispatch(setLoading(true));
    try {
      const posts = await dbService.getPosts();
      dispatch(addPosts(posts.documents));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
export default fetchPost