import * as deepl from 'deepl-node';

export const translateWordService:Function = async(fromWord: string) =>{
    try{
        const translationKey = process.env.TRANSLATION_KEY
        const translator = new deepl.Translator(`${translationKey}`);

        const result = await translator.translateText(fromWord, null, 'en-US');
        const toWord = result.text 
        return toWord;
    }catch(error){
        console.log(error)
    }
}