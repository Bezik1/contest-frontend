import { SYMBOLS, UPPER_CASE_LETTERS } from "../constans/constans"

const passwordAuth = (password: string) =>{
    let message = ''
    let isError = false

    const ifSymbols = () =>{
        let passwordSymbolsArray: string[] = []

        SYMBOLS.forEach(symbol =>{
            for(let i=0; i<password.length; i++){
                if(password[i] === symbol){
                    passwordSymbolsArray.push(symbol)
                }
            }
        })

        if(passwordSymbolsArray.length < 1){
            return false
        } else {
            return true
        }
    }

    const isBigLetter = () =>{
        let bigLettersArray: string[] = []

        UPPER_CASE_LETTERS.forEach(upperCaseLetter =>{
            for(let i=0; i<password.length; i++){
                if(password[i] === upperCaseLetter){
                    bigLettersArray.push(upperCaseLetter)
                }
            }
        })

        if(bigLettersArray.length < 1){
            return false
        } else {
            return true
        }
    }

    const isEnoughSymbols = ifSymbols()
    const isBigLetters = isBigLetter()

    switch(true){
        case (password.length < 6):
            message = 'Password must have minimum 6 letters'
            isError = true
            break
        case !isEnoughSymbols:
            message = 'Password must have minimum 1 symbol'
            isError = true
            break
        case !isBigLetters:
            message = 'Password must have minimum 1 upper case letter'
            isError = true
            break
    }

    return [message, isError] as [string, boolean]
}

export default passwordAuth