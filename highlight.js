const currentURL = window.location.href;
console.log(currentURL);

const urlParams = new URLSearchParams(new URL(currentURL).search);
const objType = urlParams.get('obj_type');

function DetectItems(junkArray, goodArray) {
    let elementsLow = [];
    for (let value of junkArray) {
        elementsLow.push(...document.querySelectorAll('[data-name="' + value + '"]'));
    }
    console.log(elementsLow);
    for (let elementLow of elementsLow) {
        elementLow.style.opacity = '0.25';
    }

    let elementsHigh = [];
    for (let value of goodArray) {
        elementsHigh.push(...document.querySelectorAll('[data-name="' + value + '"]'));
    }
    console.log(elementsHigh);
    for (let elementHigh of elementsHigh) {
        elementHigh.style.border = "5px solid #00FF40";
    }
}

if (objType !== null) {
    const ShopID = parseInt(objType, 10);
    
    if (!isNaN(ShopID)) {
        console.log(ShopID);
        const junkKey = 'Junk' + ShopID;
        const goodKey = 'Good' + ShopID;

        browser.storage.local.get([junkKey, goodKey]).then(data => {
            const junkValue = data[junkKey] || "";
            const junkArray = junkValue.split("\n").map(item => item.trim());

            const goodValue = data[goodKey] || "";
            const goodArray = goodValue.split("\n").map(item => item.trim());
            
            // Call the DOM manipulation function after fetching the data.
            DetectItems(junkArray, goodArray);

        }).catch(err => {
            console.error('Error retrieving data:', err);
        });

    } else {
        console.log('Invalid number');
    }
} else {
    console.log('obj_type parameter not found in the URL');
}
