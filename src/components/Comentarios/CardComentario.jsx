import mujer from '../../assets/avatares/mujer.png'

export function CardComentario({ userName, texto, perfil}) {
  const maxWords ='70'
  const wordsArray = texto.split(' ');
  const truncatedText = wordsArray.length > maxWords
    ? wordsArray.slice(0, maxWords).join(' ') + '...'
    : texto;

  return (
    <div className="containerHome">
      <div className="right-column place-items-center">
        <div className="max-w-[630] place-items-center"></div>
        <section>
          <div className='flex'>
            <img src={perfil} alt="no" className="w-20" />

            <div className='flex max-w-[630px] items-center justify-start'>
              <span className="items-center justify-between text-xl font-bold pr-2">@{userName} </span>
              <div className=" text-xl ">
                {truncatedText}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

