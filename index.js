document.addEventListener('DOMContentLoaded',getData());

const countryPath=document.querySelectorAll('svg path');




//async function calls api and returns covid data
async function getData(countryName){
    //console.log(countryName);
    try{
        const response=await fetch(
        'https://covid-19-statistics.p.rapidapi.com/reports',
        {
            method:'GET',
            headers:{
                'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',  
                'X-RapidAPI-Key':'a18aa547acmsh0e4bcca5a5d0cd6p143347jsn579efc41eebf'

        }
    });
        const RawData=await response.json();
        console.log(RawData.data);

    
    }catch (error){
        console.log(`ERROR: ${error}`);
    }


}


function getCOVIDData(countryName){
    console.log(countryName);

}






//event listener, on mouse over gets country name
countryPath.forEach(path=>{
    path.addEventListener('mouseover',()=>{
        const countryName=path.className.baseVal;
        
        getCOVIDData(countryName);

    })
})