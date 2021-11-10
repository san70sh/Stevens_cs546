const axios = require('axios');
const md5 = require('blueimp-md5');
const publickey = '36573e50f7f1ed3ac2731d06c4ea297b';
const privatekey = '542c9685ead5b9d0fc95ee7ce7822fe4f2d04523';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';


async function getPersonBySearchTerm(term){
    let dat = await axios.get(`${baseUrl}?nameStartsWith=${term}&ts=${ts}&apikey=${publickey}&hash=${hash}`);
    try{
        if(dat.data.code == 200){
            let data = dat.data.data.results;
            let dataArr = [];
            data.forEach(e => {
                let charList = {};
                charList["name"] = e.name;
                charList["id"] = e.id;
                dataArr.push(charList);
            });
            if(dataArr.length > 20) {
                dataArr = dataArr.slice(0,20);
            }
            return dataArr;
        } else {
            let errMsg = {};
            errMsg["err"] = `We're sorry, but no results were found for ${term}.`;
            return errMsg;
        }
        
    } catch(err) {
        console.log(err);
        return;
    }
    
}

async function getPersonById(id){
    try{
        let dat = await axios.get(`${baseUrl}/${id}?ts=${ts}&apikey=${publickey}&hash=${hash}`);
        let charData = dat.data.data.results[0];
        let character = {name: "", description: "", image: "", comics: []};
        character.name = charData.name;
        character.description = charData.description;
        character.image = `${charData.thumbnail.path}/portrait_uncanny.${charData.thumbnail.extension}`;
        charData.comics.items.forEach(e=>{
            character.comics.push(e.name);
        })
        if(character.comics.length > 20) {
            character.comics = character.comics.slice(0,20);
        }
        return character;
    } catch (err) {
        console.log(err);
        let errMsg = {};
        errMsg["err"] = `There is no character associated with the ID ${id}.`;
        return errMsg;
    }
    
}

module.exports = {
    getPersonBySearchTerm,
    getPersonById
}
