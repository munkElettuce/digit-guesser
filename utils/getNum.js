module.exports=async(predictions)=>{
    let max = -Infinity; // Initialize with negative infinity
    let index = -1;
    for(let i=0;i<predictions.length;i++){
        if(predictions[i]>max){
            max=predictions[i];
            index=i;
        }
    } 
    return {probability:max,digit:index}
}