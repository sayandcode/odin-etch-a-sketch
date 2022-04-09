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
        sqrs.forEach(sqr=> {
            sqr.classList.remove('etched');
            sqr.removeAttribute('style');
        })

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
    sqrs.forEach(sqr=>sqr.addEventListener('mouseover',changecolor));
}

function changecolor(){
    if(this.classList.contains('etched')){
        let rgb=this.style.backgroundColor;
        let hsl=RGB2HSL(rgb);
        hsl[2]-=10;
        this.style.backgroundColor=`hsl(${hsl[0]}, 100%, ${hsl[2]}%)`;
    }
    else{
        this.classList.add('etched');
        let hue=Math.floor(Math.random()*360);
        this.style.backgroundColor=`hsl(${hue}, 100%, 50%)`;
    }        
}

//https://css-tricks.com/converting-color-spaces-in-javascript/
function RGB2HSL(rgb){
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    for (let R in rgb) {
        let r = rgb[R];
        if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }

    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
    h = 0;
    // Red is max
    else if (cmax == r)
    h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
    h = (b - r) / delta + 2;
    // Blue is max
    else
    h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h,s,l];
}
