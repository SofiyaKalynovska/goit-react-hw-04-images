import PropTypes from 'prop-types';
import { LoadBtn } from './LoadMore.styled';

export const LoadMoreBtn = ({ onClick, isSubmitting }) => {
  return (
    <LoadBtn type="button" onClick={onClick} >
      Load more
    </LoadBtn>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}