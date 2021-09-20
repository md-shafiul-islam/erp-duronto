import React, {useEffect, useState} from "react";
import ActionLink from "../../../utils/ActionLink";
import { helperIsEmpty } from "../../../utils/helper/esFunc";

const WalletWithdrawItem = (params) => {

    const [accountNo, setAccountNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");

    console.log("WalletWithdrawItem params ", params);
    const {publicId, genId, withdrawType, customer, amount, withDrawBankDetails, withDrawMobilBanking, date} = params.withdarw;

    useEffect(() => {
        
        if(!helperIsEmpty(withDrawBankDetails)){
            setAccountNo(withDrawBankDetails.bankAccountNumber);
            setBankName(withDrawBankDetails.bankName);
            setBranchName(withDrawBankDetails.branchName);
        }else if(!helperIsEmpty(withDrawMobilBanking)){
            setAccountNo(withDrawMobilBanking.mobilBankPhoneNo);            
            setBankName(withDrawBankDetails.mobileBankName);
            setBranchName("--");
        }

        
       
    }, [amount])
  return (
    <React.Fragment>
      <tr>
        <td style={{ width: 10 }}>#</td>
        <td>{date}</td>
        <td>{customer&&customer.firstName}</td>
        <td>{amount}</td>
        <td>{customer&&customer.walletAmount}</td>        
        <td>{withdrawType&&withdrawType.name}</td>
        <td>{bankName}</td>
        <td>{branchName}</td>
        <td>{accountNo}</td>
        <td>
          <ActionLink 
          to={`/walletwithdraw/${publicId}`}
          label="Details"
          clazz="btn btn-block btn-primary btn-sm"
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default WalletWithdrawItem;
