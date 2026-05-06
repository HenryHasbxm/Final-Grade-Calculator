function applyCorrections() {
    const original = parseFloat(document.getElementById('originalScore').value);
    const display = document.getElementById('correctionResult');

    if (isNaN(original)) {
        display.innerText = "Please enter a score.";
        return;
    }

    // Logic: Half-credit back for missed points
    const missed = 100 - original;
    const regained = missed / 2;
    const newScore = original + regained;

    display.innerHTML = `New Corrected Score: 📝 ${newScore}%`;
}

function calculateFinalNeeded() {
    const current = parseFloat(document.getElementById('currentGrade').value);
    const target = parseFloat(document.getElementById('targetGrade').value);
    const weight = parseFloat(document.getElementById('finalWeight').value) / 100;
    const resultBox = document.getElementById('finalResult');

    if (isNaN(current) || isNaN(target) || isNaN(weight)) {
        resultBox.style.display = "block";
        resultBox.innerText = "Please fill in all fields above.";
        return;
    }

    // The Final Grade Formula
    const needed = (target - (current * (1 - weight))) / weight;

    resultBox.style.display = "block";
    if (needed > 100) {
        resultBox.innerHTML = `🎯 To get a ${target}%, you need a <strong>${needed.toFixed(1)}%</strong>.<br>That's over 100%! Time for extra credit.`;
    } else if (needed <= 0) {
        resultBox.innerHTML = `🎉 You already hit your goal! You could get a 0% and still have a ${target}%.`;
    } else {
        resultBox.innerHTML = `🎯 To get a ${target}%, you need to score <strong>${needed.toFixed(1)}%</strong> on the final.`;
    }
}
