import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { totalPages } = useSelector((state: any) => state?.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(Number(page)));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      count={totalPages}
      color="secondary"
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        );
      }}
    />
  );
};

export default Paginate;
