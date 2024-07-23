

function Login ()  {
    const [ signin, setSignin ] = useState({ email: "", password: "" });
    const signinInput = (e) => {
        const { name, value } = e.target
        setSignin((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    return (
        <div>
            <h1>Sign-in</h1>
            <form>
                <label for='signinEmail'>Email:</label>
                <input 
                    id='signinEmail' 
                    type="email"
                    onChange={signinInput}
                /> 
                <label for='signinPassword' >Password:</label>
                <input 
                    id='signinPassword'
                    type='password'
                    onChange={signinInput}
                />
            </form>
            <button>Create a new account</button>
        </div>
    )
}