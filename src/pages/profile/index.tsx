import React from 'react'
import useAuth from '../../hooks/useAuth'

function Profile() {
  const {user} = useAuth()

  return (
    <div>
      Profile
      <p>{user?.email}</p>
    </div>
  )
}

export default Profile 