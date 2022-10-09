import './index.css'

const Home = () =>{
    return (
        <>
            <h1> Witam w <span> Sąsiedztwie </span> </h1>
            <div className='home-content'>
                Strona ta ma służyć rozwijaniu się społeczności danego miasta, oraz zacieśniać więzi między mieszkańcami poprzez wzajemną pomoc.
            </div>
            <div className='home-content'>
                <br /> Każdy mieszkaniec / użytkownik aplikacji, będzie mógł wydać ogłoszenie
                <br /> w sekcji Ogłoszenia, odnośnie swojego problemu, a osoby skore do
                <br /> pomocy mogłyby zgłaszać się do ogłoszeń. 
            </div>
        </>
    )
}

export default Home