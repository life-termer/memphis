const Rules = () => {
    return (
        <div className="snake-rules">
            <h1>Controls</h1>
            <div className="d-flex flex-column">
                <p><span className="fw-bold">W</span> - Move Up</p>
                <p><span className="fw-bold">A</span> - Move Left</p>
                <p><span className="fw-bold">S</span> - Move Down</p>
                <p><span className="fw-bold">D</span> - Move Right / Start Game</p>    
                <p><span className="fw-bold">Space</span> - Reset</p>
            </div>
            
        </div>
    );
}

export default Rules;