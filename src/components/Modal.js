import {EmailShareButton, TwitterShareButton, FacebookShareButton, EmailIcon, FacebookIcon, TwitterIcon} from 'react-share';
import { useRef, useEffect } from 'react';
import copyButton from '../images/copy-regular.svg';
import data from '../data';
import './Modal.css';

export default function Modal({url, setShowModal, handleCopy}) {
    let ref = useRef();

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowModal && setShowModal(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <div className="modal" ref={ref}>
            <button className="exit-button" onClick={()=>setShowModal(false)}></button>
            <div className="share-buttons">
                <EmailShareButton url={url} subject={data.email.subject} body={data.email.body}>
                    <EmailIcon borderRadius="20px" size="3rem"></EmailIcon>
                </EmailShareButton>
                <TwitterShareButton  url={url} title={data.twitter.title} hashtags={data.twitter.hashtags}>
                    <TwitterIcon borderRadius="20px" size="3rem"></TwitterIcon>
                </TwitterShareButton>
                <FacebookShareButton url={url} quote={data.facebook.quote} hashtag={data.facebook.hashtag}>
                    <FacebookIcon borderRadius="20px" size="3rem"></FacebookIcon>
                </FacebookShareButton>    
            </div>
            <div className="copy-link">
                <input className="url-box" type="url" value={url} readOnly/>
                <button className="copy-button" onClick={(e)=>handleCopy(e, url)}><img src={copyButton} alt="copy button"></img></button>
            </div>
        </div>
    )
}
