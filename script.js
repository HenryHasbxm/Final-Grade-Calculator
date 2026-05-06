const messages = {
    impossible: [
        "Yeah, no.",
        "Maybe next time?",
        "In your dreams.",
        "Better luck in summer school.",
        "Is extra credit an option? Because you'll need it."
    ],
    difficult: [
        "It's possible, but stay off TikTok.",
        "Lock in.",
        "You're going to need a miracle.",
        "Possible, but unlikely."
    ],
    easy: [
        "You could do this in your sleep.",
        "Chill. You're fine.",
        "Basically a victory lap.",
        "Don't even bother studying."
    ],
    safe: [
        "You literally can't fail.",
        "Why are you even checking this?",
        "Go outside and touch some grass.",
        "You've already won."
    ]
};

function showPopup() {
    const current = parseFloat(document.getElementById('currentGrade').value);
    const target = parseFloat(document.getElementById('targetGrade').value);
    const weight = parseFloat(document.getElementById('finalWeight').value) / 100;

    const modal = document.getElementById('resultModal');
    const body = document.getElementById('modalBody');

    if (isNaN(current) || isNaN(target) || isNaN(weight)) {
        alert("Enter the numbers first.");
        return;
    }

    const needed = (target - (current * (1 - weight))) / weight;
    
    // Select the message bank based on difficulty
    let bank;
    if (needed > 100) bank = messages.impossible;
    else if (needed > 85) bank = messages.difficult;
    else if (needed > 0) bank = messages.easy;
    else bank = messages.safe;

    // Pick a random message from the bank
    const randomMessage = bank[Math.floor(Math.random() * bank.length)];

    body.innerHTML = `
        <h3 style="text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; color: #888;">You need a</h3>
        <span class="result-number">${needed <= 0 ? "0" : needed.toFixed(1)}%</span>
        <p style="font-style: italic; color: #555; margin-top: 10px;">"${randomMessage}"</p>
        <p style="font-size: 0.85rem; color: #aaa;">to end with a ${target}%</p>
    `;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('resultModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('resultModal')) closeModal();
}
