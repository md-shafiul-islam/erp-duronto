import React from 'react'
import { Link } from 'react-router-dom'

const ActionLink = (params)=> {
    return (
        <React.Fragment>
            <Link to={params.to} className={params.clazz}>
                {params.label}
            </Link>
        </React.Fragment>
    )
}

export default ActionLink;