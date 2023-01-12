import { useEffect, useState , useRef} from "react";
import {useLocation} from 'react-router-dom'



const usePexels = (pageNum = 1, getPexelPics) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState({});
  const [nextPage,setNextPage] = useState(true);
  let keyword;
  const {pathname} = useLocation();
  if(pathname !== '/'){
    keyword = pathname.slice(8)
  }

  useEffect(()=>{
    setLoading(true);
    setError(false);
    const controller = new AbortController();
    const {signal} = controller;
    getPexelPics(pageNum,{signal},keyword).then(res=>{
        setLoading(false);

        setResult(prev=>[...prev,...res.photos])
        setNextPage(Boolean(res.photos.length))
    }).catch(e=>{
        setLoading(false)
        if (signal.aborted) return
        setError(true);
        setErrMessage({msg : e})
    })
    return () => controller.abort()
  },[pageNum])
  return {loading,result ,errMessage,error,nextPage}
};

export default usePexels;
