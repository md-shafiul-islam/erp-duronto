import React from 'react'
import B2CUserList from './B2CUserList';

const B2CUpdateApproveUsers = (params) =>{
    return (
        <React.Fragment>
            <B2CUserList status={2} />
        </React.Fragment>
    )
}

export default  B2CUpdateApproveUsers;