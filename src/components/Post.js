import { useState, useEffect} from 'react';
import shareButton from '../images/share-square-solid.svg';
import Modal from './Modal';
import heartOutline from '../images/heart-regular.svg';
import heartSolid from '../images/heart-solid.svg';
import './Post.css';
import styles from './Post.module.css';


const Post = ({photo, name, id, date, camera, setLinkCopied, linkCopied}) => {
    const [clicked, setClicked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleLike = (e) => {
        e.preventDefault();
        
        setClicked((prevClicked) => prevClicked===true?false:true);
        if(!showHeart)
            setShowHeart(true);
    };

    const handleCopy = (e, link) => {
        e.preventDefault();
        navigator.clipboard.writeText(link);
        setLinkCopied(true);
    };

    const handleModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    useEffect(() =>  {
        if(linkCopied) {
            let timer = setTimeout(() => {
                setLinkCopied(false);
            }, 2000);

            return () => clearInterval(timer);
        }
    });

    useEffect(() => {
        if(clicked) {
            let timer = setTimeout(() => {
                setShowHeart(false);
            }, 700);

            return () => clearInterval(timer);
        }

    });

    return( 
        <>
            {showModal && <Modal url={photo} setShowModal={setShowModal} showModal={showModal} handleCopy={handleCopy}></Modal>}
            <div className="post" style={{margin_top:id===0?"1rem":"5rem"}}>
                <h2><strong className="rover-name">{name}  Rover</strong> - {camera}</h2>
                <div className={styles["image-container"]}>
                    {showHeart && clicked && <img className={styles["heart-large"]} src={heartSolid}></img>}
                    <img className="post-img" src={photo} loading="lazy" onDoubleClick={handleLike} alt={`${name} Rover ${camera} Mars`}></img>
                </div>
                <p>{date}</p>
                <button href="" onClick={handleLike} style={{boxShadow: clicked?"0.17rem 0.17rem rgb(65, 64, 64) inset":"0.125rem 0.125rem grey", backgroundColor:clicked?"grey":"#000"}}>{clicked?<img className="heart-img" src={heartSolid}></img>:<img className="heart-img" src={heartOutline}></img>}</button>

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




//ALTERNATE LIKE BUTTON
/* <button href="" onClick={handleLike} style={{boxShadow: clicked?"0.17rem 0.15rem black inset":"0.125rem 0.125rem rgb(65, 64, 64)", backgroundColor:clicked?"grey":"#000"}}>{clicked?"LIKED":"LIKE"}</button> */
