import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogin = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                <h2>Sign in </h2>
            </button>
        )
    )
}

export default ButtonLogin;