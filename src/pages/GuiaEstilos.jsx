import './GuiaEstilos.css'

export function GuiaEstilos() {
    return (
        <div>
            <section className='introduccion'>
                <h1>Guía de estilos</h1>
                <h2>Introduccion</h2>
                <p>La Guía de Estilos tiene como objetivo proporcionar un conjunto de reglas y componentes predefinidos que permiten mantener la consistencia visual y de comportamiento a lo largo de toda la aplicación. Al utilizar esta guía, los desarrolladores y diseñadores pueden asegurarse de que la interfaz de usuario sea coherente, accesible y fácil de mantener, independientemente de la escala o el tamaño del proyecto.</p>
            </section>
            <section className='tipografia'>
                <h2>Tipografía</h2>
                <p>La tipografía es un elemento clave en el diseño de interfaces. La elección de una fuente adecuada puede mejorar la legibilidad y la accesibilidad de la aplicación. A continuación se presentan las fuentes recomendadas para su uso en la aplicación:</p>
                <ul>
                    <li>Nerco One: Nerko One fue creada por el diseñador Ellograph Studio y está disponible en Google Fonts. Esta va a ser usada para los titulos principales con tipografia base de 16 px</li>
                    <li>Robot Candense: Fue desarrollada originalmente para Google como parte de su sistema operativo Android y lanzada en 2011 y se utiliza para los títulos secundarios con tipografia base de 16 px.</li>
                    <li>Inter:  Es una fuente de código abierto diseñada principalmente para pantallas y lectura en interfaces digitales y va a ser usada para textos generales con tipografia base de 16 px. </li>
                </ul>
            </section>
            <section className='colores'>
                <h2>Colores</h2>
                <p>La elección de una paleta de colores adecuada es fundamental para el diseño de interfaces. Los colores pueden transmitir emociones y crear una atmósfera única en la aplicación. A continuación se presentan los colores recomendados para su uso en la aplicación:</p>
                <ul>
                    <li>Colores Principales::</li>
                    <ul>
                        <li className='bg-[#306bac]'>Principal: #306bac</li>
                        <li className='bg-[#918ef4]'>Secundario: #918ef4</li>
                        <li className='bg-[#6f9ceb]'>Terceario: #6f9ceb</li>
                    </ul>
                    <li>Colores Secundarios:</li>
                    <ul>
                        <li className='bg-[#141b41]'>Principal: #141b41</li>
                        <li className='bg-[#98b9f2]'>Secundario: #98b9f2</li>
                    </ul>
                </ul>
            </section>
        </div>
    )
}