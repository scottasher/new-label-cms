import React from 'react';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import './index.less'
import CardMeta from './CardMeta';
import CardImage from './CardImage'

function renderImg(image) {
    let img = image;
    if(typeof(image) === 'string') {
      img = JSON.parse(image)
    }
    if(!img) {
      return <Spin />
    } else {
      return <img className='article-front-img' src={img.path} alt="article-front-img" />
      // return <img src='https://media.pitchfork.com/photos/5cf05abf2a3b7be897fcc2f4/2:1/w_790/Beastie-Boys.jpg' alt="article-front-img" />
    }
}

function renderUser(author) {
    let auth = author;
    if(typeof(author) === 'string') {
      auth = JSON.parse(author)
    }
    if(!auth) {
      return <span><h5 style={{ display: 'inline', marginRight: '5px' }}>BY: </h5>Unknown Author</span>
    } else {
      return <span><h5 style={{ display: 'inline', marginRight: '5px' }}>BY: </h5>{auth.name}</span>
    }
}


function ArticleCard(props) {
    const { title, createdAt, author, category, image, id } = props.article;
    const formatedPostDate = formatDistance(
        new Date(createdAt),
        new Date(),
        { addSuffix: true }
    );
    const placeholderImage = <span className='article-img-container'>{renderImg(image)}</span>;
    const cardTitle = <h2>{title}</h2>
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
    const footer = (
      <div style={{ display: 'grid' }}>
        {renderUser(author)}
        <h5>{formattedCategory} / {formatedPostDate} ago</h5>
      </div>
    );

    return (
        <div className="site-card">
            <div>
                {/* <CardImage /> */}
                <img className='article-front-img' src='https://media.pitchfork.com/photos/5cf05abf2a3b7be897fcc2f4/2:1/w_790/Beastie-Boys.jpg' alt="article-front-img" />
            </div>
            <CardMeta 
                title={cardTitle}
                description={footer}
            />
        </div>
    )
}

export default ArticleCard;
