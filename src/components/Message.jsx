function Message (props) {
    return (
        <div className="messageContainer">
            <h3>{ props.title }</h3>
            <p>{ props.message }</p>
            <p className="dateText">{ props.date }</p>
        </div>
    )
}

export default Message;