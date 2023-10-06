const currentURL = window.location.href; 
console.log(currentURL);

const urlParams = new URLSearchParams(new URL(currentURL).search);  //gets URL and the obj_type for purposes of finding what shop we are in
const objType = urlParams.get('obj_type');

function DetectItems(junkArray, goodArray) {
    let elementsLow = [];
    for (let value of junkArray) {
        elementsLow.push(...document.querySelectorAll('[data-name="' + value + '"]'));  //compares junk item list array to elements in the shop
    }
    console.log(elementsLow);
    for (let elementLow of elementsLow) {
        elementLow.style.opacity = '0.25';    //applies opacity change
    }

    let elementsHigh = [];
    for (let value of goodArray) {
        elementsHigh.push(...document.querySelectorAll('[data-name="' + value + '"]')); //compares the highlight item list array to elements in the shop
    }
    console.log(elementsHigh);
    for (let elementHigh of elementsHigh) {
        elementHigh.style.border = "5px solid #00FF40"; //applies a nice green border
    }
}

if (objType !== null) {
    const ShopID = parseInt(objType, 10); //sets shopID to the objtype at the end of neo shop URLs
    
    if (!isNaN(ShopID)) {                 //pulls from user data entered in option page based on ShopID
        console.log(ShopID);
        const junkKey = 'Junk' + ShopID;
        const goodKey = 'Good' + ShopID;

        browser.storage.local.get([junkKey, goodKey]).then(data => {     //transforms user provided item lists into arrays it can read
            const junkValue = data[junkKey] || "";
            const junkArray = junkValue.split("\n").map(item => item.trim());

            const goodValue = data[goodKey] || "";
            const goodArray = goodValue.split("\n").map(item => item.trim());
            
            DetectItems(junkArray, goodArray); //calls detectitems function to look at page and apply CSS

        }).catch(err => {
            console.error('Error retrieving data:', err);
        });

    } else {
        console.log('Invalid number');
    }
} else {
    console.log('obj_type parameter not found in the URL');
}
