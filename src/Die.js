import './style.css';

function Die(props){
    return (
        // alternative to conditional rendering
        // const styles = {
        //     backgroundColor: props.isHeld ? "#59E391" : "white"
        // }
        // <div style={styles}></div>

            <div 
                className={`${props.isHeld ? 'die-selected' : 'die'}`}
                onClick = {()=>props.holdDice(props.id)}
            >
                <h2 className='die-number'>{props.value}</h2>
            </div>
    )
}

export default Die;
