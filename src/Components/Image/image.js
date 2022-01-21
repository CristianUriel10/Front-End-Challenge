import React from 'react';
import { Image } from './image.styled';
import Swal from 'sweetalert2'

const Modal = (item) => {
    Swal.fire({
        text: item.breeds[0]?.description,
        imageUrl: item.url,
        imageHeight: 200,
        imageAlt: 'Cat image',
        showConfirmButton: false
      })
    
}

const ImageComponent = props => {
    return (
        <Image onClick={() => Modal(props.item)} url={props.item.url}/>
    )
}

export default ImageComponent