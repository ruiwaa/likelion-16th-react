export async function wait(delay = 1000, sucessOrFail = false) {
   return new Promise((resolve, reject) =>{

    let excuteFn = resolve

    if(sucessOrFail &&  Math.random() < 0.5) {
      excuteFn = reject
    }
setTimeout(excuteFn, delay)})
  
    
}