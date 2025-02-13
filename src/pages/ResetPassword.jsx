import { useNavigate } from "react-router-dom";
import useAuthenticateUser from "../hooks/useAuthenticateUser";

export default function ResetPassword() {
    const { email, setEmail, handleResetPassword, passwordResetSuccess } = useAuthenticateUser();
    const navigate = useNavigate();
    return (
        <div className="w-full">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-custom-yellow">
                <div className="max-w-sm mx-auto">
                    {passwordResetSuccess ? (
                        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                            <h3 className="mt-10 text-center text-xl/9 tracking-tight text-gray-900 ">
                                Password reset link sent to <span className="font-bold">{email}</span>.
                            </h3>
                            <button
                                onClick={() => navigate("/")}
                                className="my-12 flex w-full justify-center rounded-md bg-orange-500 hover:bg-orange-700 text-white px-3 py-1.5 text-sm/6 font-semibold   shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Home
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                    Reset your password
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form
                                    className="space-y-6"
                                    action="#"
                                    method="POST"
                                    onSubmit={(e) => handleResetPassword(e, email)}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-orange-500 hover:bg-orange-700 text-white px-3 py-1.5 text-sm/6 font-semibold   shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                            Send Password Reset Link
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
