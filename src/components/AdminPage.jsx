

const AdminPage = () => {

    return (
        <div>
            <h1>Store Admin</h1>
            <h3>Import Files</h3>
            <form>
                <input type="file" />
                <input type="submit" value="Upload" />
            </form>
            <h3>Change Store Hours</h3>
            <form>

                <label for="sundayopen">Sunday Open: </label><input id="sundayopen" type="time" /><br/>
                <label for="sundayclose">Sunday Close: </label><input id="sundayclose" type="time" /><br/>

                <label for="mondayopen">Monday Open: </label><input id='mondayopen' type="time" /><br/>
                <label for="mondayclose">Monday Close: </label><input id='mondayclose' type="time" /><br/>

                <label for="tuesdayopen">Tuesday Open: </label><input id="tuesdayopen" type="time" /><br/>
                <label for="tuesdayclose">Tuesday Close: </label><input id="tuesdayclose" type="time" /><br/>

                <label for="wednesdayopen">Wednesday Open: </label><input id="wednesdayopen" type="time" /><br/>
                <label for="wednesdayclose">Wednesday Close: </label><input id="wednesdayclose" type="time" /><br/>

                <label for="thursdayopen">Thursday Open: </label><input id="thursdayopen" type="time" /><br/>
                <label for="thursdayclose">Thursday Close: </label><input id="thursdayclose" type="time" /><br/>

                <label for="fridayopen">Friday Open: </label><input id='fridayopen' type="time" /><br/>
                <label for="fridayclose">Friday Close: </label><input id='fridayclose' type="time" /><br/>

                <label for="saturdayopen">Saturday Open: </label><input id='saturdayopen' type="time" /><br/>
                <label for="saturdayclose">Saturday Close: </label><input id='saturdayclose' type="time" /><br/>
            </form>
            <h3>Set Tax Rate</h3>
            <form>
                <input type="number" />
            </form>

        </div>
    )
}
export default AdminPage;