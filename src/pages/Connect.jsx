function Connect({
  emailLogin,
  passwordLogin,
  emailRegister,
  passwordRegister,
  setEmailLogin,
  setPasswordLogin,
  setEmailRegister,
  setPasswordRegister,
  nameRegister,
  setNameRegister,
  handleRegister,
  handleLogin,
}) {
  const style = {
    submit: "w-fit m-auto px-10 py-2 text-sm shadow-lg rounded-lg ",
    form: "flex flex-col gap-3 justify-center",
    input: "w-fit h-12 px-4 py-1 rounded-md shadow-md text-gray-800 focus:outline-none"
  };

  return (
    <section className="flex flex-col gap-20 justify-items-center items-center m-auto">
      <form onSubmit={handleLogin} className={style.form}>
        <input
          className={style.input}
          type="email"
          placeholder="Email"
          value={emailLogin || ""}
          onChange={(e) => setEmailLogin(e.target.value)}
        />
        <input
        className={style.input}
          type="password"
          placeholder="Password"
          value={passwordLogin || ""}
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <button
          type="submit"
          className={`${style.submit} text-gray-800 bg-gray-100 active:text-gray-900 hover:bg-gray-200 hover:text-gray-600`}
        >
          Login
        </button>
      </form>

      <form onSubmit={handleRegister} className={style.form}>
        <input
        className={style.input}
          type="email"
          placeholder="Email"
          value={emailRegister || ""}
          onChange={(e) => setEmailRegister(e.target.value)}
        />
        <input
        className={style.input}
          type="password"
          placeholder="Password"
          value={passwordRegister || ""}
          onChange={(e) => setPasswordRegister(e.target.value)}
        />
        <input
        className={style.input}
          type="text"
          placeholder="Name"
          value={nameRegister || ""}
          onChange={(e) => setNameRegister(e.target.value)}
        />
        <button
          type="submit"
          className={`${style.submit} text-white bg-gradient-to-r from-pink-600 to-pink-400 active:text-purple-900 ease-in-out duration-200 hover:from-pink-500 hover:to-pink-500`}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default Connect;
