import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  state = {
    largeImageURL: '',
  };
  componentDidMount() {
    const { allPhotos, shownBigImgId } = this.props;
    const modalImg = allPhotos.find(
      ({id}) => id === shownBigImgId);
      this.setState({ largeImageURL: modalImg.largeImageURL });
    
  }
  render() {
    return createPortal(
      <Overlay onClick={this.props.onClick}>
        <ModalBox>
          <img src={this.state.largeImageURL} alt="yoursearch" />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
