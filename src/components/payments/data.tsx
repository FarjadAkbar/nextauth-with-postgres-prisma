'use cilent'
import React, { useEffect } from 'react'

export default function LoadData() {


    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/users");
            console.log(res,"res");
        }
        fetchData();
      }, []);
  
    return {

  }
}
