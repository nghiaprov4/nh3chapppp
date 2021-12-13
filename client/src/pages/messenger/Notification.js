import React from 'react'
import './notification.css'

export const showErrMsg = (msg) => {
    return <div className="errMsg">{msg}Không tìm thấy</div>
}

export const showSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}Không tìm thấy</div>
}