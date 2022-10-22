import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import WalletInformations from "../WalletInformations";
import { WalletContext } from "../../contexts/wallet.context"
import './index.css'
import { LoadingContext } from "../../contexts/loading.context";

const Wallet = ({ walletClick } : { walletClick: React.Dispatch<React.SetStateAction<boolean>> }) =>{
    const [message, setMessage] = useState('')
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
    const [error, setError] = useState(false)
    const [addres, setAddres] = useState('')
    const [currentBlock, setCurrentBlock] = useState(0)
    const [amount, setAmount] = useState(0)
    const [connectWallet, setConnectWallet] = useState(false)
    const [loading, setLoading] = useState(useContext(LoadingContext))

    useEffect(() =>{
        try {
            //@ts-ignore
            const newProvider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(newProvider)
        } catch(err) {
            setMessage('Cannot connect to MetaMask')
            setError(true)
        }
    }, [setProvider])

    const asyncWallet = async () =>{
        try {
            //@ts-ignore
            const accounts = await provider.send("eth_requestAccounts", []);

            if(accounts.length){
                //@ts-ignore
                const signer = provider.getSigner();
                const addres = await signer.getAddress()
                setAddres(addres)
                setLoading(false)
            } else {
                setError(true)
                setMessage(`Cannot connect to MetaMask`)
            }
        } catch(err) {
            setError(true)
            setMessage(`Cannot connect to your wallet: ${err}`)
        }
    }

    const getCurrentBlock = async () =>{
        //@ts-ignore
        const block = await provider.getBlockNumber();

        setCurrentBlock(block)
    }

     const getEtherAmount = async (walletAddress: string) =>{
        //@ts-ignore
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

    const Content = () =>(
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
        </WalletContext.Provider>
    )

    return (
        <div className="wallet">
            { connectWallet ? null : <h1 className="special"> Connect your Wallet </h1> }
            { error ? null : <Content /> }
            <div className="message-container">
                <div className={message !== '' ? "message" :""}> { message } </div>
            </div>
            <button className="ether-btn btn" onClick={() => walletClick(false)}> Quit Wallet </button>
        </div>
    )
}

export default Wallet