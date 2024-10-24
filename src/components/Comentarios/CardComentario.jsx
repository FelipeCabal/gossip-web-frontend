import neutro from '../../assets/avatares/neutro.png'

export function CardComentario({ userName, texto, perfil }) {
  const maxWords = 70; // Define el límite máximo de palabras
  const wordsArray = texto.split(' ');
  const truncatedText = wordsArray.length > maxWords
    ? wordsArray.slice(0, maxWords).join(' ') + '...'
    : texto;

  return (
    <div className="max-w-[630px] border-l-[1px] border-l-gray-400 mb-4">
      <section className="flex items-start gap-2 ml-2">
        <div className="flex-shrink-0">
          <img src={perfil ? perfil : neutro} alt="no" className="w-14 rounded-full" />
        </div>
        <div className="text-xl">
          <span className="font-bold pr-2">@{userName}</span>
          <p>
            {truncatedText}
          </p>
        </div>
      </section>
    </div>
  )
}


