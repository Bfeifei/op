var reader = new FileReader();
var load;
export const readFileSize = file => {
    var size = file.size / 1024;
    var aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
    var fileSizeString = '';
    for(var i = 0; size > 1; size /= 1024, i++) {
       fileSizeString = size.toFixed(2) + " " + aMultiples[i];
    }
    return fileSizeString;
};

export const readFileload = file => {
	reader.onload = function(){
			console.log(this.result)
	}
		reader.readAsDataURL(file);
//	let myFirstPromise = new Promise(function(resolve, reject){
//	    
//	});
//	myFirstPromise.then(function(successMessage){
//	    console.log(successMessage);
//	});
}
