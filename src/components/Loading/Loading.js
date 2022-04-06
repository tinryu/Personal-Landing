import React, {useState, useEffect, useRef } from 'react';
import './Loading.css';

function Loading(props) {
    const [isLoading, setIsLoading] = useState(props.isLoad);
    const prevProps = usePrevious(props.isLoad);
    useEffect(() => {
        function handleStatus(status) {
            setIsLoading(status);
        }
        if( prevProps !== isLoading){
            handleStatus(prevProps);
        }
    });

    return (
        <div id="Loading" className={isLoading ? '' : 'hide'}>
            <img src={ process.env.PUBLIC_URL + "assets/icon/noel/santa.svg"} alt="" id="santa"/>
            <img src={ process.env.PUBLIC_URL + "assets/icon/noel/bell.svg"} alt="" id="bell"/>
            <img src={ process.env.PUBLIC_URL + "assets/icon/noel/reindeer.svg"} alt="" id="reindeer"/>
        </div>
    )
}

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


export default Loading;