import React, { useEffect, useState } from 'react'

const useWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const handleWidth=()=>{
        setWidth(window.innerWidth)
    }
    useEffect(()=>{ 
        window.addEventListener('resize',handleWidth);
        return(()=>{
            window.removeEventListener('resize',handleWidth);
        })
    },[]);
  return width
}

export default useWidth