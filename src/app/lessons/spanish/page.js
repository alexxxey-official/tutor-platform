'use client'
import Link from 'next/link'

export default function SpanishLesson() {
  const speakSpanish = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Очистка текста от лишних символов для корректной озвучки
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').replace(/[¿?¡!]/g, '').split('/')[0].trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const AudioWord = ({ spanish, russian }) => (
    <tr>
      <td className="border border-[#e5e0d5] p-3 text-left">
        <span className="cursor-pointer hover:opacity-70 text-lg mr-2" onClick={() => speakSpanish(spanish)} title="Прослушать">🔊</span>
        <span className="font-semibold text-[#2a9d8f]">{spanish}</span>
      </td>
      <td className="border border-[#e5e0d5] p-3 text-left">{russian}</td>
    </tr>
  );

  const AudioPhrase = ({ spanish, russian }) => (
    <p className="mb-2 pb-2 border-b border-black/5 last:mb-0 last:pb-0 last:border-none text-[15px]">
      <span className="cursor-pointer hover:opacity-70 text-lg mr-2 inline-block align-middle" onClick={() => speakSpanish(spanish)} title="Прослушать">🔊</span>
      <strong className="text-[#1a1a2e] inline-block min-w-[180px] font-bold">{spanish}</strong>
      <em className="text-gray-500 font-normal text-[14px] not-italic">{russian}</em>
    </p>
  );

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#1a1a2e] pb-20 font-sans">
      <div className="bg-[#1a1a2e] text-white px-10 py-12 pb-10 relative overflow-hidden">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#2a9d8f] mb-3">
          🇪🇸 Лексика · Уровень A1
        </div>
        <h1 className="font-extrabold text-[clamp(32px,5vw,52px)] leading-[1.1] mb-4 unbounded relative z-10">
          Мега-словарь<br />
          <em className="text-[#2a9d8f] not-italic font-normal font-serif">A1 (500+ слов)</em>
        </h1>
        <p className="text-white/60 text-[15px] max-w-[500px] relative z-10">
          Продвинутый словарный запас для начинающих. Всё, что нужно для выживания, общения, походов в ресторан и навигации по городу.
        </p>
        <div className="absolute right-[-20px] top-[10px] text-[100px] text-white/5 font-extrabold leading-none tracking-[-5px] uppercase unbounded select-none pointer-events-none z-0">
          VOCABULARIO
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6">
        <nav className="bg-white border border-[#e5e0d5] rounded-xl px-6 py-5 mt-8 flex flex-wrap gap-2.5 items-center sticky top-4 z-20 shadow-sm">
          <Link href="/dashboard" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors hover:bg-[#2a9d8f] hover:text-white">
            ← На главную
          </Link>
          <a href="#greetings" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">👋 Приветствия</a>
          <a href="#family" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">👨‍👩‍👧‍👦 Семья</a>
          <a href="#city" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">🏙️ Город</a>
          <a href="#food" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">🥘 Еда</a>
          <a href="#house" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">🏠 Дом</a>
          <a href="#clothes" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">👕 Одежда</a>
          <a href="#time" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">⏳ Время</a>
          <a href="#adjectives" className="bg-gray-100 text-[#1a1a2e] no-underline px-3.5 py-1.5 rounded-full text-[13px] transition-colors hover:bg-[#2a9d8f] hover:text-white">✨ Прилагательные</a>
        </nav>

        {/* GREETINGS */}
        <section id="greetings" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 1
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">👋 Приветствия и Вежливость</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Базовые слова</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="Hola / Adiós" russian="Привет / Пока" />
                  <AudioWord spanish="Buenos días" russian="Доброе утро (до обеда)" />
                  <AudioWord spanish="Buenas tardes" russian="Добрый день (после обеда)" />
                  <AudioWord spanish="Buenas noches" russian="Добрый вечер / Спокойной ночи" />
                  <AudioWord spanish="Hasta luego / Hasta pronto" russian="До скорого / До скорой встречи" />
                  <AudioWord spanish="Hasta mañana" russian="До завтра" />
                  <AudioWord spanish="Por favor" russian="Пожалуйста (когда просишь)" />
                  <AudioWord spanish="Gracias / Muchas gracias" russian="Спасибо / Большое спасибо" />
                  <AudioWord spanish="De nada" russian="Не за что" />
                  <AudioWord spanish="Lo siento / Perdón" russian="Мне жаль / Извините" />
                  <AudioWord spanish="Sí / No" russian="Да / Нет" />
                  <AudioWord spanish="Vale" russian="Окей / Ладно (очень часто в Испании!)" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Как дела? (Фразы)</h3>
            <div className="bg-[#f0faf8] border-l-4 border-[#2a9d8f] p-4 rounded-r-lg">
              <AudioPhrase spanish="¿Qué tal?" russian="Как дела? (Универсально)" />
              <AudioPhrase spanish="¿Cómo estás?" russian="Как ты?" />
              <AudioPhrase spanish="¿Cómo se llama usted?" russian="Как вас зовут? (вежливо)" />
              <AudioPhrase spanish="Me llamo... / Soy..." russian="Меня зовут... / Я..." />
              <AudioPhrase spanish="Mucho gusto / Encantado(a)" russian="Очень приятно (познакомиться)" />
              <AudioPhrase spanish="Muy bien, ¿y tú?" russian="Очень хорошо, а у тебя?" />
              <AudioPhrase spanish="Regular / Más o menos" russian="Нормально / Так себе" />
              <AudioPhrase spanish="Fatal" russian="Ужасно" />
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section id="family" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 2
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">👨‍👩‍👧‍👦 Семья и Люди</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Родственники (Продвинутый A1)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="la familia" russian="семья" />
                  <AudioWord spanish="los padres" russian="родители" />
                  <AudioWord spanish="el padre / la madre" russian="отец / мать" />
                  <AudioWord spanish="el hijo / la hija" russian="сын / дочь" />
                  <AudioWord spanish="el hermano / la hermana" russian="брат / сестра" />
                  <AudioWord spanish="el abuelo / la abuela" russian="дедушка / бабушка" />
                  <AudioWord spanish="el nieto / la nieta" russian="внук / внучка" />
                  <AudioWord spanish="el tío / la tía" russian="дядя / тётя" />
                  <AudioWord spanish="el primo / la prima" russian="двоюродный брат / сестра" />
                  <AudioWord spanish="el sobrino / la sobrina" russian="племянник / племянница" />
                  <AudioWord spanish="el marido (esposo) / la mujer (esposa)" russian="муж / жена" />
                  <AudioWord spanish="el novio / la novia" russian="парень / девушка (в отношениях)" />
                  <AudioWord spanish="el suegro / la suegra" russian="тёсть, свёкор / тёща, свекровь" />
                  <AudioWord spanish="los gemelos" russian="близнецы" />
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 my-6 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">💡 Правило множественного числа:</strong>
              Если мы объединяем мужчин и женщин в одну группу, используется мужской род множественного числа.<br/>
              <i>el padre + la madre = <strong>los padres</strong> (родители)</i><br/>
              <i>el hijo + la hija = <strong>los hijos</strong> (дети)</i><br/>
              <i>el rey + la reina = <strong>los reyes</strong> (король и королева)</i>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Люди и этапы жизни</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="el hombre / la mujer" russian="мужчина / женщина" />
                  <AudioWord spanish="el chico / la chica (el muchacho/a)" russian="парень / девушка (мальчик / девочка)" />
                  <AudioWord spanish="el niño / la niña" russian="ребенок (мальчик / девочка)" />
                  <AudioWord spanish="el bebé" russian="младенец" />
                  <AudioWord spanish="el amigo / la amiga" russian="друг / подруга" />
                  <AudioWord spanish="el compañero (de clase / de trabajo)" russian="одноклассник / коллега" />
                  <AudioWord spanish="el señor / la señora (Sr. / Sra.)" russian="господин / госпожа" />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CITY */}
        <section id="city" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 3
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">🏙️ Город и Навигация</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Места в городе</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="la ciudad / el pueblo" russian="город / деревня (поселок)" />
                  <AudioWord spanish="la calle / la plaza / la avenida" russian="улица / площадь / проспект" />
                  <AudioWord spanish="el centro (de la ciudad)" russian="центр (города)" />
                  <AudioWord spanish="el barrio" russian="район" />
                  <AudioWord spanish="el parque" russian="парк" />
                  <AudioWord spanish="el hospital / la farmacia" russian="больница / аптека" />
                  <AudioWord spanish="el banco / el cajero automático" russian="банк / банкомат" />
                  <AudioWord spanish="el supermercado / el mercado" russian="супермаркет / рынок" />
                  <AudioWord spanish="la tienda / el centro comercial" russian="магазин / торговый центр" />
                  <AudioWord spanish="el restaurante / la cafetería / el bar" russian="ресторан / кафе / бар" />
                  <AudioWord spanish="el museo / el teatro / el cine" russian="музей / театр / кинотеатр" />
                  <AudioWord spanish="la escuela / la universidad" russian="школа / университет" />
                  <AudioWord spanish="la estación (de tren / de metro)" russian="станция (поезда / метро)" />
                  <AudioWord spanish="el aeropuerto" russian="аэропорт" />
                  <AudioWord spanish="la parada de autobús" russian="автобусная остановка" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Направления (Где это?)</h3>
            <div className="bg-[#f0faf8] border-l-4 border-[#2a9d8f] p-4 rounded-r-lg">
              <AudioPhrase spanish="¿Dónde está...?" russian="Где находится...?" />
              <AudioPhrase spanish="¿Cómo puedo ir a...?" russian="Как мне дойти/доехать до...?" />
              <AudioPhrase spanish="(Sigue) todo recto" russian="(Иди) всё прямо" />
              <AudioPhrase spanish="Gira a la derecha / a la izquierda" russian="Поверни направо / налево" />
              <AudioPhrase spanish="Al lado de..." russian="Рядом с (сбоку от)..." />
              <AudioPhrase spanish="Enfrente de..." russian="Напротив..." />
              <AudioPhrase spanish="Cerca de / Lejos de..." russian="Близко от / Далеко от..." />
            </div>
          </div>
        </section>

        {/* FOOD */}
        <section id="food" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 4
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">🥘 Еда и Ресторан</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Продукты и Напитки</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="el agua (f.) / el pan" russian="вода / хлеб (agua - жен.род, но артикль el!)" />
                  <AudioWord spanish="la carne / el pescado / el pollo" russian="мясо / рыба (как еда) / курица" />
                  <AudioWord spanish="el queso / el huevo / la leche" russian="сыр / яйцо / молоко" />
                  <AudioWord spanish="la fruta / la verdura" russian="фрукты / овощи" />
                  <AudioWord spanish="la manzana / la naranja / el plátano" russian="яблоко / апельсин / банан" />
                  <AudioWord spanish="el tomate / la patata (papa)" russian="помидор / картошка" />
                  <AudioWord spanish="la ensalada / la sopa" russian="салат / суп" />
                  <AudioWord spanish="el arroz / la pasta" russian="рис / паста" />
                  <AudioWord spanish="la sal / el azúcar / la pimienta" russian="соль / сахар / перец" />
                  <AudioWord spanish="el café / el té / el zumo (jugo)" russian="кофе / чай / сок" />
                  <AudioWord spanish="el vino (tinto/blanco) / la cerveza" russian="вино (красное/белое) / пиво" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">В ресторане (Фразы)</h3>
            <div className="bg-[#f0faf8] border-l-4 border-[#2a9d8f] p-4 rounded-r-lg">
              <AudioPhrase spanish="¿Tienen una mesa para dos?" russian="У вас есть столик на двоих?" />
              <AudioPhrase spanish="La carta / El menú, por favor." russian="Меню, пожалуйста." />
              <AudioPhrase spanish="¿Qué va a tomar?" russian="Что будете заказывать? (пить/есть)" />
              <AudioPhrase spanish="Para mí, la sopa y un agua." russian="Мне суп и воду." />
              <AudioPhrase spanish="De primer plato / De segundo plato" russian="На первое / На второе" />
              <AudioPhrase spanish="¿Y de postre?" russian="А на десерт?" />
              <AudioPhrase spanish="La cuenta, por favor." russian="Счёт, пожалуйста." />
              <AudioPhrase spanish="¡Qué rico! / ¡Está riquísimo!" russian="Как вкусно! / Очень вкусно!" />
            </div>
          </div>
        </section>

        {/* HOUSE */}
        <section id="house" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 5
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">🏠 Дом и Мебель</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Комнаты и элементы дома</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="la casa / el piso (el apartamento)" russian="дом / квартира" />
                  <AudioWord spanish="la habitación / el dormitorio" russian="комната / спальня" />
                  <AudioWord spanish="el salón (el comedor)" russian="гостиная (столовая)" />
                  <AudioWord spanish="la cocina / el baño" russian="кухня / ванная комната" />
                  <AudioWord spanish="el pasillo / el balcón / la terraza" russian="коридор / балкон / терраса" />
                  <AudioWord spanish="el jardín / el garaje" russian="сад / гараж" />
                  <AudioWord spanish="la puerta / la ventana" russian="дверь / окно" />
                  <AudioWord spanish="la pared / el suelo / el techo" russian="стена / пол / потолок" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Мебель и вещи (Muebles)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="la cama" russian="кровать" />
                  <AudioWord spanish="la mesa / la silla" russian="стол / стул" />
                  <AudioWord spanish="el sofá / el sillón" russian="диван / кресло" />
                  <AudioWord spanish="el armario" russian="шкаф" />
                  <AudioWord spanish="la televisión (la tele)" russian="телевизор" />
                  <AudioWord spanish="la nevera (el frigorífico)" russian="холодильник" />
                  <AudioWord spanish="la lavadora" russian="стиральная машина" />
                  <AudioWord spanish="la lámpara" russian="лампа" />
                  <AudioWord spanish="el espejo" russian="зеркало" />
                  <AudioWord spanish="la alfombra" russian="ковер" />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CLOTHES */}
        <section id="clothes" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 6
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">👕 Одежда и Цвета</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Одежда (La ropa)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="la camiseta / la camisa" russian="футболка / рубашка" />
                  <AudioWord spanish="el jersey (el suéter)" russian="свитер" />
                  <AudioWord spanish="los pantalones / los vaqueros (jeans)" russian="штаны, брюки / джинсы" />
                  <AudioWord spanish="la falda / el vestido" russian="юбка / платье" />
                  <AudioWord spanish="la chaqueta / el abrigo" russian="куртка / пальто (плащ)" />
                  <AudioWord spanish="los zapatos / las zapatillas" russian="туфли, ботинки / кроссовки" />
                  <AudioWord spanish="las botas / las sandalias" russian="сапоги / сандалии, босоножки" />
                  <AudioWord spanish="los calcetines" russian="носки" />
                  <AudioWord spanish="el sombrero / la gorra" russian="шляпа / кепка" />
                  <AudioWord spanish="la bufanda / los guantes" russian="шарф / перчатки" />
                  <AudioWord spanish="el bañador" russian="купальник, плавки" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Цвета (Los colores)</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="rojo / amarillo / azul" russian="красный / жёлтый / синий" />
                  <AudioWord spanish="verde / negro / blanco" russian="зелёный / чёрный / белый" />
                  <AudioWord spanish="gris / marrón / naranja / rosa" russian="серый / коричневый / оранжевый / розовый" />
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-[#fff8f0] to-[#fff3e6] border border-[#f4a261] border-l-4 border-l-[#f4a261] rounded-lg p-4 text-[14px] text-[#7c4a00]">
              <strong className="text-[#5c3300] block mb-2 text-[12px] tracking-[1px] uppercase">💡 Правило цветов:</strong>
              Цвета изменяются по роду и числу, как прилагательные: <i>el coche rojo</i> (красная машина), <i>la casa roja</i> (красный дом).<br/>
              НО! Цвета <strong>naranja</strong> (оранжевый) и <strong>rosa</strong> (розовый) не меняют букву 'a' на 'o': <i>el coche naranja, la casa naranja</i>.
            </div>
          </div>
        </section>

        {/* TIME */}
        <section id="time" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 7
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">⏳ Время и Календарь</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Дни недели и Месяцы (С маленькой буквы!)</h3>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="lunes, martes, miércoles" russian="понедельник, вторник, среда" />
                  <AudioWord spanish="jueves, viernes" russian="четверг, пятница" />
                  <AudioWord spanish="sábado, domingo" russian="суббота, воскресенье" />
                  <AudioWord spanish="el fin de semana" russian="выходные (конец недели)" />
                  <AudioWord spanish="enero, febrero, marzo..." russian="январь, февраль, март..." />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Время и сезоны</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="hoy / mañana / ayer" russian="сегодня / завтра / вчера" />
                  <AudioWord spanish="la mañana / la tarde / la noche" russian="утро / день / ночь (вечер)" />
                  <AudioWord spanish="la primavera / el verano" russian="весна / лето" />
                  <AudioWord spanish="el otoño / el invierno" russian="осень / зима" />
                  <AudioWord spanish="la hora / el minuto / el segundo" russian="час / минута / секунда" />
                  <AudioWord spanish="el día / la semana / el mes / el año" russian="день / неделя / месяц / год" />
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Фразы о времени</h3>
            <div className="bg-[#f0faf8] border-l-4 border-[#2a9d8f] p-4 rounded-r-lg">
              <AudioPhrase spanish="¿Qué hora es?" russian="Который час?" />
              <AudioPhrase spanish="Es la una." russian="Час дня/ночи. (Для 1 часа - ед.ч.)" />
              <AudioPhrase spanish="Son las dos / Son las cinco." russian="Два часа / Пять часов. (Для остальных - мн.ч.)" />
              <AudioPhrase spanish="Son las tres y media." russian="Три с половиной (15:30)." />
              <AudioPhrase spanish="Son las cuatro menos cuarto." russian="Без четверти четыре (15:45)." />
              <AudioPhrase spanish="¿A qué hora empieza la clase?" russian="Во сколько начинается урок?" />
              <AudioPhrase spanish="A las nueve de la mañana." russian="В 9 утра." />
            </div>
          </div>
        </section>

        {/* ADJECTIVES */}
        <section id="adjectives" className="scroll-mt-24 mt-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-[#2a9d8f] mb-5">
            Тема 8
            <div className="w-[40px] h-[2px] bg-[#2a9d8f]"></div>
          </div>
          <h2 className="font-bold text-[28px] text-[#1a1a2e] mb-5 unbounded">✨ Базовые прилагательные</h2>
          
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-8 pl-10 mb-4 relative shadow-sm">
            <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-sm bg-[#2a9d8f]"></div>
            <h3 className="font-bold text-[20px] mb-4 unbounded text-[#1a1a2e]">Как описать предмет (Противоположности)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e] w-2/5">Испанский</th>
                    <th className="border border-[#e5e0d5] p-3 text-left bg-gray-50 font-semibold text-[#1a1a2e]">Русский</th>
                  </tr>
                </thead>
                <tbody>
                  <AudioWord spanish="bueno - malo" russian="хороший - плохой" />
                  <AudioWord spanish="grande - pequeño" russian="большой - маленький" />
                  <AudioWord spanish="nuevo - viejo" russian="новый - старый" />
                  <AudioWord spanish="bonito - feo" russian="красивый - некрасивый" />
                  <AudioWord spanish="caro - barato" russian="дорогой - дешевый" />
                  <AudioWord spanish="fácil - difícil" russian="легкий - сложный" />
                  <AudioWord spanish="frío - caliente" russian="холодный - горячий" />
                  <AudioWord spanish="abierto - cerrado" russian="открытый - закрытый" />
                  <AudioWord spanish="limpio - sucio" russian="чистый - грязный" />
                  <AudioWord spanish="rápido - lento" russian="быстрый - медленный" />
                  <AudioWord spanish="rico - pobre" russian="богатый - бедный (про еду rico = вкусный!)" />
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
