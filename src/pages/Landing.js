import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Post from "../components/Post";
import "./Landing.css";
import Contact from "../components/Contact";

/*API KEY NOT INCLUDED IN REPO*/
const API_KEY = "Je7NMXeDDyeMHqkZkI7XmiRHgcGjFiHUFwy0PYVf";


const Landing = () => {
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [linkCopied, setLinkCopied] = useState(false);
    const [maxPhotos, setMaxPhotos] = useState(10);

    const handleShowMore = () => {
        setMaxPhotos((prevMaxPhotos) => prevMaxPhotos + 10);
    };

    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            let num = Math.floor(Math.random() * 1000);
            const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${num}&api_key=${API_KEY}`);
            const data = await res.json();
            
            if(data.photos.length === 0) {
                fetchData();  //recursive 
            } else {
                setPhotos(data.photos);
                setIsLoading(false);
            }

            // alternative 
            // setIsLoading(false); 
        
        }
        fetchData();

    }, [setIsLoading]);

    return(
        <div className="landing">
            {isLoading  && <Loading/>}
            {!isLoading && <h1 className="logo"> Spacestagram</h1>}
            {linkCopied && <div className="copied-modal"><h3>copied to clipboard</h3></div>}
            <div className="posts">
                {!isLoading && photos.map((photo, index) => index < maxPhotos?<Post photo={photo.img_src} name={photo.rover.name} id={index} key={photo.id} date={photo.earth_date} camera={photo.camera.full_name} setLinkCopied={setLinkCopied} linkCopied={linkCopied}/>:null)}
            </div>
            {!isLoading && !(maxPhotos >= photos.length) && <button className="show-more-btn" onClick={handleShowMore}>show more</button>}
            {!isLoading && <Contact />}
        </div>
    );
}

export default Landing;

