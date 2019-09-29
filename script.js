function TicTacToeGame () {
    this.gameContainer = document.querySelector('#game-container'); // nasz konstruktor
    this.xUser = 'x';
    this.oUser = 'o';
    this.currentUser = this.xUser; 
    this.win = false;   
}

TicTacToeGame.prototype.results = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b2', 'c3'],
    ['c1', 'b2', 'a3']

];

TicTacToeGame.prototype.init = function() {
    if(this.modal !== undefined) {
        this.modal.close();
    }

    const xUser = document.querySelector('#x-user').value;
    const oUser = document.querySelector('#o-user').value;

    if (xUser!== oUser && !this.win) {
    const table = this.createTable();
    this.gameContainer.innerHTML = '';
    this.gameContainer.appendChild(table);
    this.currentUser = this.xUser;
    this.xUser = xUser;
    this.oUser = oUser;
    } else if(this.win) {
        this.win = false;
        this.init();
    } else {
        this.modal = new Modal('Wprowadź róźne iomiona')
    }
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
    cell.id = id;
    cell.dataset.value = '';
    cell.addEventListener('click', this.cellClickHandler.bind(this));

    return cell;
};
TicTacToeGame.prototype.cellClickHandler = function(event) {
    
    const cell = event.target;
    if(cell.innerHTML !== '' || this.win) {
        return;
    }
    if(this.currentUser === this.xUser) {
        cell.innerHTML = '&times;';
        cell.dataset.value = 'x';
        
    }
    else {
        cell.innerHTML = '&cir;';
        cell.dataset.value = 'o';
            
        }
    this.win = this.checkResults();
    
    if(this.win) {
        this.modal = new Modal('Wygrał ' + this.currentUser, this.init.bind(this));
    } else {
        this.currentUser = this.currentUser === this.xUser ? this.oUser : this.xUser;
    }
};

TicTacToeGame.prototype.checkResults = function () {
    let win = false;
    for (let idx = 0; idx < this.results.length; idx++) {
        const resRow = this.results[idx];
        const result = resRow.map(function(id){
            const cell = document.querySelector('#' + id);
            return cell.dataset.value;
        }).join('');
        if(result === 'xxx'  || result === 'ooo') {
            console.log('Wygrał');
            win = true;
        }
    }
    return win;
};

function Modal(message, closeCallback) {
    this.closeCallback = closeCallback;
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
    if(this.closeCallback !== undefined && this.win) {
        this.closeCallback();
    }
};

const game = new TicTacToeGame();
const button = document.querySelector('#start-game');

const xUser = document.querySelector('#x-user');
const oUser = document.querySelector('#o-user');

function checkNames() {
    if(xUser.value !== '' && oUser.value !== '') {
        button.disabled = false;
    }
}

xUser.addEventListener('input', checkNames);
oUser.addEventListener('input', checkNames);

button.addEventListener('click', function() {
  game.init();
});

//const modal = new Modal("lorem ipsum fortunatum");