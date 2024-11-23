
import { TextField, styled } from "@mui/material";



export function BusquedaComunidades() {
  return (
    <>
      <section className="flex border-b border-gray-400">
        <div className="w-full">
          <form action="" className="w-1/3">
            <div class="flex items-center border rounded-2xl bg-gray-200 p-2 w-full max-w-lg">         
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-gray-600 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>       
              <input
                type="text"
                placeholder="Escribe el nombre de la persona o comunidad"
                class="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-600 focus:ring-0 focus:outline-none text-xl"
              />
            </div>
          </form>
        </div>
      </section>
      <section>

      </section>
    </>
  )
}
