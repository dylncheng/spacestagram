import { useState, useEffect } from 'react';
import './Post.css'

const Post = ({photo, name, id, date, camera, setLinkCopied, linkCopied}) => {
    const [clicked, setClicked] = useState(false);
    // useEffect(()=>console.log(id),[id])
    const handleLike = (e) => {
        e.preventDefault();
        
        setClicked((prevClicked) => prevClicked===true?false:true);
        console.log(photo);
    }

    const handleCopy = (e, link) => {
        e.preventDefault();
        navigator.clipboard.writeText(link);
        setLinkCopied(true);
    }

    useEffect(() =>  {
        if(linkCopied) {
            let timer = setTimeout(() => {
                setLinkCopied(false);
            }, 2500)

            return () => clearInterval(timer)
        }
    })

    return( 
        <div className="post" style={{margin_top:id===0?"1rem":"5rem"}}>
            <h2><strong className="rover-name">{name}  Rover</strong> - {camera}</h2>
            <img src={photo} alt={`${name} Rover ${camera} Mars`}></img>
            <p>{date}</p>
            <button href="" onClick={handleLike} style={{box_shadow: clicked?"0.15rem 0.15rem grey":"", background:clicked?"grey":"#000"}}>{clicked?"LIKED":"LIKE"}</button>
            <a className="copy-icon" href="" onClick={(e) => handleCopy(e, photo)}><img className="copy-image" src="./images/copy-regular.svg"></img></a>
        </div>
    );
}

export default Post;