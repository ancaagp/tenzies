import './style.css';
import Die from './Die';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

// get random number between min and max inclusive
const getRandom = (min, max) => {
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max-min+1) +min);
}

function App(){
    const [dice, setDice] = useState(allNewDice());
    const [won, setWon] = useState(false);

    function generateNewDie() {
        return {
            id: nanoid(),
            value: getRandom(1,6),
            isHeld: false
        }
    }

    // create an array with 10 random numbers from 1 to 6
    function allNewDice () {
        const randomArray = [];
        while (randomArray.length < 10){
            randomArray.push(generateNewDie())
        }
        return randomArray;
    }

    function holdDice(id){
        setDice(prevState => prevState.map(die=>{
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} : 
                die
        }))
    }

    function rollDice() {
        if (won) {
            setDice(allNewDice());
            setWon(false)
        }
        setDice(prevState => prevState.map(die=>{
                return die.isHeld ? 
                die : 
                generateNewDie()
            })
        )
    }

    useEffect(() => {
        // checks all elements in an array for true values given the condition
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allHeld && allSameValue) {
            setWon(true);
        } 
    },[dice])

    const renderedDice = dice.map(die=>{
        return <Die 
                    key={die.id} 
                    value={die.value} 
                    isHeld={die.isHeld}
                    holdDice={holdDice}
                    id={die.id}
                />
    })


    return (
        <main>
            {won && <Confetti /> }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='die-container'>
                {renderedDice}
            </div>
            <button onClick={rollDice} className='roll-dice-btn'>
                {won ? "New game" : "Roll"}
                </button>
         </main>
    )
}

export default App;