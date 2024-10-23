import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Paginate = ({ page, numberOfPages }) => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}  // Ensure this value comes from backend
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
