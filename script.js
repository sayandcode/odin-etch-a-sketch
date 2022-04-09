const grid= document.querySelector('.grid');
for (let i = 0; i < 16*16; i++) {
    let sqr=document.createElement('div');
    grid.appendChild(sqr);    
}

const sqrs=document.querySelectorAll('.grid > div');
sqrs.forEach(sqr=>sqr.addEventListener('mouseover', e=>{
    e.target.classList.add('etched')    
}))