import React from 'react'
import B2BUserList from './B2BUserList';

 const B2BPendingUsers = (params)=> {
    return (
        <React.Fragment>

            <B2BUserList status={-1} users={[]} />

        </React.Fragment>
    )
}

export default B2BPendingUsers;
