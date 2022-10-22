import { useContext, useState } from "react"
import { LoadingContext } from "../../contexts/loading.context"
import { WalletContext } from "../../contexts/wallet.context"

import './index.css'

export const WalletInformations = () =>{
    const [hideAddress, setHideAddress] = useState(false)
    const [addres, amount] = useContext(WalletContext)

    return (
        <LoadingContext.Provider value={true}>
            <div className="wallet-content">
                <h1 className="wallet-header"> <div className='special'> Etherum </div> wallet </h1>
                <div className="info">
                    <div className="address" onClick={() => setHideAddress(!hideAddress)}>
                        { hideAddress ? addres : 'Address-status: hide' }
                    </div>
                    <div className="amount">
                        ETH: <span className="special">{ amount }</span>
                    </div>
                </div>
            </div>
        </LoadingContext.Provider>
    )
}

export default WalletInformations