document.getElementById('save').addEventListener('click', function() {
    let mode = document.getElementById('dropdown').value;
    let input1Value = document.getElementById('input1').value;
    let input2Value = document.getElementById('input2').value;

    
    let modeNum = mode.replace('mode', '');

  
    let junkKey = 'Junk' + modeNum;        //reads and saves inputs dynamically since there are so many, based on shop IDs that will be called dynamically in the content script
    let goodKey = 'Good' + modeNum;

    
    let saveData = {};
    saveData[junkKey] = input1Value;
    saveData[goodKey] = input2Value;

 
    browser.storage.local.set(saveData);

    alert('Data saved');
});

function loadSavedData(mode) {
    // loading saved data is also dynamic
    let modeNum = mode.replace('mode', '');

    let junkKey = 'Junk' + modeNum;
    let goodKey = 'Good' + modeNum;
    let keys = [junkKey, goodKey];

    browser.storage.local.get(keys).then(results => {
        document.getElementById('input1').value = results[junkKey] || '';  //empty string as fallback
        document.getElementById('input2').value = results[goodKey] || '';  
    });
}


document.getElementById('dropdown').addEventListener('change', function() { 
    let mode = this.value;
    loadSavedData(mode);
});

// Initial load when the page is opened or refreshed
loadSavedData(document.getElementById('dropdown').value);
