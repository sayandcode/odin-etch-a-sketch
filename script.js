const grid= document.querySelector('.grid');
createNewGrid(16);

const clrScrn=document.querySelector('.clrScrn');
clrScrn.addEventListener('click',reset);

function reset(){
    let s=prompt("Enter number of squares");
    createNewGrid(s);
}

function createNewGrid(s){
    //remove existing grid
    let sqrs=document.querySelectorAll('.grid > div');
    sqrs.forEach(sqr=> sqr.remove()); 

    //create new grid
    grid.style.gridTemplateColumns=`repeat(${s},${500/s}px)`;
    grid.style.gridTemplateRows=`repeat(${s},${500/s}px)`;

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