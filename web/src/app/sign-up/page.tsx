import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col items-center w-[513px] gap-8 py-12 rounded-sm bg-white">
        <h1 className="text-purple font-medium text-3xl">Cadastre-se</h1>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            Nome
          </label>
          <input
            type="text"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            E-mail
          </label>
          <input
            type="email"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            Senha
          </label>
          <input
            type="password"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-normal text-zinc-900">
            Confirmação de senha
          </label>
          <input
            type="password"
            className=" w-[449px] h-16 pl-2 rounded-md border border-gray-700 text-zinc-900"
          />
        </div>

        <button className="w-[448px] h-12 rounded-md bg-purple">
          Cadastre-se
        </button>

        <Link
          href="/sign-in"
          className="font-lato font-bold text-sm text-purple"
        >
          Já tem cadastro? clique aqui!
        </Link>
      </form>
    </div>
  )
}
