class Sorted_Books {
    constructor(book_data) {
        this.book_data = book_data;
    }
    
    addGenres(booksObject, pathArray) {

        let returnObject = booksObject;

        if (returnObject.hasOwnProperty(pathArray[2]) == false) {

            returnObject[pathArray[2]] = {};
            
        } 

        return returnObject;

    }

    addSubgenres(booksObject, pathArray) {

        let returnObject = booksObject;

        if (returnObject[pathArray[2]].hasOwnProperty(pathArray[3]) == false) {

            returnObject[pathArray[2]][pathArray[3]] = {};
            
        } 

        return returnObject;

    }

    addAuthors(booksObject, pathArray) {

        let returnObject = booksObject;

        if (returnObject[pathArray[2]][pathArray[3]].hasOwnProperty(pathArray[4]) == false) {

            returnObject[pathArray[2]][pathArray[3]][pathArray[4]] = [];
            
        } 

        return returnObject;

    }

    addFiles(booksObject, pathArray, currentBookObject) {

        let returnObject = booksObject;

        let tmpList = returnObject[pathArray[2]][pathArray[3]][pathArray[4]];

        if (tmpList.includes(pathArray[5]) == false) {

            tmpList.push({'name':pathArray[5], 'file':currentBookObject});
            
        } 

        returnObject[pathArray[2]][pathArray[3]][pathArray[4]] = tmpList;

        return returnObject;

    }

    allSorted() {

        let tmpObject = {};

        this.book_data.forEach(element => {

            let elementArray = element.local_path.split("/");

            tmpObject = this.addGenres(tmpObject, elementArray);

            tmpObject = this.addSubgenres(tmpObject, elementArray);

            tmpObject = this.addAuthors(tmpObject, elementArray);

            tmpObject = this.addFiles(tmpObject, elementArray, element);
            
        
            // if (tmpObject.hasOwnProperty(tmpStr[2])) {
            //     if (tmpObject[tmpStr[2]].hasOwnProperty(tmpStr[3])) {
            //         if (tmpObject[tmpStr[2]][tmpStr[3]].hasOwnProperty(tmpStr[4])) {
            //             if (!(tmpStr[5] in tmpObject[tmpStr[2]][tmpStr[3]][tmpStr[4]])) {
            //                 var tmpVal = tmpObject[tmpStr[2]][tmpStr[3]][tmpStr[4]];
            //                 var filename = tmpStr[5];
            //                 tmpVal.push({filename:element});
            //                 tmpObject[tmpStr[2]][tmpStr[3]][tmpStr[4]] = tmpVal;
            //             } 
            //         } else {
            //             tmpObject[tmpStr[2]][tmpStr[3]][tmpStr[4]] = [];
            //         }
            //     } else {
            //         tmpObject[tmpStr[2]][tmpStr[3]] = {};
            //     }
            // } else {
            //     tmpObject[tmpStr[2]] = {};
            // }
            
        });

        return tmpObject;
    }
}

module.exports = Sorted_Books
