function showPopup() {
    let current = parseFloat(document.getElementById('currentGrade').value);
    const target = parseFloat(document.getElementById('targetGrade').value);
    const weight = parseFloat(document.getElementById('finalWeight').value) / 100;
    const correction = document.getElementById('testCorrection').checked;

    const modal = document.getElementById('resultModal');
    const body = document.getElementById('modalBody');

    if (isNaN(current) || isNaN(target) || isNaN(weight)) {
        alert("Please enter all your grades first!");
        return;
    }

    // Optional Test Correction boost
    if (correction) {
        current += 2; 
    }

    const needed = (target - (current * (1 - weight))) / weight;
    
    let title = "You need a...";
    let sub = `to end with a ${target}%`;
    let emoji = "✍️";

    if (needed > 100) {
        emoji = "🚀";
        title = "Reach for the stars!";
    } else if (needed < 70) {
        emoji = "😎";
        title = "You're chilling!";
    } else if (needed <= 0) {
        emoji = "🥳";
        title = "You've already won!";
    }

    body.innerHTML = `
        <div style="font-size: 3rem;">${emoji}</div>
        <h3 style="margin-bottom: 0; color: #888; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">${title}</h3>
        <span class="result-number">${needed <= 0 ? "0" : needed.toFixed(1)}%</span>
        <p style="color: #666; margin-top: 0;">${sub}</p>
    `;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('resultModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('resultModal')) closeModal();
}
