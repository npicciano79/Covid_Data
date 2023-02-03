

const countryPath=document.querySelectorAll('svg path');

window.onload=function(){
    main();
    //console.log(COVIDdata);

}


function main(){
    //async function calls api and returns covid data
    async function getData(){
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
            //console.log(RawData.data);

            return RawData;

        
        }catch (error){
            console.log(`ERROR: ${error}`);
        }


    }


    function getCOVIDData(countryName){
        //COVIDdata=localStorage.getItem('COVIDdata');
        //console.log(COVIDdata);
        console.log(countryName);
    
        
    

    }




    //event listener, on mouse over gets country name
    countryPath.forEach(path=>{
        path.addEventListener('mouseover',()=>{
            const countryName=path.className.baseVal;

            getCOVIDData(countryName);
            

        })
    })



    async function callAsync(){
        const x = await getData();
        return x; 
    }


   const COVIDdata=callAsync();
   console.log(COVIDdata);

}



