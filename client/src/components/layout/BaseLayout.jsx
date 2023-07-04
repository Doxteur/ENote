import React from 'react'
import SideBar from '../SideBar/SideBar'

function BaseLayout(children) {
  return (
    <div>
        <SideBar />
        {children}
        </div>
  )
}

export default BaseLayout