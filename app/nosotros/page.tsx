// app/nosotros/page.tsx
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero - exactamente como el catálogo */}
      <div className="text-center pt-12 mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">INFRAMEX</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Una empresa joven con ganas de crecer junto a tus proyectos.
        </p>
      </div>

      {/* Nuestra historia */}
      <section className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">Cómo empezamos</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              INFRAMEX nació hace poco, con más ilusión que experiencia, pero con una idea clara: ofrecer materiales de construcción de calidad con un trato cercano y honesto. Sabemos lo difícil que es encontrar un proveedor que realmente se preocupe por tus necesidades, y queremos ser ese aliado para ti.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoy somos un equipo pequeño, pero cada cliente que confía en nosotros nos impulsa a mejorar. No tenemos décadas de trayectoria, pero sí muchas ganas de aprender, de crecer y de construir relaciones duraderas.
            </p>
          </div>
          <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center text-gray-400">
            <span className="text-lg">Nuestro primer local</span>
          </div>
        </div>
      </section>

      {/* Lo que nos mueve - con iconos profesionales */}
      <section className="py-16 md:py-20">
        <h2 className="text-3xl font-light text-center text-gray-900 mb-4">
          Lo que nos mueve
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Pequeños en tamaño, grandes en compromiso.
        </p>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Cercanía */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Cercanía</h3>
            <p className="text-gray-500">Aquí no eres un número más. Te conocemos por tu nombre y entendemos tu proyecto.</p>
          </div>
          {/* Compromiso */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Compromiso</h3>
            <p className="text-gray-500">Sabemos que cada pedido cuenta. Nos esforzamos al máximo para cumplirte.</p>
          </div>
          {/* Actitud */}
          <div className="text-center md:text-left">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Actitud</h3>
            <p className="text-gray-500">Lo que nos falta en tamaño lo ponemos con ganas. Mejoramos cada día.</p>
          </div>
        </div>
      </section>

      {/* El equipo - con icono profesional */}
      <section className="py-16 md:py-20">
        <h2 className="text-3xl font-light text-center text-gray-900 mb-4">
          El equipo
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Por ahora somos pocos, pero ponemos el alma en cada entrega.
        </p>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="text-center">
            <div className="bg-gray-100 w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Ana Martínez</h3>
            <p className="text-sm text-gray-500">Fundadora · Ventas y atención</p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Carlos López</h3>
            <p className="text-sm text-gray-500">Fundador · Logística y entregas</p>
          </div>
        </div>
      </section>

      {/* Metas que nos inspiran - con iconos profesionales */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-4">
            Metas que nos inspiran
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Pequeñas metas, grandes sueños. Esto es lo que queremos lograr.
          </p>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Ampliar catálogo */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125zm0 4.5c0 2.278-3.694 4.125-8.25 4.125S3.75 13.153 3.75 10.875m16.5 4.5c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Ampliar catálogo</h3>
              <p className="text-gray-500">Ofrecer más variedad para que encuentres todo en un solo lugar.</p>
            </div>
            {/* Ganar confianza */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Ganar confianza</h3>
              <p className="text-gray-500">Que cada cliente se convierta en un recomendador de INFRAMEX.</p>
            </div>
            {/* Mejorar logística */}
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.759 15.759 0 00-2.045-1.86 15.933 15.933 0 00-2.045-1.86c-.395-.417-.615-.962-.615-1.53v-.958m0 11.177v.958m0 0v.958c0 .568.22 1.113.615 1.53.621.68 1.357 1.297 2.045 1.86m-2.66-3.39c-.395.417-.615.962-.615 1.53v.958m6.75-4.5v.958c0 .568-.22 1.113-.615 1.53-.621.68-1.357 1.297-2.045 1.86" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Mejorar logística</h3>
              <p className="text-gray-500">Ser más rápidos y eficientes en cada entrega.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="py-16 md:py-20 text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-4">¿Nos ayudas a crecer?</h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Cada proyecto que confías en nosotros es un paso más. Te esperamos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalogo"
            className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition"
          >
            Ver catálogo
          </Link>
          <a
            href="https://wa.me/5210000000000?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </section>
  );
}