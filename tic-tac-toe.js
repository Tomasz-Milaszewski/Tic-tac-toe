var round = 0; //os are starting
var crosses = [];
var os = [];
var winningTable = ["012", "345", "678", "036", "147", "258", "048", "246"];
var infoPanel = document.querySelector('.infoPanel');
var infoPanelText = document.querySelector('span');

document.addEventListener('click', function (event) {
    var clicked = event.target;
    // validation if click is on board
    if (!clicked.classList.contains('cell')) {
        return;
    }
    // validation if click is on empty cell
    if (clicked.innerText === 'X' || clicked.innerText === 'O') {
        return;
    }
    // adds clicked elements number classes to their result arrays (os and crosses) and adds content
    if (round % 2 === 0) {
        os.push(clicked.className);
        clicked.innerText = 'O';
        infoPanelText.innerText = 'X turn'
    } else {
        crosses.push(clicked.className);
        clicked.innerText = 'X';
        infoPanelText.innerText = 'O turn'
    }
    // counts round number            
    round += 1;
    // winning condition
    if (round >= 5) {
        var osResult = os.join('').match(/\d+/g).sort().join('');
        var crossesResult = crosses.join('').match(/\d+/g).sort().join('');
        var results = [osResult, crossesResult];
        var signs = ['O', 'X']
        round % 2 === 0 ? win(results[1],signs[1]) : win(results[0],signs[0]) 
    }
})

function win(signResult, sign) {
    if (winningTable.some(code => signResult.includes(code[0]) && signResult.includes(code[1]) && signResult.includes(code[2])) === true) {
        infoPanelText.innerText = sign + ' wins';
        infoPanel.style.backgroundColor = 'lightgreen';
        setTimeout(function () {
            infoPanelText.innerText = 'Play again';
            infoPanel.style.backgroundColor = 'lightgrey';
            infoPanel.style.cursor = 'pointer';
            infoPanel.addEventListener('click', function () { window.location.reload() })
        }, 1000)
    } else {
        if (round === 9) {
            infoPanelText.innerText = 'Draw';
            infoPanel.style.backgroundColor = 'lightsalmon';
            setTimeout(function () {
                infoPanelText.innerText = 'Play again';
                infoPanel.style.backgroundColor = 'lightgrey';
                infoPanel.style.cursor = 'pointer';
                infoPanel.addEventListener('click', function () { window.location.reload() })
            }, 1000);
        }
    }
}
    
