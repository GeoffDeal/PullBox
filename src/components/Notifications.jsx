import Message from "./Message";

function Notifications () {
    const messageArray = [
        {title: 'Flash Sale', date: 'June 8th, 2024', message: 'All back issues are 50% for the weekend!'},
        {title: 'Free Comic Book Day', date: 'May 2nd, 2024', message: 'Free Comic Book Day is this Saturday! Great sales storewide!'},
        {title: 'Another Test', date: 'April 21st, 2024', message: 'This is going to be a really long text to test what it looks like when a longer message is posted. Lorem etc etc, should really use a lorem generator but I am invested now'},
        {title: 'Test Post', date: 'April 20th, 2024', message: 'Testing, testing, 1, 2, 3'}
    ];
    
    return (
        <>
            <h1>Notifications</h1>
            <div className="messageBox">
                {messageArray.map((message, index) => (
                    <Message key={ index } title={ message.title } date={ message.date } message={ message.message} />
                ))}
            </div>
        </>
    ) 
}

export default Notifications;