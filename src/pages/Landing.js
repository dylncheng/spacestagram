import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Post from "./Post";
import "./Landing.css";

const API_KEY = "invKHHuU68c3Q1qdnxXzOTSanASFBoMgiucVnAKa";
const img_arr = [1, 2, 3, 4, 5, 6, 7];


const Landing = () => {
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [linkCopied, setLinkCopied] = useState(false);
    const [i, setI] = useState(0);



    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`);
            const data = await res.json()
            setPhotos(data.photos)
            setIsLoading(false);
            console.log(data.photos)
        }

        fetchData();
        setI((prevI)=>prevI + 1)

    }, [setIsLoading, setI])

    return(
    <div className="landing">
        {/* {!isLoading && photos.map((photo) => {
            return(<Image photo={photo}/>);
        })}
        {isLoading && <Loading />} */}
        {isLoading  && <Loading/>}

        {!isLoading && <h1 className="logo"> Spacestagram</h1>}
        {linkCopied && <div className="copied-modal"><h3>copied to clipboard</h3></div>}
        <div className="posts">
            {!isLoading && i < 1000 && photos.map((photo, index) => <Post photo={photo.img_src} name={photo.rover.name} id={index} key={photo.id} date={photo.earth_date} camera={photo.camera.full_name} setLinkCopied={setLinkCopied} linkCopied={linkCopied}/>)}
        </div>
    </div>
    
    );
}

export default Landing;