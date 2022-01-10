import { useState, useEffect } from 'react';
import shareButton from '../images/share-square-solid.svg'
import Modal from '../components/Modal';
import './Post.css'

const Post = ({photo, name, id, date, camera, setLinkCopied, linkCopied}) => {
    const [clicked, setClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleLike = (e) => {
        e.preventDefault();
        
        setClicked((prevClicked) => prevClicked===true?false:true);
    }

    const handleCopy = (e, link) => {
        e.preventDefault();
        navigator.clipboard.writeText(link);
        setLinkCopied(true);
    }

    const handleModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    useEffect(() =>  {
        if(linkCopied) {
            let timer = setTimeout(() => {
                setLinkCopied(false);
            }, 2000)

            return () => clearInterval(timer)
        }
    })

    return( 
        <>
            {showModal && <Modal url={photo} setShowModal={setShowModal} showModal={showModal} handleCopy={handleCopy}></Modal>}
            <div className="post" style={{margin_top:id===0?"1rem":"5rem"}}>
                <h2><strong className="rover-name">{name}  Rover</strong> - {camera}</h2>
                <img src={photo} alt={`${name} Rover ${camera} Mars`}></img>
                <p>{date}</p>
                <button href="" onClick={handleLike} style={{box_shadow: clicked?"0.15rem 0.15rem grey":"", background:clicked?"grey":"#000"}}>{clicked?"LIKED":"LIKE"}</button>
                <a 
                    className="copy-icon" 
                    href="" 
                    onClick={handleModal} 
                >
                    <img className="copy-image" src={shareButton} alt="copy button"></img>
                </a>
            </div> 
        </>
        
    );
}

export default Post;