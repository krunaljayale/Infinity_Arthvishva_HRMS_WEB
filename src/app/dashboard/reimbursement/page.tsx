import Image from 'next/image'
import React from 'react'

function ReimbursementPage() {
    return (
        <div className='flex justify-center items-center h-screen flex flex-col'>
            <Image src="/images/animation-gif.gif" alt="Work in progrees" width={500} height={500} unoptimized />
            <h2 className='text-3xl font-bold text-primary dark:text-white'>Work in progrees</h2>
        </div>
    )
}

export default ReimbursementPage