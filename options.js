document.getElementById('save').addEventListener('click', function() {
    let mode = document.getElementById('dropdown').value;
    let input1Value = document.getElementById('input1').value;
    let input2Value = document.getElementById('input2').value;

    // Extract mode number from the string
    let modeNum = mode.replace('mode', '');

    // Construct the keys dynamically
    let junkKey = 'Junk' + modeNum;
    let goodKey = 'Good' + modeNum;

    // Create an object to save
    let saveData = {};
    saveData[junkKey] = input1Value;
    saveData[goodKey] = input2Value;

    // Save data
    browser.storage.local.set(saveData);

    // Optionally, give feedback to the user that data is saved.
    alert('Data saved');
});

function loadSavedData(mode) {
    // Extract mode number from the string
    let modeNum = mode.replace('mode', '');

    // Construct the keys dynamically
    let junkKey = 'Junk' + modeNum;
    let goodKey = 'Good' + modeNum;
    let keys = [junkKey, goodKey];

    browser.storage.local.get(keys).then(results => {
        document.getElementById('input1').value = results[junkKey] || '';  // Use an empty string as fallback
        document.getElementById('input2').value = results[goodKey] || '';  // Use an empty string as fallback
    });
}

// Event listener for the dropdown change
document.getElementById('dropdown').addEventListener('change', function() {
    let mode = this.value;
    loadSavedData(mode);
});

// Initial load when the page is opened or refreshed
loadSavedData(document.getElementById('dropdown').value);