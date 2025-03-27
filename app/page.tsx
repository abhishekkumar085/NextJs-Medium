"use client"
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter()
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user])
  return (
    <div className=' bg-[#f7f4ed]'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

export default page
