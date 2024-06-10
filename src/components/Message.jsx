function Message (props) {
    return (
        <div className="messageContainer">
            <h3>{ props.title }</h3>
            <p>{ props.body }</p>
            <p className="dateText">{ props.date }</p>
        </div>
    )
}

export default Message;