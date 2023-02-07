



function mainDisplay(COVIDdata){
    console.log(Object.keys(COVIDdata));
    const countryPath=document.querySelectorAll('svg path');

    //event listener, on mouse over gets country name
    countryPath.forEach(path=>{
    path.addEventListener('mouseover',()=>{
        const countryName=path.className.baseVal;
        console.log(countryName)

        //for(i=0;i<length(COVIDdata))

        //getCOVIDData(countryName);

        
        const countryDATA=COVIDdata.data
        

    })
})



}






//async function calls api and returns covid data
async function getCOVIDData(){
    
    try{
            const response= await fetch(
            'https://covid-19-statistics.p.rapidapi.com/reports',
            {
                method:'GET',
                headers:{
                    'X-RapidAPI-Host': ,  
                    'X-RapidAPI-Key':'

            }
            });
                const RawData= await response.json();
                //console.log(RawData.data);
                return RawData

                
            
            }catch (error){
                console.log(`ERROR: ${error}`);
            }
}






const COVIDdata=getCOVIDData()
        console.log(COVIDdata);

        COVIDdata.then(function(result){
        //console.log(result)
        
        mainDisplay(result)
        })
