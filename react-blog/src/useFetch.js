import { useState, useEffect } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    //console.log(res);
                    if(!res.ok){
                        throw Error('Could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    setError(null);
                    setData(data);
                    setIsPending(false);
                })
                .catch(err => {
                    // console.log(err.message);
                    if(err.name === 'AbortError'){
                        console.log('Fetch Aborted!');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    };                  
                })
        }, 100);

    return () => abortCont.abort();

    }, [url]);

    return { data, isPending, error }

}

export default useFetch;