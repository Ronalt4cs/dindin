import Link from 'next/link'

export default function SignIn() {
  return (
    <div className="flex items-center justify-center gap-24">
      <div className="flex flex-col gap-8 w-[600px]">
        <p className="font-bold text-5xl">
          Controle suas <span className="text-purple">finanças</span>, sem
          planilha chata.
        </p>
        <p className="text-3xl font-normal">
          Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
          tudo num único lugar e em um clique de distância.
        </p>
        <Link href="/sign-up">
          <button className="w-72 h-12 rounded-md bg-purple">
            cadastre-se
          </button>
        </Link>
      </div>

      <form className="flex flex-col items-center w-[513px] h-[535px] rounded-sm bg-white">
        <h1 className="text-purple font-medium text-3xl my-14">Login</h1>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            E-mail
          </label>
          <input
            type="email"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <div className="flex flex-col mt-8 mb-16">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            Senha
          </label>
          <input
            type="password"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <Link href="/">
          <button className="w-[448px] h-12 rounded-md bg-purple">
            Entrar
          </button>
        </Link>
      </form>
    </div>
  )
}
