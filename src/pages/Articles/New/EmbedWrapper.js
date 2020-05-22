import React from 'react';
import parse from 'html-react-parser';

export default (props) => {
    const { block, contentState } = props.children[0].props.children.props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();

    if(data.src.charAt(0) === '<') {
        console.log('EMBED WRAPPER', data)
        return parse(data.src)
    } 

    if(data.src.includes("/embed")) {
        console.log("[INCLUDES]", data.src)
        return (
            <iframe 
                src={data.src}
                {...data}
                frameBorder="0" 
                allowtransparency="true"
                allow="encrypted-media"
            />
        )
    }
    const str = data.src;
    const pos = str.indexOf("track");
    const qpos = str.indexOf("?");
    const url = str.slice(0, pos -1) 
    const id = str.slice(pos -1, qpos);
    data.src = url + "/embed" + id;
    return (
        <iframe 
            src={data.src}
            {...data}
            frameBorder="0" 
            allowTransparency="true"
            allow="encrypted-media"
        />
    )
}

// https://open.spotify.com/track/0XIiLlnFhTmYQozPx7TW9k?si=Xf0sTZwpTw6ytF_Mw0umOQ