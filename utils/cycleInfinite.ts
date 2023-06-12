
let interval: any;
let count = 0;


const cycleInfinite = () =>{
    const cycleArray = (array: [],time: number) => {
        interval =  setInterval(()=>{
            let movieAct = array[count];
    
            count++;
    
            if(count === array.length){
                count = 0;
            }
        },5000)
    
    }
    const clearCycle = () =>{
        clearInterval(interval)
    }
}

