import useAuthenticateUser from "../hooks/useAuthenticateUser";

export default function Login() {
    const { handleSignIn, signedIn, email, setEmail, password, setPassword, error, errorMessage, handlePasswordReset } =
        useAuthenticateUser();

    return (
        <section className="flex flex-col justify-center items-center s:w-full w-full my-auto">
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-custom-yellow rounded">
                {!signedIn ? (
                    <div className="max-w-sm mx-auto min-h-full">
                        {error && <p className="text-red-500">{errorMessage}</p>}
                        <div className="sm:mx-auto w-full">
                            <h2 className="text-center text-2xl/9 font-bold tracking-tight  ">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                id="login-form"
                                className="space-y-6"
                                action="#"
                                method="POST"
                                onSubmit={(e) => handleSignIn(e)}>
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium   ">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            value={email}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#364688] sm:text-sm/6"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm/6 font-medium   ">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                href="/ResetPassword"
                                                className="font-semibold text-[#364688]"
                                                onClick={() => handlePasswordReset(email)}>
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base    outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#364688] sm:text-sm/6"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-[#364688] hover:bg-indigo-700 text-white px-3 py-1.5 text-sm/6 font-semibold   shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#364688]">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div>You are already signed in.</div>
                )}
            </div>
        </section>
    );
}
