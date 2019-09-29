function TicTacToeGame () {
    this.gameContainer = document.querySelector('#game-container'); // nasz konstruktor
    this.xUser = 'x';
    this.oUser = 'o';
    this.currentUser = this.xUser;    
}

TicTacToeGame.prototype.init = function() {
    const table = this.createTable();
    this.gameContainer.innerHTML = '';
    this.gameContainer.appendChild(table);
};
TicTacToeGame.prototype.createTable = function () {
    const table = document.createElement('table');
    ['1', '2', '3'].forEach(function (rowId) {
        const row = this.createRow(rowId);
        table.appendChild(row); // dodaj element
    }.bind(this));
    return table;
};

TicTacToeGame.prototype.createRow = function (rowId) {
    const row = document.createElement('tr');
    ['a', 'b', 'c'].forEach(function (col) {
        const cell = this.createCell(col + rowId);
        row.appendChild(cell); // dodaj element
    }.bind(this));
    return row; // na koniec zwracamy wiersz
};

TicTacToeGame.prototype.createCell = function (id) {
    const cell = document.createElement('td');
    cell.className = 'cell';
    cell.addEventListener('click', this.cellClickHandler.bind(this));
    cell.id = id;
    return cell;
};
TicTacToeGame.prototype.cellClickHandler = function(event) {
    const cell = event.target;
    if(cell.innerHTML !== '') {
        return;
    }
    if(this.currentUser === this.xUser) {
        cell.innerHTML = '&times;';
        this.currentUser = this.oUser;
    }
    else {
            cell.innerHTML = '&cir;';
            this.currentUser = this.xUser;
        }
};

function Modal(message) {
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'modal';
    this.modalEl.innerHTML = '<p>' + message + '</p>'; // innerHTML
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Zamknij'; // innerText
    closeButton.addEventListener('click', this.close.bind(this));
    
    this.modalEl.appendChild(closeButton);
    document.documentElement.appendChild(this.modalEl);
}

Modal.prototype.close = function() {
    this.modalEl.remove(); //remove - usuwa stworzony wcześniej element
};

const game = new TicTacToeGame();

document.querySelector('#start-game').addEventListener('click', function() {
    game.init();
});

//const modal = new Modal("lorem ipsum fortunatum");