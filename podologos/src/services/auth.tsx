import { toast } from "react-toastify";

type User = {
  email: string;
  password: string;
};

export async function SignInRequest({ email, password }: User) {
  try {
    const user = { email: email, password: password };
    const response = await toast.promise(
      api.post("/auth/signin", user, {
        withCredentials: true,
      }),
      {
        pending: "Please wait...",
        success: "Login successful",
        error: "Error while logging in",
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
