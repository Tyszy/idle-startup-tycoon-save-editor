function createOverlay(jsonData) {
    const overlay = document.createElement('div');
    overlay.id = 'jsonOverlay';
    overlay.innerHTML = `
        <div id="jsonHeader" style="font-weight: bold;">Idle Startup Tycoon Save Editor</div>
        <textarea id="jsonEditor" style="width: 280px; height: 340px; color: blue; background: black;"></textarea>
        <button id="saveJson" style="color: blue; background: black; border: 1px solid blue;">Save</button>
    `;

    overlay.style = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
        padding: 10px;
        background: black;
        border: 2px solid blue;
        width: 300px;
        height: 400px;
        color: blue;
    `;

    document.body.appendChild(overlay);

    const jsonString = JSON.stringify(jsonData, null, 2);
    document.getElementById('jsonEditor').value = jsonString;

    const header = document.getElementById('jsonHeader');
    header.style.cursor = 'move';

    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - overlay.getBoundingClientRect().left;
        offsetY = e.clientY - overlay.getBoundingClientRect().top;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        overlay.style.left = `${x}px`;
        overlay.style.top = `${y}px`;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.getElementById('saveJson').addEventListener('click', () => {
        const editedDataString = document.getElementById('jsonEditor').value;

        try {
            JSON.parse(editedDataString);
            localStorage.setItem('MJS-Idle-Startup-Tycoon-v1.0.0', editedDataString);  // Remember to change 'MJS-Idle-Startup-Tycoon-v1.0.0' to your actual key.
            location.reload();
        } catch (error) {
            alert('Invalid JSON format.');
        }
    });
}

const jsonData = JSON.parse(localStorage.getItem('MJS-Idle-Startup-Tycoon-v1.0.0'));  // Remember to change 'MJS-Idle-Startup-Tycoon-v1.0.0' to your actual key.
if (jsonData) {
    createOverlay(jsonData);
}