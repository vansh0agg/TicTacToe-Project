const cellblocks=document.querySelectorAll('[data-cell]')
const xclass='x';
const oclass='o';

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningmessagetextelement=document.querySelector('[data-winning-message-text]');
const winningMessageElement=document.getElementById('winningmessage');
let oturn=false;
let xturn;
const restart=document.getElementById('restartbutton')
cellblocks.forEach(cell => {
    cell.addEventListener('click', handleclick, {once: true});
})

restart.addEventListener('click', startgame)

function startgame(){
    cellblocks.forEach(cell=>{
        cell.classList.remove(xclass);
        cell.classList.remove(oclass);
        cell.removeEventListener('click',handleclick);
        cell.addEventListener('click', handleclick, {once: true});

    })
    winningMessageElement.classList.remove('show')

}

function handleclick(e){
    const cell= e.target;
    const currentclass=oturn?oclass:xclass;
    placemark(cell,currentclass);
    if(checkwin(currentclass)){
        endgame(false);
    }else if(isdraw()){
        endgame(true)
    }else{
        swapturns();
    }
    
}

function placemark(cell,currentclass){
    cell.classList.add(currentclass);
}

function swapturns(){
    oturn=!oturn;
}

function checkwin(currentclass){
    return win.some(combination=>{
        return combination.every(index=>{
            return cellblocks[index].classList.contains(currentclass);
        })
    })
}

function endgame(draw){
    if(draw){
        winningmessagetextelement.innerText='Draw!';
    }else{
        winningmessagetextelement.innerText=`${oturn?"O's Wins":"X's Wins"}`;
    }
    winningMessageElement.classList.add('show');
}

function isdraw(){
    return [...cellblocks].every(cell=>{
        return cell.classList.contains(xclass) || 
        cell.classList.contains(oclass);
    })
}