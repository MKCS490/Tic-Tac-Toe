import React, { useState, useEffect } from 'react';
import { calculateWinner } from './Winner.js';
import Board from './Board';
import { io } from 'socket.io-client';

const socket = io(); // Connects to socket connection

const styles = {
    color: 'blue',
    width: '200px',
    margin: '20px auto',
};

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("")
    const winner = calculateWinner(board);

    socket.on('users', (data) => {
        console.log('users event received');
        setUsers(data);
    })

    socket.on('xisnext', (data) => {
        console.log('xisnext event received');
        setXisNext(data);
    })

    function handleClick(i) {
        if (isSpectator()) return;
        if (username === users[0] && !xIsNext) return;
        if (username === users[1] && xIsNext) return;
        const boardCopy = [...board];
        if (winner || boardCopy[i]) return;
        boardCopy[i] = xIsNext ? 'X' : 'O';
        setBoard(boardCopy);
        socket.emit('game', { boardCopy: boardCopy });
        socket.emit('nextplayer', { xIsNext: xIsNext })
    }

    useEffect(() => {

        socket.on('game', (data) => {
            console.log('game event received!');
            console.log(data);
            setBoard(data.boardCopy);
            setXisNext(data.prevNext);
        })
    }, [board]);

    function renderMoves() {
        return (
            <div>
                <button onClick={() => {
                    setBoard(Array(9).fill(null));
                    socket.emit('game', { boardCopy: Array(9).fill(null) });
                    socket.emit('nextplayer', { xIsNext: false })
                }}>
                    Start Game
            </button>
            </div>
        )
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setIsLogedIn(true);
        socket.emit('login', { username: username });
    }

    function isSpectator() {
        const [x, o] = users;
        if (username === x || username === o) return false;
        return true;
    }

    function renderSpectators() {
        if (users.length < 2) return [];
        const [, , ...spectators] = users;
        return spectators.map(spectator => <li>{spectator}</li>);
    }

    function renderCompetitors() {
        if (users.length < 2) return null;
        return <h1 style={{ display: 'flex', justifyContent: 'center' }}>{users[0]} vs {users[1]}</h1>;
    }
    
    return (
        isLogedIn ?
            (
                <div>
                    {renderCompetitors()}
                    <Board squares={board} onClick={handleClick} />
                    <div style={styles}>

                        <p>{winner ? `Winner: ${winner === 'X' ? users[0] : users[1]}` : 'Next Player: ' + (xIsNext ? users[0] : users[1])}</p>
                        {renderMoves()}
                    </div>
                    <h1>Spectators</h1>
                    <ul>{renderSpectators()}</ul>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )
    )
}

export default Game;