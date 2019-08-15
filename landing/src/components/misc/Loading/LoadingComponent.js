import React from 'react'
import styles from './LoadingComponent.module.css'

import LoadingIcon from './LoadingIcon/LoadingIcon'



export default function LoadingComponent() {




    return (
        <div
            className={`${styles.wrapper}`}
        >
            <LoadingIcon />
        </div>
    )
}
