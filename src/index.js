
let countryArray=[];

function Country(countryName,countryData){
    this.countryName=countryName;
    this.totalFatalities=countryData[0];
    this.fatalityRate=countryData[1];
}


const countryDisplay=document.querySelector('.click_display');
const clearData=document.querySelector('.clearBtn');
const mouseoverDisplay=document.querySelector('.mouseover_display');
const removeCountryButton=document.querySelector('.remove_countryBtn');


//async function calls covid data API
//returns data to COVIDdata
async function getCOVIDData(){
    try{
            const response= await fetch(
            'https://covid-19-statistics.p.rapidapi.com/reports',
            {
                
                method:'GET',
                headers:{
                    'X-RapidAPI-Host':'covid-19-statistics.p.rapidapi.com',  
                    'X-RapidAPI-Key':'a18aa547acmsh0e4bcca5a5d0cd6p143347jsn579efc41eebf'

            }
            });
                const RawData= await response.json();
                //console.log(RawData.data);
                return RawData        
            
            }catch (error){
                console.log(`ERROR: ${error}`);
            }
            
}

//clear all data and countryArray
function clearAll(){
    while(countryDisplay.hasChildNodes()){
        countryDisplay.removeChild(countryDisplay.firstChild)
        countryArray=[]
    }
}



//parse COVID data
//return object of country, data
function COVIDdataparse(COVIDdata){

    var dataObject={}
    var totalDeaths=0;
    var fatalityRate=0;
    //intialize countryName
    let countryName='';

    //iterate throught countries 
    for (var i=1; i<=COVIDdata.data.length-1;i++){
        //check if new country name equals previous country name
        if (countryName!=COVIDdata.data[i].region.name){
            //new country 
            let countryData=[totalDeaths,fatalityRate];
            dataObject[countryName]=countryData;

            countryName=COVIDdata.data[i].region.name;
            totalDeaths=COVIDdata.data[i].deaths;
            fatalityRate=COVIDdata.data[i].fatality_rate;
            
        }else{
            //current country is same as previous 
            //increments totalDeaths and fatality rate 
            totalDeaths+=COVIDdata.data[i].deaths;
            fatalityRate+=COVIDdata.data[i].fatality_rate

        }

    }
    return dataObject;
}

function removeCountry(i){
    const removed=countryArray.splice(i,1)
    console.log(removed);
    countryDisplayCreate(countryArray.length-1,countryArray);

}

//DOM manipulation to create data display of selected country
//from on click event 
function countryDisplayCreate(countryArraySize,countryArray){
    while(countryDisplay.hasChildNodes()){
        countryDisplay.removeChild(countryDisplay.firstChild);
    }
    //array of country data
    for (let i=0;i<=countryArraySize;i++){
        //main country display
        let country_div=document.createElement('div');
        country_div.classList='country_Entry '+i;
        country_div.setAttribute('id',i);
        countryDisplay.appendChild(country_div);

        //country displays
        let countryName_label=document.createElement('div');
        countryName_label.classList='countryName_Label';
        let title_label=document.createElement('h2');
        title_label.textContent='Country: '+countryArray[i].countryName;
        countryName_label.appendChild(title_label);
        country_div.appendChild(countryName_label);

        //data display
        let countryData_label=document.createElement('div');
        countryData_label.classList='countryData_Label';
        let totalDeaths_label=document.createElement('h3');
        totalDeaths_label.textContent='Deaths: '+countryArray[i].totalFatalities;
        let fatalityRate_label=document.createElement('h3');
        //create temp fatalty rate and convert to percent
        let temporary_fatalityRate=((countryArray[i].fatalityRate)*100).toFixed(2);
        fatalityRate_label.textContent='Fatality Rate: '+temporary_fatalityRate+'%';
        countryData_label.appendChild(totalDeaths_label);
        countryData_label.appendChild(fatalityRate_label);
        country_div.appendChild(countryData_label);

        //remove button
        let remove_countryBtn=document.createElement('div');
        remove_countryBtn.classList='remove_countryBtn';
        let remove_Button=document.createElement('button');
        remove_Button.textContent='Remove';
        remove_countryBtn.appendChild(remove_Button);
        country_div.appendChild(remove_countryBtn);
      

        remove_Button.addEventListener('click',()=>{
            removeCountry(i);
        })

    }
}

