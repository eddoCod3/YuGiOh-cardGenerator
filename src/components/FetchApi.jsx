import React from 'react'
import { useState } from 'react'
 const fetchApi = () => {

    const [data, setData] = useState([])

    const FetchData = async () => {
      const res = await fetch('https://coffee.alexflipnote.dev/random.json')
      const data = await res.json()
        console.log(data)
        setData(data)
    }
  return (
    <div>
        <button onClick={FetchData} >FetchData</button>
    </div>
  )
}


export default fetchApi;
