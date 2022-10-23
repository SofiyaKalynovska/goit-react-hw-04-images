// import PropTypes from 'prop-types';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/SearchIcon.svg';

export const SearchBar = ({ handleSubmit, isSubmitting }) => {
  return(
  <Searchbar>
    <SearchForm onSubmit={handleSubmit} isSubmitting={isSubmitting}>
        <SearchFormBtn type="submit">
          <SearchIcon />
        <SearchFormBtnLabel>Search</SearchFormBtnLabel>
      </SearchFormBtn>
      <SearchFormInput
        type="text"
        autocomplete="off"
        autoFocus
        name="search"
        placeholder="Search images and photos"
      />
    </SearchForm>
    </Searchbar>
  )
}

// SearchBar.propTypes = {
//   handleSubmit: PropTypes.func.isRequired
// }