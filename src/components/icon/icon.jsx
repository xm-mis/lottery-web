import React from 'react';

const Icon = ({
    name = 'home', size = 16, fill="#000000", className, opacity = 1, onClick = () => {}
}) => (
    <svg width={size} height={size} fill={fill} className={className} style={{opacity}} onClick={onClick}>
        <use xlinkHref={`#${name}`} />
    </svg>
)

export default Icon