//clear previous mouseover data at each mouseover event
function mouseoverDisplayClear(){
    while(mouseoverDisplay.hasChildNodes()){
        mouseoverDisplay.removeChild(mouseoverDisplay.firstChild)
    }


}
        
//mouseover data display
function mouseoverDisplayFunction(countryName,countryData){
    let mouseover_Country_Display=document.createElement('div');
    mouseover_Country_Display.classList='mouseover_Country_Display';
    mouseoverDisplay.appendChild(mouseover_Country_Display);

    //country displays
    let mouseover_countryName_label=document.createElement('div');
    mouseover_countryName_label.classList='mouseover_countryName_Label';
    let mouseover_title_label=document.createElement('h2');
    mouseover_title_label.textContent='Country: '+countryName;
    mouseover_countryName_label.appendChild(mouseover_title_label);
    mouseover_Country_Display.appendChild(mouseover_countryName_label);

    //data display
    let mouseover_countryData_label=document.createElement('div');
    mouseover_countryData_label.classList='mouseover_countryData_Label';
    let mouseover_totalDeaths_label=document.createElement('h3');
    mouseover_totalDeaths_label.textContent='Deaths: '+countryData[0];
    let mouseover_fatalityRate_label=document.createElement('h3');
    //create temp fatalty rate and convert to percent
    let mouseover_temporary_fatalityRate=((countryData[1])*100).toFixed(2);
    mouseover_fatalityRate_label.textContent='Fatality Rate: '+mouseover_temporary_fatalityRate+'%';
    mouseover_countryData_label.appendChild(mouseover_totalDeaths_label);
    mouseover_countryData_label.appendChild(mouseover_fatalityRate_label);
    mouseover_Country_Display.appendChild(mouseover_countryData_label);
    

}
    
//check if country is currently in array
function countryArrayCheck(countryName){
    console.log(countryArray);


}
    


function countrySelector(COVIDdataObject){
    //console.log(COVIDdataObject);
    const countryPath=document.querySelectorAll('svg path');

    //seperate mouseover and onclick events 
    countryPath.forEach(path=>{
        

        //if country is clicked, add to countryArray
        path.addEventListener('click',()=>{
        const countryName=path.className.baseVal;
        var countryData=COVIDdataObject[countryName]
        if (countryData===undefined){
            countryData=['none','none'];
        }
        //console.log(`country name:${countryName} data:${countryData}`)
        //check if values are in countryArray
        if (countryArray.length!=0){
            //check if selected country is in countryArray
            let country_in_array=countryArrayCheck(countryName);
            if (country_in_array===false){
                console.log('not in')
                let countries=new Country(countryName,countryData);
                countryArray.push(countries);
                console.log(countryArray);
        }else{
            //add first value to countryArray
        }}
        
    
        //countryDisplayCreate(countryArray.length-1,countryArray);

        })
        //if country is mouseover, display country data
        path.addEventListener('mouseover',()=>{
        const countryName=path.className.baseVal;
        var countryData=COVIDdataObject[countryName]
        if (countryData===undefined){
            countryData=['none','none'];
        }
        mouseoverDisplayClear();
        mouseoverDisplayFunction(countryName,countryData)
        })
    })
    

    
    /*
    //event listener, on mouse over gets country name
    countryPath.forEach(path=>{
    path.addEventListener('mouseover',()=>{
        const countryName=path.className.baseVal;
        var countryData=COVIDdataObject[countryName]
        if (countryData===undefined){
            countryData=['none','none'];
        }
        //console.log(`country name:${countryName} data:${countryData}`)
        
        let countries=new Country(countryName,countryData);
        countryArray.push(countries);
    
        countryDisplayCreate(countryArray.length-1,countryArray);

    

    })
})
*/
}
   
//clear data event listener
clearData.addEventListener('click',()=>{
    clearAll();
})




    

    









//initial function call, getCOVIDData
const COVIDdata=getCOVIDData()
        
        COVIDdata.then(function(COVIDdata){
    
        //passes COVIDdata to parser
        //returns COVIDdataObject, data object with country key
        //and total deaths and fatality rate as values  
        COVIDdataObject=COVIDdataparse(COVIDdata)
        
        //COVIDdataObject passed to main display
        countrySelector(COVIDdataObject);

    
        //console.log(COVIDdataArray.countries[1]);
        //mainDisplay(result)
        })
