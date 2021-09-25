import React from 'react'
import B2BUserList from './B2BUserList';

const B2BUserReject = (params) =>{
    return (
        <React.Fragment>
            <B2BUserList status={3} users={[]} />
        </React.Fragment>
    )
}

export default B2BUserReject;