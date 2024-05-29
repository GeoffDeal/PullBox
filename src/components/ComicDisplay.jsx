function ComicsDisplay (props) {
    const comicList = [
        {id: 0, image: 'https://www.universaldist.com/api/v1/images/d2083b1b-30b6-4be1-b06d-56cfc9ef75c0/raw?size=l', cost: 3.99},
        {id: 1, image: 'https://www.universaldist.com/api/v1/images/85534557-bd7b-434b-8810-c44ea775a9d9/raw?size=l', cost: 4.99},
        {id: 2, image: 'https://www.universaldist.com/api/v1/images/36bc27ba-e3f5-458e-b48d-48f22665fcf9/raw?size=l', cost: 4.99},
        {id: 3, image: 'https://www.universaldist.com/api/v1/images/fc12be6e-f4e1-4d1e-ba9f-0305b2e741de/raw?size=l', cost: 3.99},
        {id: 4, image: 'https://www.universaldist.com/api/v1/images/185bfe8c-26b3-4198-969d-74d62822ac03/raw?size=l', cost: 5.99}
    ]
    const totalCost = () => {
        const preTax = comicList.reduce((sum, current) => sum + current.cost, 0 );
        return Math.round(preTax * 115) / 100;
    }

    return (
        <div className="bookDisplay">
            <button className="scrollButton scrollLeft"><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="imageContainer">
                {comicList.map((book) => <img src={book.image} key={book.id} alt="Comic Cover" />)}
            </div>
            <button className="scrollButton scrollRight"><span className="material-symbols-outlined">chevron_right</span></button>
            <p>Your expected total this week: ${totalCost()}</p>
        </div>
    )
}

export default ComicsDisplay;