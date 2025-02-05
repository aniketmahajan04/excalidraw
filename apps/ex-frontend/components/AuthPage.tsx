export function AuthPage ({isSignin}: {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded">
            <div className="p-2">
                <input type="text" placeholder="Email"></input>
            </div>
            <div className="p-2">
                <input type="password" placeholder="password"></input>
            </div>
            <div className="text-black pt-2 flex justify-center items-center">
                <button onClick={() => {

                }}>{isSignin? "Sign in" : "sign up"}</button>
            </div>
        </div>
    </div>
}