const countryPath=document.querySelectorAll('svg path');




//event listener 
countryPath.forEach(path=>{
    path.addEventListener('mouseover',()=>{
        const countryName=path.className.baseVal;
        console.log(countryName);
    })
})