import { LoadBtn } from "./LoadMore.styled"

export const LoadMoreBtn = ({onClick, isSubmitting}) => {
  return (
    <LoadBtn type='button' onClick={onClick} disabled={isSubmitting} />
  )
}