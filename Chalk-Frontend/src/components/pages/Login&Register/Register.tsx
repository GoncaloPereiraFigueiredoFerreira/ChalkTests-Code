import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLogo } from "../../MainLogo";
import { User, UserContext, UserRole } from "../../../UserContext";
import { useGoogleLogin } from "@react-oauth/google";
import { HiExclamation } from "react-icons/hi";
import { APIContext } from "../../../APIContext";
import { Toast } from "flowbite-react";
import { GraduateIcon, TeacherIcon } from "../../objects/SVGImages/SVGImages";

enum ErrorType {
  NOERROR = 0,
  IN_USE = 1,
  FILL = 2,
  NTRIES = 3,
  NOMATCH = 4,
  UNKNOWN = 5,
  MISS = 6,
}

function defaultIcon(role: UserRole): string {
  switch (role) {
    case UserRole.SPECIALIST:
      return "https://cdn-icons-png.flaticon.com/512/6681/6681354.png";
    case UserRole.STUDENT:
      return "https://cdn-icons-png.flaticon.com/512/194/194931.png";
    default:
      return "";
  }
}

function renderErrorToast(err: ErrorType, setError: Function) {
  let message = "";
  switch (err) {
    case ErrorType.NOERROR:
      return <></>;
    case ErrorType.IN_USE:
      message = "Username is already in use!";
      break;
    case ErrorType.NOMATCH:
      message = "Passwords do not match!";
      break;
    case ErrorType.MISS:
      message = "Missing username or password!";
      break;
    default:
      message = "Unknown error!";
  }
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <Toast>
        <div className=" inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 font-normal">{message}</div>
        <Toast.Toggle onClick={() => setError(0)} />
      </Toast>
    </div>
  );
}

export function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCPass] = useState("");
  const [role, setRole] = useState("");
  const [error, setErrorState] = useState(ErrorType.NOERROR);
  const { contactAUTH, contactBACK } = useContext(APIContext);
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const customGoogleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => {
      submitGoogleRegister(codeResponse.access_token);
    },
    flow: "implicit",
  });

  const submitGoogleRegister = (acessToken: any) => {
    contactAUTH("google", "POST", undefined, {
      acess_token: acessToken,
      role: role,
    }).then((response) => handleUserRegister(response));
  };

  const submitNormalRegister = () => {
    if (password === cpass) {
      contactAUTH("register", "POST", undefined, {
        email: email,
        name: name,
        password: password,
        role: role,
      }).then((response) => handleUserRegister(response));
    } else setErrorState(ErrorType.NOMATCH);
  };

  const handleUserRegister = (response: Response) => {
    switch (response.status) {
      case 200:
        response.json().then((result: any) => {
          const userInfo: User = {
            email: result.user.username,
            name: result.user.name,
            photoPath: defaultIcon(role),
            role: result.user.role,
            courses: [],
            id: "",
          };
          switch (result.user.role) {
            case "STUDENT":
              contactBACK("students", "POST", undefined, userInfo).then(
                (user) => {
                  userInfo["id"] = user.id;
                  userInfo["photoPath"] = user.photoPath;
                  login(userInfo);
                  navigate("/webapp");
                }
              );
              break;
            case "SPECIALIST":
              contactBACK("specialists", "POST", undefined, userInfo).then(
                (user) => {
                  userInfo["id"] = user.id;
                  userInfo["photoPath"] = user.photoPath;
                  login(userInfo);
                  navigate("/webapp");
                }
              );

              break;
          }
        });
        break;
      case 400:
        setErrorState(ErrorType.MISS);
        break;
      case 403:
        response.json().then((result: any) => {
          if (result.err.name == "UserExistsError")
            setErrorState(ErrorType.IN_USE);
          else setErrorState(ErrorType.MISS);
        });

        break;
      default:
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between p-16">
          <div className="flex justify-center mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
            <MainLogo size="big"></MainLogo>
          </div>

          <div className=" mb-12 mr-20 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <div
                className={` overflow-hidden transition-opacity duration-300 ease-in-out ${
                  role !== "" ? "h-0 opacity-0" : "opacity-100 h-auto"
                } flex-col flex items center`}
              >
                <p className="mb-0 mr-4 text-2xl">Escolhe a tua identidade:</p>
                <div
                  className={`flex m-10 justify-between items-center space-x-4`}
                >
                  <label
                    htmlFor="roleProfessor"
                    className={`flex flex-1 p-20 flex-col border-2 rounded-lg items-center active:scale-95  ${
                      role === UserRole.SPECIALIST
                        ? "bg-blue-400 border-blue-600"
                        : "border-zinc-300 hover:border-blue-300 hover:bg-blue-200"
                    }`}
                  >
                    <TeacherIcon />
                    <p className="select-none">Especialista</p>
                  </label>
                  <input
                    id="roleProfessor"
                    name="role"
                    value={UserRole.SPECIALIST}
                    type="radio"
                    className="hidden"
                    onChange={() => setRole(UserRole.SPECIALIST)}
                    checked={role === UserRole.SPECIALIST}
                  />
                  <label
                    htmlFor="roleStudent"
                    className={`flex flex-1 p-20 flex-col border-2 rounded-lg transition-all duration-75  items-center active:scale-95 ${
                      role === UserRole.STUDENT
                        ? "bg-blue-400 border-blue-600 "
                        : "border-zinc-300 hover:border-blue-300 hover:bg-blue-200"
                    }`}
                  >
                    <GraduateIcon />
                    <p className="select-none">Aluno</p>
                  </label>
                  <input
                    id="roleStudent"
                    value={UserRole.STUDENT}
                    name="role"
                    type="radio"
                    className="hidden"
                    onChange={() => setRole(UserRole.STUDENT)}
                    checked={role === UserRole.STUDENT}
                  />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-opacity duration-300 ease-in-out ${
                  role !== "" ? "opacity-100 h-auto" : "h-0 opacity-0"
                } flex-col flex items center`}
              >
                <div
                  className={`flex flex-col space-y-4 items-center justify-center lg:justify-start`}
                >
                  <p className="mb-0 mr-4 text-2xl">Create an account with</p>

                  <a
                    className="mb-3 bg-white text-black flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                    onClick={() => customGoogleRegister()}
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    Continue with Google
                  </a>
                  <a
                    className="mb-3 bg-blue-700 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                    href="#!"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    Continue with Facebook
                  </a>
                  <a
                    className="mb-3 bg-blue-400 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                    href="#!"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    Continue with Twitter
                  </a>
                </div>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    name="name"
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15]"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    name="email"
                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15]"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    name="password"
                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15]"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    name="cpassword"
                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15]"
                    placeholder="Confirm Password"
                    onChange={(e) => setCPass(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <a href="#!" className="text-blue-600">
                    Forgot password?
                  </a>
                </div>

                <div className="flex  justify-between text-center lg:text-left">
                  <button
                    type="button"
                    onClick={() => submitNormalRegister()}
                    className="inline-block rounded bg-slate-700 px-7 pb-2.5 pt-3 text-sm font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("")}
                    className="inline-block rounded bg-slate-700 px-7 pb-2.5 pt-3 text-sm font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Go to Role Selection
                  </button>
                </div>
              </div>
            </form>
            <span className="flex mb-0 mt-2 pt-1 text-sm font-semibold space-x-2">
              <p>Already have an account?</p>
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </span>
          </div>
          {renderErrorToast(error, setErrorState)}
        </div>
      </div>
    </section>
  );
}
