import { useEffect, useRef, useState } from 'react'
import './App.css'

import logo from '../../imgs/Camara_PicosNOVO.png'
import searchIcon from '../../imgs/lupa.png'
import themeIcon from '../../imgs/dia.png'
import librasIcon from '../../imgs/libras.png'
import squareNewsImage from '../../imgs/noticiapraca.jpg'
import transitNewsImage from '../../imgs/noticiatranspotespublicos.jpg'
import healthNewsImage from '../../imgs/noticiaUBS.jpg'
import parksNewsImage from '../../imgs/noticiaaprovamento.jpg'
import teachersNewsImage from '../../imgs/noticiaalunos.jpg'
import moreNewsImage from '../../imgs/maisnoticias.jpg'
import contactBanner from '../../imgs/faleconosco.jpg'
import instagramIcon from '../../imgs/Insta.png'
import youtubeIcon from '../../imgs/youtube_logo.png'
import facebookIcon from '../../imgs/2023_Facebook_icon.svg.webp'
import phoneIcon from '../../imgs/telefone.png'
import locationIcon from '../../imgs/localizacao.png'

const news = [
  {
    image: squareNewsImage,
    alt: 'Reunião de vereadores discute nova praça pública',
    title: 'Câmara aprova construção de nova praça no bairro Centro',
    description: 'Projeto prevê área de lazer e quadra esportiva para a comunidade.',
  },
  {
    image: transitNewsImage,
    alt: 'Vereador apresenta projeto de lei sobre transporte público',
    title: 'Vereador propõe melhorias no transporte público municipal',
    description: 'Proposta inclui novas linhas de ônibus para bairros periféricos.',
  },
  {
    image: healthNewsImage,
    alt: 'Unidade Básica de Saúde do bairro Junco',
    title: 'Câmara aprova projeto que amplia atendimento na Unidade Básica de Saúde do bairro Junco',
    description:
      'Proposta prevê ampliação do horário de atendimento e contratação de mais profissionais de enfermagem.',
  },
  {
    image: parksNewsImage,
    alt: 'Vereadores discutem plano de reforma das praças públicas do centro de Picos',
    title: 'Vereadores discutem plano de reforma das praças públicas do centro de Picos',
    description:
      'Audiência pública reuniu moradores para debater prioridades de revitalização dos espaços urbanos.',
  },
  {
    image: teachersNewsImage,
    alt: 'Professores da rede municipal de ensino',
    title: 'Câmara realiza sessão solene para homenagear professores da rede municipal de ensino',
    description:
      'Evento reuniu educadores para reconhecer sua contribuição ao sistema de ensino do município.',
  },
  {
    image: moreNewsImage,
    alt: 'Mais notícias da Câmara Municipal de Picos',
    title: 'Saiba Mais...',
    description: '',
    more: true,
  },
]

const pageNames = {
  'camara.html': 'A Câmara',
  'faleconosco.html': 'Fale Conosco',
  'noticias.html': 'Notícias',
  'login.html': 'Login',
  'cadastroNoticias.html': 'Painel Administrativo',
}

function readCookie(name) {
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null
}

function writeCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`
}

function normalizeText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('tema') || 'claro')
  const [searchTerm, setSearchTerm] = useState(
    () => sessionStorage.getItem('filtro_busca') || '',
  )
  const [cookieChoice, setCookieChoice] = useState(() => readCookie('aceite_cookies'))
  const [visitMessage, setVisitMessage] = useState('')
  const [previousPage] = useState(() => {
    const previous = readCookie('ultima_pagina')
    return previous && previous !== 'index.html' && pageNames[previous] ? previous : null
  })
  const [moreNewsClosed, setMoreNewsClosed] = useState(
    () => sessionStorage.getItem('banner_saiba_mais_fechado') === 'true',
  )
  const visitRecorded = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.tema = theme
    localStorage.setItem('tema', theme)
  }, [theme])

  useEffect(() => {
    sessionStorage.setItem('filtro_busca', searchTerm)
  }, [searchTerm])

  useEffect(() => {
    if (cookieChoice !== 'sim' || visitRecorded.current) return

    visitRecorded.current = true
    const lastVisit = readCookie('ultima_visita')
    const visits = (Number(readCookie('contador_visitas')) || 0) + 1

    setVisitMessage(
      lastVisit
        ? `Bem-vindo de volta! Sua última visita foi em ${lastVisit}. Esta é a sua visita número ${visits}.`
        : 'Bem-vindo ao site da Câmara Municipal de Picos! Esta é a sua primeira visita.',
    )

    writeCookie(
      'ultima_visita',
      new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      365,
    )
    writeCookie('contador_visitas', String(visits), 365)
    writeCookie('ultima_pagina', 'index.html', 30)
  }, [cookieChoice])

  const filteredNews = news.filter((item) => {
    const searchableText = normalizeText(`${item.title} ${item.description} ${item.alt}`)
    return searchableText.includes(normalizeText(searchTerm.trim()))
  })

  function handleSearch(event) {
    event.preventDefault()
    const firstResult = filteredNews[0]
    if (firstResult) {
      document.getElementById(`noticia-${news.indexOf(firstResult)}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  function closeMoreNews() {
    setMoreNewsClosed(true)
    sessionStorage.setItem('banner_saiba_mais_fechado', 'true')
  }

  return (
    <>
      <header>
        <nav aria-label="Navegação principal">
          <ul>
            <li>
              <a href="/" aria-label="Página inicial">
                <img src={logo} alt="Câmara de Picos" className="logo" />
              </a>
            </li>
            <li><a href="/html/camara.html">A Câmara</a></li>
            <li><a href="/html/faleconosco.html">Fale Conosco</a></li>
            <li><a href="/html/noticias.html">Notícias</a></li>
            <li><a href="/html/login.html">Login</a></li>
          </ul>
        </nav>

        <form role="search" className="busca" onSubmit={handleSearch}>
          <input
            type="search"
            name="pesquisa"
            placeholder="Pesquisar"
            aria-label="Pesquisar notícias"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <img src={searchIcon} alt="" className="lupapesquisa" />
          </button>
          <button
            type="button"
            className="tema-botao"
            aria-label={theme === 'escuro' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            aria-pressed={theme === 'escuro'}
            onClick={() => setTheme(theme === 'escuro' ? 'claro' : 'escuro')}
          >
            <img src={themeIcon} alt="" className="tema" />
          </button>
        </form>

        <aside className="libras" aria-label="Acessibilidade">
          <p>Acessibilidade</p>
          <img src={librasIcon} alt="Acessibilidade em Libras" />
        </aside>
      </header>

      <main>
        <h1>Câmara Municipal de Vereadores de Picos</h1>

        {visitMessage && (
          <div className="info-visita" role="status">
            <p>{visitMessage}</p>
            {previousPage && (
              <p>
                Continuar de onde parou:{' '}
                <a href={`/html/${previousPage}`}>{pageNames[previousPage]}</a>
              </p>
            )}
          </div>
        )}

        <section>
          <h2>Sobre a Câmara</h2>
          <p>
            A Câmara Municipal de Picos é o órgão responsável por representar
            os cidadãos e elaborar leis que atendem às necessidades do município.
            Aqui você encontra informações sobre os vereadores, sessões e
            serviços oferecidos à população.
          </p>
        </section>

        <section className="caixaNoticias">
          <h2>Notícias</h2>
          <div className="noticias row g-4">
            {filteredNews.map((item) => {
              const index = news.indexOf(item)
              if (item.more && moreNewsClosed) return null

              return (
                <article
                  className={`noticia card h-100${item.more ? ' com-fechar' : ''}`}
                  id={`noticia-${index}`}
                  key={item.title}
                  hidden={item.more && moreNewsClosed}
                >
                  <img src={item.image} alt={item.alt} />
                  {item.more ? (
                    <>
                      <h3><a href="/html/noticias.html">{item.title}</a></h3>
                      <button
                        type="button"
                        className="fechar-card"
                        aria-label="Fechar o card Saiba Mais"
                        onClick={closeMoreNews}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <a href="/html/noticias.html">Leia mais</a>
                    </>
                  )}
                </article>
              )
            })}
          </div>
          {filteredNews.length === 0 && (
            <p className="sem-resultados" role="status">Nenhum resultado encontrado.</p>
          )}
        </section>

        <a href="/html/faleconosco.html" className="banner-contato">
          <img
            src={contactBanner}
            alt="Banner Fale Conosco - clique para entrar em contato"
          />
        </a>
      </main>

      <footer>
        <a href="/" aria-label="Página inicial">
          <img src={logo} alt="Câmara Municipal de Picos" className="logo2" />
        </a>

        <div className="footer-info">
          <div className="footer-redes">
            <p>Redes Sociais</p>
            <ul>
              <li><a href="https://www.instagram.com/" aria-label="Instagram"><img src={instagramIcon} alt="" /></a></li>
              <li><a href="https://www.youtube.com/" aria-label="YouTube"><img src={youtubeIcon} alt="" /></a></li>
              <li><a href="https://www.facebook.com/" aria-label="Facebook"><img src={facebookIcon} alt="" /></a></li>
            </ul>
          </div>

          <div className="footer-contato">
            <p>Contato:</p>
            <a href="tel:+5589987654321">
              <img src={phoneIcon} alt="" className="telefone" /> (89) 98765-4321
            </a>
            <a href="https://www.google.com/maps/place/...">
              <img src={locationIcon} alt="" className="localizacao" /> Localização
            </a>
          </div>
        </div>
      </footer>

      {cookieChoice === null && (
        <div className="banner-cookies" role="region" aria-label="Aviso de cookies">
          <p>
            Este site usa cookies para lembrar suas preferências, como a data da
            sua última visita e o seu usuário no login. Você aceita?
          </p>
          <div className="banner-botoes">
            <button
              type="button"
              id="btn-aceitar-cookies"
              onClick={() => {
                writeCookie('aceite_cookies', 'sim', 365)
                setCookieChoice('sim')
              }}
            >
              Aceitar
            </button>
            <button
              type="button"
              id="btn-recusar-cookies"
              onClick={() => {
                writeCookie('aceite_cookies', 'nao', 365)
                setCookieChoice('nao')
              }}
            >
              Recusar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
