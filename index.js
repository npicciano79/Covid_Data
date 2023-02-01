const countryPath=document.querySelectorAll('svg path');

countryPath.forEach(path=>{
    path.addEventListener('click',()=>{
        console.log(path.className.baseVal);
    })
})