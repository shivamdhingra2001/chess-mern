import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ReAuthRoute({ children }) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/v1/users/checkauth", { withCredentials: true })
            .then(res => {
                navigate('/home')
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setLoading(false)
                } else {
                    console.log(err)
                }
            })
    }, [navigate])

    if (loading)
        return (
            <div className='flex flex-col bg-background items-center justify-center w-full h-full'>
                <span className='text-4xl font-semibold text-copy'>Loading...</span>
            </div>
        )

    return (
        children
    )
}

export default ReAuthRoute