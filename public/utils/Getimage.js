import getSearchKeyword from "./GetKeyWord";
function Getimage(exerciseName) {


 return `https://source.unsplash.com/600x400/?${encodeURIComponent(getSearchKeyword(exerciseName))}`


 
}

export default Getimage;