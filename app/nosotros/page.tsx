import Link from "next/link";

export default function NosotrosPage() {
  return (
    <>
      {/* Hero con fondo de puntos (igual que home) */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] mb-3">
              INFRAMEX
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Una empresa joven con ganas de crecer junto a tus proyectos.
            </p>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Nuestra historia
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
              Cómo empezamos
            </h2>
            <div className="w-20 h-0.5 bg-gray-300 mb-6"></div>
            <p className="text-gray-500 leading-relaxed mb-4">
              INFRAMEX nació hace poco, con más ilusión que experiencia, pero con una idea clara: ofrecer materiales de construcción de calidad con un trato cercano y honesto. Sabemos lo difícil que es encontrar un proveedor que realmente se preocupe por tus necesidades, y queremos ser ese aliado para ti.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Hoy somos un equipo pequeño, pero cada cliente que confía en nosotros nos impulsa a mejorar. No tenemos décadas de trayectoria, pero sí muchas ganas de aprender, de crecer y de construir relaciones duraderas.
            </p>
          </div>
          <div className="relative h-80 w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02] bg-gray-100 flex items-center justify-center text-gray-400">
              <span className="text-lg">Nuestro primer local</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que nos mueve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Lo que nos mueve
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
            Pequeños en tamaño, grandes en compromiso
          </h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Cercanía */}
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Cercanía</h3>
            <p className="text-gray-500 leading-relaxed">Aquí no eres un número más. Te conocemos por tu nombre y entendemos tu proyecto.</p>
          </div>
          {/* Compromiso */}
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Compromiso</h3>
            <p className="text-gray-500 leading-relaxed">Sabemos que cada pedido cuenta. Nos esforzamos al máximo para cumplirte.</p>
          </div>
          {/* Actitud */}
          <div className="group text-center md:text-left hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300">
            <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Actitud</h3>
            <p className="text-gray-500 leading-relaxed">Lo que nos falta en tamaño lo ponemos con ganas. Mejoramos cada día.</p>
          </div>
        </div>
      </section>

      {/* El equipo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            El equipo
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
            Por ahora somos pocos, pero ponemos el alma en cada entrega
          </h2>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          <div className="text-center group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-full h-full bg-gray-100 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Ana Martínez</h3>
            <p className="text-sm text-gray-500">Fundadora · Ventas y atención</p>
          </div>
          <div className="text-center group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-full h-full bg-gray-100 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Carlos López</h3>
            <p className="text-sm text-gray-500">Fundador · Logística y entregas</p>
          </div>
        </div>
      </section>

      {/* Metas que nos inspiran */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Metas que nos inspiran
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 mb-4">
              Pequeñas metas, grandes sueños
            </h2>
            <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Ampliar catálogo */}
            <div className="group text-center md:text-left hover:bg-white p-6 rounded-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 4.5c0 2.278-3.694 4.125-8.25 4.125S3.75 13.153 3.75 10.875m16.5 4.5c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Ampliar catálogo</h3>
              <p className="text-gray-500 leading-relaxed">Ofrecer más variedad para que encuentres todo en un solo lugar.</p>
            </div>
            {/* Ganar confianza */}
            <div className="group text-center md:text-left hover:bg-white p-6 rounded-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Ganar confianza</h3>
              <p className="text-gray-500 leading-relaxed">Que cada cliente se convierta en un recomendador de INFRAMEX.</p>
            </div>
            {/* Mejorar logística */}
            <div className="group text-center md:text-left hover:bg-white p-6 rounded-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-200 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-5 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.759 15.759 0 00-2.045-1.86 15.933 15.933 0 00-2.045-1.86c-.395-.417-.615-.962-.615-1.53v-.958m0 11.177v.958m0 0v.958c0 .568.22 1.113.615 1.53.621.68 1.357 1.297 2.045 1.86m-2.66-3.39c-.395.417-.615.962-.615 1.53v.958m6.75-4.5v.958c0 .568-.22 1.113-.615 1.53-.621.68-1.357 1.297-2.045 1.86" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">Mejorar logística</h3>
              <p className="text-gray-500 leading-relaxed">Ser más rápidos y eficientes en cada entrega.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">¿Nos ayudas a crecer?</h2>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Cada proyecto que confías en nosotros es un paso más. Te esperamos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalogo"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Ver catálogo
          </Link>
          <a
            href="https://wa.me/524481519373"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.087.276.072.378-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}