const grid= document.querySelector('.grid');
createNewGrid(16);

const clrScrn=document.querySelector('.clrScrn');
clrScrn.addEventListener('click',reset);

function reset(){
    let s=prompt("Enter number of squares");
    while(s>100)
        s=prompt('Enter a number less than 100');
    createNewGrid(s);
}

function createNewGrid(s){
    let sqrs=document.querySelectorAll('.grid > div');
    
    if(s===null){
        sqrs.forEach(sqr=> sqr.classList.remove('etched'))
        return;
    }

    //remove existing grid
    sqrs.forEach(sqr=> sqr.remove()); 

    //create new grid
    grid.style.gridTemplateColumns=`repeat(${s},${600/s}px)`;
    grid.style.gridTemplateRows=`repeat(${s},${600/s}px)`;
    grid.style.gap=`${80/s}px`

    for (let i = 0; i < s**2; i++) {
        let sqr=document.createElement('div');
        grid.appendChild(sqr);    
    }

    //and listen
    sqrs=document.querySelectorAll('.grid > div');
    sqrs.forEach(sqr=>sqr.addEventListener('mouseover', e=>{
        e.target.classList.add('etched');
    }))
}