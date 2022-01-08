import './Loading.css'
import AsyncImage from '../components/AsyncImage';
import { useEffect, useState } from 'react';

const colors = ["ddbea9", "ffe8d6", "b7b7a4"]

const Loading = () => {
    const [dots, setDots] = useState(0);
    useEffect(() => {
        if(dots < 4) {
            let timer = setTimeout(()=>{
                setDots((prevDots) => prevDots + 1);
            },200)
            
            return () => clearInterval(timer)
        }
        setDots(0)
    },[dots])
    return(
        <div className="loading">
            {/* <AsyncImage src="/images/stars.jpg" /> */}
            <h1>Loading</h1><span className="dots"><h1>{dots>=1?".":""}{dots>=2?".":""}{dots>=3?".":""}</h1></span>
            {/* <img className="stars" src="/images/stars.jpg"></img> */}
        </div>
    );
}

export default Loading;