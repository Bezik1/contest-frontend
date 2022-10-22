import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import WalletInformations from "../WalletInformations";
import { WalletContext } from "../../contexts/wallet.context"
import './index.css'
import { LoadingContext } from "../../contexts/loading.context";

const Wallet = ({ walletClick } : { walletClick: React.Dispatch<React.SetStateAction<boolean>> }) =>{
    const [message, setMessage] = useState('')
    const [addres, setAddres] = useState('')
    const [currentBlock, setCurrentBlock] = useState(0)
    const [amount, setAmount] = useState(0)
    const [connectWallet, setConnectWallet] = useState(false)
    const [loading, setLoading] = useState(useContext(LoadingContext))
    
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const asyncWallet = async () =>{
        try {
            await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();
            const addres = await signer.getAddress()
            setAddres(addres)
            setLoading(false)
        } catch(err) {
            setMessage(`Cannot connect to your wallet: ${err}`)
        }
    }

    const getCurrentBlock = async () =>{
        const block = await provider.getBlockNumber();

        setCurrentBlock(block)
    }

     const getEtherAmount = async (walletAddress: string) =>{
        const amount = await provider.getBalance(walletAddress)

        setAmount(Number(amount))
     } 
    
    useEffect(() =>{
        if(connectWallet){
            asyncWallet()
        }
    })

    useEffect(() => { 
        getCurrentBlock()
        console.log(currentBlock)
    })

    useEffect(() =>{ getEtherAmount(addres) })

    return (
        <div className="wallet">
            {connectWallet ? null : <h1 className="special"> Connect your Wallet </h1> }
            <WalletContext.Provider value={[addres, amount]}>
                { connectWallet 
                    ? null
                    : <button 
                        className="ether-btn btn" 
                        onClick={() => setConnectWallet(true)}> 
                        Connect Wallet 
                       </button>
                }
                { loading
                    ? null
                    : <WalletInformations />
                }
                <div className="message-container">
                    <div className={message !== '' ? "message" :""}> { message } </div>
                </div>
                <button className="ether-btn btn" onClick={() => walletClick(false)}> Quit Wallet </button>
            </WalletContext.Provider>
        </div>
    )
}

export default Wallet