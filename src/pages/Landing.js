import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Post from "./Post";
import "./Landing.css";

const API_KEY = "invKHHuU68c3Q1qdnxXzOTSanASFBoMgiucVnAKa";


const Landing = () => {
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [linkCopied, setLinkCopied] = useState(false);
    const [i, setI] = useState(0);



    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            let d = new Date()
            let startDay = (d.getDate() - 30) < 0 ? 30 + (d.getDate() - 30) + 1 : d.getDate() - 30
            let startMonth = (d.getDate() - 30) < 0 ? d.getMonth() : d.getMonth() + 1
            let startYear = startMonth === 0 ? d.getFullYear() - 1 : d.getFullYear()
            let startDate = `${startYear}-${startMonth===0?12:startMonth}-${startDay}`
            // console.log(startDate)
            const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`);
            // const res = await fetch(`https://api.nasa.gov/planetary/apod?start_date=${startDate}&api_key=${API_KEY}`);
            const data = await res.json()
            setPhotos(data.photos);
            // setPhotos(data);
            setIsLoading(false);
        
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
            {/* {!isLoading && i < 1000 && photos.map((photo, index) => <Post photo={photo.url} name={photo.title} id={index} key={index} date={photo.date} description={photo.explanation} setLinkCopied={setLinkCopied} linkCopied={linkCopied}/>)} */}

        </div>
    </div>
    
    );
}

export default Landing;