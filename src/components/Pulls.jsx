import ComicsDisplay from "./ComicDisplay";

function Pulls () {
    return (
        <>
            <h1>Pulls and Subs</h1>
            <h3>Your pulls for this week:</h3>
            <ComicsDisplay />
            <h3>Your subscription list:</h3>
            <ul id="bookSubs"></ul>
        </>
    )

}

export default Pulls;