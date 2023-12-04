import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminCard from '../../components/others/AdminCard'

const Admin = () => {
  const [data, setData] = useState()

  const handleClick = () => {
    try {
      axios.post("/.netlify/functions/allUsers", {token: data.token}).then((response) => {
        setData(response.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      try {
        axios.post("/.netlify/functions/allUsers", {data}).then((response) => {
          setData(response.data)
        })
      } catch (error) {
        console.log(error);
      }
    },[])

  return (
    <div>
      {data && data.users.map((item, index) => {
        if (item.email !== process.env.REACT_APP_ADMIN_EMAIL) {
          return (
            <div key={index}>
              {item.email}
              {process.env.REACT_APP_ADMIN_EMAIL}
              <AdminCard uid={item.uid} />
            </div>
          )
        }
      })}
      <button onClick={handleClick}>Proxima pagina</button>
    </div>
  )
}

export default Admin