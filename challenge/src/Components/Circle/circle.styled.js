import styled from 'styled-components';

export const Circle = styled.div`
    background-image: url(${ ( props ) => (props.url ? props.url : null ) });
    background-size: cover;
    border: 2px solid rgb(249 115 22);
    background-color: white;
    height: 100px;
    width: 100px;
    border-radius: 50%;
`