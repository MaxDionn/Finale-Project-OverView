import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogout = () => {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() => logout()}>
                <h2>Sign out </h2>
            </button>
        )
    )
}

export default ButtonLogout;