import React from 'react';
import { Circle } from './circle.styled';

const CircleComponent = props => {
    return (
        <Circle url={props.item.url}/>
    )
}

export default CircleComponent