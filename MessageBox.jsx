function MessageBox({ message, onChange }) {
    return (
        <textarea
            value={message}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter message / URL"
            maxLength={200}
        />
    );
}

export default MessageBox;