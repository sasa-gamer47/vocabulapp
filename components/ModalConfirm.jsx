import React from 'react'
import { useRouter } from 'next/router'

const ModalConfirm = ({ user }) => {

    const { pathname } = useRouter()
    const router = useRouter()

    const buttonStyle = 'p-2 px-6 rounded-lg text-white bg-black text-lg font-semibold duration-300 transition'

    return (
        <>
            <div className='fixed inset-0 bg-black opacity-60 z-50 flex items-center justify-center '></div>
            <div className='fixed inset-0 z-50 flex items-center justify-center '>
                <div className='dark:bg-gray-800 bg-white p-7 rounded-lg'>
                    <h4 className='dark:text-white'>Vuoi davvero confermare?</h4>
                    <div className='flex items-center justify-between mt-10'>
                        <button onClick={() => router.push({ pathname, query: { ...user, showModal: false},  })} className={`${buttonStyle} bg-red-500 hover:bg-red-600`}>No</button>
                        <button onClick={() => router.push({ pathname: '/login', query: { ...user, showModal: false, logout: true},  })} className={`${buttonStyle} bg-green-500 hover:bg-green-600`}>Si</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalConfirm