import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Home() {
  const { user } = useAuthContext()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/data', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json()
        setUserData(json.user)
      } catch (error) {
        console.log({error: error.message})
      }

      }

      if (user) {
        fetchUser()
    }
  },[user])

  return (
    <div>
      {userData && (
        <p>Welcome, {userData.name}</p>
      )}
    </div>
  )
}
