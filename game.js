// game.js
document.getElementById('start-game').addEventListener('click', function () {
    const lowerRange = parseInt(document.getElementById('lower-range').value);
    const upperRange = parseInt(document.getElementById('upper-range').value);
    if (isNaN(lowerRange) || isNaN(upperRange) || upperRange - lowerRange < 10 || lowerRange < 0 || upperRange <= lowerRange) {
        alert("Please enter a valid range (difference greater than or equal to 10, non-negative lower bound, and upper bound greater than lower bound).");
        return;
    }
    
    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'block';
    
    let randomNumber = Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
    let lives = 10; // Default for easy level
    
    const levels = {
        '1': 10,
        '2': 5,
        '3': 3,
        '4': 1
    };

    // Handle difficulty selection with buttons
    document.querySelectorAll('#difficulty-selection button').forEach(button => {
        button.addEventListener('click', function () {
            const level = this.getAttribute('data-level');
            lives = levels[level];
            
            document.getElementById('difficulty-selection').style.display = 'none';
            document.getElementById('game-play').style.display = 'block';
            document.getElementById('lives').textContent = `You have ${lives} lives`;
        });
    });

    document.getElementById('submit-guess').addEventListener('click', function () {
        const guess = parseInt(document.getElementById('guess').value);
        if (isNaN(guess) || guess < lowerRange || guess > upperRange) {
            alert(`Please guess a number within the range ${lowerRange} to ${upperRange}.`);
            return;
        }
        
        if (guess === randomNumber) {
            document.getElementById('feedback').textContent = "You guessed correct!";
            endGame(true);
        } else {
            lives -= 1;
            if (lives > 0) {
                document.getElementById('lives').textContent = `You have ${lives} lives left`;
                document.getElementById('feedback').textContent = "You guessed incorrect!";
            } else {
                document.getElementById('feedback').textContent = `You lose! The correct number was ${randomNumber}.`;
                endGame(false);
            }
        }
    });
    
    function endGame(win) {
        document.getElementById('game-play').style.display = 'none';
        document.getElementById('game-result').style.display = 'block';
        document.getElementById('result').textContent = win ? "Congratulations, You Won!" : "Game Over!";
        
        document.getElementById('play-again').addEventListener('click', function () {
            document.getElementById('game-result').style.display = 'none';
            document.getElementById('game-setup').style.display = 'block';
            document.getElementById('guess').value = '';
            document.getElementById('feedback').textContent = '';
        });
    }
});
