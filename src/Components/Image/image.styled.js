import styled from 'styled-components';

export const Image = styled.div`
    background-image: url(${ ( props ) => (props.url ? props.url : null ) });
    background-size: cover;
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
`