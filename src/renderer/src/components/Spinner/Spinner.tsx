'use client';

import { Spinner } from '@nextui-org/react'
import React from 'react'

const SpinnerComponent = () => {
    return (
        <div className='h-8'>
            <Spinner color="current" className='h-8 w-8' />
        </div>
    )
}

export default SpinnerComponent