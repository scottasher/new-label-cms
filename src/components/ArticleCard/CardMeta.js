import React from 'react';

export default function CardMeta(props) {
    console.log(props)
    return (
        <div className="meta">
            {props.title}
            {props.description}
        </div>
    )
}