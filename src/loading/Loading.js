import './Loading.css'
import { useEffect, useState } from 'react';

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
            <h1>Loading</h1><span className="dots"><h1>{dots>=1?".":""}{dots>=2?".":""}{dots>=3?".":""}</h1></span>
        </div>
    );
}

export default Loading;