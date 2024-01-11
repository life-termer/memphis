const Rules = () => {
    return (
        <div className="snake-rules">
            <h1>Controls</h1>
            <div className="d-flex flex-column">
                <p><span className="fw-bold">W</span> - Up</p>
                <p><span className="fw-bold">A</span> - Left</p>
                <p><span className="fw-bold">S</span> - Down</p>
                <p><span className="fw-bold">D</span> - Right / Start Game</p>    
                <p><span className="fw-bold">Space</span> - Reset</p>
            </div>
            
        </div>
    );
}

export default Rules;