function getNeeded() {
    let current = parseFloat(document.getElementById('currentGrade').value);
    const target = parseFloat(document.getElementById('targetGrade').value);
    const weight = parseFloat(document.getElementById('finalWeight').value) / 100;
    const correction = document.getElementById('testCorrection').checked;

    if (isNaN(current) || isNaN(target) || isNaN(weight)) return null;

    // Simulate test correction: adds a small boost to current grade (approx 2% increase)
    if (correction) {
        current += 2; 
    }

    // Formula: (Target - (Current * (1 - Weight))) / Weight
    return (target - (current * (1 - weight))) / weight;
}

function liveCalculate() {
    const needed = getNeeded();
    const display = document.getElementById('liveResult');

    if (needed === null) {
        display.innerText = "";
        return;
    }

    display.innerText = `You need a ${needed.toFixed(1)}% on the final.`;
}

function showPopup() {
    const needed = getNeeded();
    const modal = document.getElementById('resultModal');
    const body = document.getElementById('modalBody');

    if (needed === null) {
        alert("Please enter your grades first!");
        return;
    }

    let extraMessage = "";
    if (needed > 100) {
        extraMessage = "<p>Ouch! You'll need some extra credit to pull this off.</p>";
    } else if (needed < 60) {
        extraMessage = "<p>You're in good shape! Take a nap.</p>";
    } else {
        extraMessage = "<p>Study hard, you've got this!</p>";
    }

    body.innerHTML = `
        <h2 style="color: #007bff">${needed.toFixed(1)}%</h2>
        <p>That is what you need on your final exam to end with a <strong>${document.getElementById('targetGrade').value}%</strong>.</p>
        ${extraMessage}
    `;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('resultModal').style.display = "none";
}

// Close on outside click
window.onclick = function(event) {
    if (event.target == document.getElementById('resultModal')) closeModal();
}
