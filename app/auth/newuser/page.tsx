
"use client"
import React from 'react'
import {signIn}  from "next-auth/react"

function page() {
  return (
    <div>
      <button onClick={async ()=>{
       await signIn('signIn',{
          email: "a@23.com",
          password:"123445",
        })
      }}> click here</button>
    </div>
  )
}

export default page