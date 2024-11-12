function addCD() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    
    if (!author || !title || !year) {
        alert('Please fill in all fields');
        return;
    }
    const tbody = document.querySelector('#cdTable tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${author}</td>
        <td>${title}</td>
        <td>${year}</td>
        <td><span class="delete-btn" onclick="deleteCD(this)">🗑️</span></td>
    `;
    tbody.appendChild(row);
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('year').value = '';
    saveCDs();
}

function deleteCD(element) {
    element.parentElement.parentElement.remove();
    saveCDs();
}

function saveCDs() {
    const tbody = document.querySelector('#cdTable tbody');
    const rows = tbody.querySelectorAll('tr');
    const cds = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const cd = {
            author: cells[0].textContent,
            title: cells[1].textContent,
            year: cells[2].textContent
        };
        cds.push(cd);
    });

    localStorage.setItem('cdCollection', JSON.stringify(cds));
}
function loadCDs() {
    const cds = JSON.parse(localStorage.getItem('cdCollection')) || [];
    const tbody = document.querySelector('#cdTable tbody');

    cds.forEach(cd => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cd.author}</td>
            <td>${cd.title}</td>
            <td>${cd.year}</td>
            <td><span class="delete-btn" onclick="deleteCD(this)">🗑️</span></td>
        `;
        tbody.appendChild(row);
    });
}
window.addEventListener('load', loadCDs);
