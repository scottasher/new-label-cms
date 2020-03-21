import React from 'react';
import './image.less'
export default function CardImage(props) {
    return (
        <div class="img-container">
            <div class="card-img">
                <div class="face face1">
                    <div class="content-card-img">
                        <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true"/>
                        <h3>Design</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content-card-img">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                            <a href="#">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    )
}