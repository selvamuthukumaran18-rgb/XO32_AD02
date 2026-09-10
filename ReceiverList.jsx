function ReceiverList({ receivers }) {
    return (
        <div>
            <h3>RECEIVERS</h3>

            {receivers.length === 0 ? (
                <p>No receivers acknowledged yet.</p>
            ) : (
                receivers.map((receiver) => (
                    <div
                        className="receiver"
                        key={receiver}
                    >
                        ✓ {receiver}
                    </div>
                ))
            )}
        </div>
    );
}

export default ReceiverList;