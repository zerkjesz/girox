// Giro X — Landing page (mobile-ready)

const { useState, useEffect, useRef, useMemo } = React;

const HEADLINES = {
  A: {
    eyebrow: "Arbitragem online, descontos privilegiados",
    main: ["A gente acha onde tá ", <em key="i">barato</em>, ".\u00A0", <span key="s" className="hl-soft">Você revende caro.</span>]
  },
  B: {
    eyebrow: "Bots, comunidade e método",
    main: ["Compre nos maiores ", <em key="i">marketplaces</em>, ", revenda nos maiores marketplaces.\u00A0", <span key="s" className="hl-soft">O lucro fica com você.</span>]
  },
  C: {
    eyebrow: "Grupo de promoção pra revender, não pra usar",
    main: ["Não é grupo de promoção pra você ", <em key="i">economizar</em>, ".\u00A0", <span key="s" className="hl-soft">É pra você fazer dinheiro de verdade.</span>]
  }
};

const CTAS = {
  A: { primary: "Quero entrar no Giro X", sub: "Acesso imediato, cancele quando quiser" },
  B: { primary: "Quero fazer dinheiro de verdade na internet", sub: "Comunidade VIP, R$ 49,99/mês" }
};

const PAIN_POINTS = [
{ cat: "Direção", pain: "Não sei qual produto, qual plataforma, por onde começar.", solved: "Suporte e direcionamento certo." },
{ cat: "Timing", pain: "Vejo oportunidade passar, quando vou agir, já passou.", solved: "Informações privilegiadas em tempo real." },
{ cat: "Trajetória", pain: "Já tentei algumas coisas online e não foi pra frente.", solved: "Conteúdo estratégico + comunidade que puxa junto." },
{ cat: "Validação", pain: "Não consigo diferenciar o que é oportunidade real do que é furada.", solved: "Filtro por potencial de resultado, não de consumo." },
{ cat: "Acesso", pain: "Parece que quem vende bem tem acesso que eu não tenho.", solved: "Inteligência dos maiores canais, antes do mercado." },
{ cat: "Execução", pain: "Quero entrar nos maiores canais, mas não sei como aproveitar.", solved: "Mapa ao vivo de Shopee e ML." }];

const BENEFITS = [
{ n: "01", t: "Comprou barato, revende caro", d: "Arbitragem entre marketplaces. A gente acha promoções na Shopee, ML, Amazon e outros pra você revender com margem." },
{ n: "02", t: "Bots monitorando 24/7", d: "Robôs proprietários varrem os maiores canais pra te avisar antes de todo mundo. Você acessa o que o mercado não vê." },
{ n: "03", t: "Várias oportunidades por dia", d: "Promoções chegam no WhatsApp e Discord ao longo do dia, prontas pra você comprar e listar pra revenda." },
{ n: "04", t: "Método ensinado, não improvisado", d: "Aulas e materiais gravados mostrando como comprar, anunciar e escalar. Sem achismo." },
{ n: "05", t: "Networking com quem vive disso", d: "Discord com players que faturam de verdade. Você aprende, pergunta e cresce no ritmo da galera." },
{ n: "06", t: "Suporte 24h", d: "Time disponível direto, sem fila de atendimento. Dúvida na hora da compra, resposta na hora." },
{ n: "07", t: "Do extra ao principal", d: "Pra quem quer renda extra, pra quem quer fazer disso o trabalho principal. O Giro X serve nos dois estágios." },
{ n: "08", t: "Único no mercado", d: "Não é grupo de promoção pra economizar. É a primeira comunidade de arbitragem online focada 100% em revenda." }];

const OBJECTIONS = [
{ q: "Isso não é mais um grupo de promoção?", a: "Pelo contrário. Grupo de promoção te faz gastar. O Giro X te faz ganhar. Aqui só entra produto com margem pra revender e alta saída, não promo de consumo pessoal." },
{ q: "E se eu não souber vender online?", a: "Esse é o ponto de partida da maioria. O método em vídeo + comunidade ativa + suporte 24h existem exatamente pra encurtar esse caminho. Você aprende fazendo, com quem já vive disso." },
{ q: "Já tentei vender online e não deu certo.", a: "Quem não consegue está tentando sozinho, sem fonte de produto, sem método e sem comunidade. Aqui você tem os 3, mais bots achando promoção antes do mercado todo. A diferença é estrutural." }];

const FAQ_ITEMS = [
{ q: "Pra quem está começando do zero também serve?", a: "Sim. O método em vídeo cobre desde abrir conta como vendedor até precificar, anunciar e enviar. E a comunidade ajuda em cada passo." },
{ q: "Como funciona a arbitragem na prática?", a: "A gente acha um produto em promoção num marketplace, valida margem e demanda, e manda no grupo. Você compra, anuncia em outro marketplace por um preço maior, e fica com a diferença." },
{ q: "Preciso ter CNPJ?", a: "Não pra começar. Dá pra começar como pessoa física e abrir MEI depois. A gente orienta dentro do método quando vale a pena formalizar." },
{ q: "Quanto preciso de capital de giro pra começar?", a: "Dá pra começar com pouco, R$ 200 a R$ 500 já te coloca em movimento. Conforme reinveste, escala. O método mostra como crescer sem precisar de aporte grande." },
{ q: "Quantas oportunidades chegam por dia?", a: "Várias por dia, todos os dias. Os bots monitoram 24/7 e o time valida antes de publicar. Você decide em quais entrar." },
{ q: "Quanto tempo preciso dedicar por dia?", a: "De 30min a 2h por dia já dá pra trabalhar bem. As oportunidades chegam até você, sem precisar garimpar." },
{ q: "E se eu não gostar?", a: "Garantia de 7 dias sem perguntas. Pediu, devolvo 100%. Sem burocracia." },
{ q: "Como funciona o acesso, pagamento e cancelamento?", a: "Acesso imediato no WhatsApp + Discord. Pagamento por Cartão, Pix ou Boleto. Sem fidelidade, cancela quando quiser, sem multa." }];

const FEED_ITEMS = [
{ tag: "SHOPEE", margin: "+ 142%", title: "Mini umidificador USB com LED", note: "Vendedores em SP/RJ, concorrência baixa, ticket R$ 39" },
{ tag: "MERCADO LIVRE", margin: "+ 87%", title: "Suporte ergonômico p/ notebook", note: "Frete grátis ativo, margem confortável, ticket R$ 89" },
{ tag: "AMAZON", margin: "+ 215%", title: "Kit organizador modular de gavetas", note: "Subiu 4 posições na BSR em 7 dias, ticket R$ 67" },
{ tag: "SHOPEE", margin: "+ 64%", title: "Capa térmica para garrafa de 1L", note: "Sazonalidade aquecendo, concorrência média, ticket R$ 28" },
{ tag: "MERCADO LIVRE", margin: "+ 108%", title: "Câmera de segurança Wi-Fi 360°", note: "Demanda alta, ticket R$ 129, giro rápido" },
{ tag: "AMAZON", margin: "+ 92%", title: "Tapete antiderrapante p/ box", note: "Janela curta, margem boa, ticket R$ 52" }];

// ─── NAV COM HAMBÚRGUER ─────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // fecha o menu ao clicar em link
  function closeMenu() { setMenuOpen(false); }

  // trava scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo logo-img" onClick={closeMenu}>
          <img className="logo-word-img" src="assets/girox-wordmark.png" alt="Girox" style={{height:"32px"}} />
        </a>

        {/* Desktop nav */}
        <nav className="nav-links">
          <a href="#proposta">O que é</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#oferta">Oferta</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="nav-cta">
          <a href="https://chat.whatsapp.com/JUnHqSttJbnHzRxoiTS7U1" target="_blank" rel="noopener" className="link-muted">Grupo gratuito</a>
          <a href="https://pay.kiwify.com.br/r1NHjyp" target="_blank" rel="noopener" className="btn btn-primary btn-sm">Entrar no VIP <Arrow /></a>
          {/* Hambúrguer — só aparece no mobile via CSS */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <a href="#proposta" onClick={closeMenu}>O que é</a>
        <a href="#beneficios" onClick={closeMenu}>Benefícios</a>
        <a href="#oferta" onClick={closeMenu}>Oferta</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href="https://chat.whatsapp.com/JUnHqSttJbnHzRxoiTS7U1" target="_blank" rel="noopener" onClick={closeMenu}>Grupo gratuito</a>
        <a href="https://pay.kiwify.com.br/r1NHjyp" target="_blank" rel="noopener" className="drawer-cta" onClick={closeMenu}>Entrar no VIP →</a>
      </div>
    </header>);
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);
}

// ─── HERO ───────────────────────────────────────────────────────────────
function Hero({ headline, cta, motion }) {
  const [count, setCount] = useState(198);
  useEffect(() => {
    if (!motion) return;
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3)), 3200);
    return () => clearInterval(id);
  }, [motion]);

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <h1 className="display">{headline.main}</h1>
        <p className="lede">
          Comunidade de arbitragem online com bots proprietários que acham descontos
          nos maiores marketplaces, antes do mercado, pra você revender com margem.
        </p>
        <div className="cta-row">
          <a href="https://pay.kiwify.com.br/r1NHjyp" target="_blank" rel="noopener" className="btn btn-primary btn-lg">{cta.primary} <Arrow size={16} /></a>
          <a href="https://chat.whatsapp.com/JUnHqSttJbnHzRxoiTS7U1" target="_blank" rel="noopener" className="btn btn-ghost btn-lg">Grupo Gratuito</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{count}</div>
            <div className="stat-lbl">oportunidades<br />nos últimos 30 dias</div>
          </div>
          <div className="divider-v" />
          <div className="stat">
            <div className="stat-num">+500</div>
            <div className="stat-lbl">membros<br />já no movimento</div>
          </div>
          <div className="divider-v" />
          <div className="stat">
            <div className="stat-num">+1M<span className="stat-unit">R$ vendidos</span></div>
            <div className="stat-lbl">pelos<br />membros</div>
          </div>
        </div>
      </div>
    </section>);
}

// ─── PAIN POINTS ────────────────────────────────────────────────────────
function PainPoints() {
  return (
    <section className="section pain">
      <div className="container">
        <SectionLabel n="01" label="Você se identifica?" />
        <h2 className="h2 pain-h">
          <em>Se algum desses</em> soa familiar,<br />
          você está exatamente onde precisa estar.
        </h2>
        <div className="pain-grid">
          {PAIN_POINTS.map((p, i) =>
          <div className="pain-card" key={i}>
              <div className="pain-card-top">
                <span className="pain-n">{`#${String(i + 1).padStart(2, "0")}`}</span>
                <span className="pain-cat">{p.cat}</span>
                <span className="pain-spark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                    <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                  </svg>
                </span>
              </div>
              <p className="pain-quote-text">"{p.pain}"</p>
              <div className="pain-divider" />
              <div className="pain-solved">
                <span className="pain-solved-lbl">
                  <span className="pain-arrow" aria-hidden="true">→</span>
                  Resolvido com
                </span>
                <span className="pain-solved-text">{p.solved}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ─── SOLUTION ───────────────────────────────────────────────────────────
const VIP_FEATURES = [
  { n: "01", t: "Monitor de promoções 24/7", d: "Bots proprietários varrem Shopee, Mercado Livre, Amazon e mais. Promoções chegam no WhatsApp e Discord várias vezes ao dia.", badge: "ao vivo" },
  { n: "02", t: "Comunidade de networking",  d: "Discord com players que faturam de verdade. Troca de fornecedor, dica de canal, pergunta direta com quem já vive disso." },
  { n: "03", t: "Método e aulas gravadas",   d: "Como achar, comprar, anunciar e escalar. Da abertura de conta de vendedor até precificação avançada." },
  { n: "04", t: "Suporte 24h, direto",       d: "Time disponível na hora da dúvida, sem fila de atendimento. Dúvida na compra, resposta na hora." }
];

function Solution() {
  return (
    <section className="section solution" id="proposta">
      <div className="container">
        <div className="sol-grid">
          <div className="sol-left">
            <SectionLabel n="02" label="O que é o Giro X" />
            <h2 className="h2 sol-left">
              Arbitragem com bot.<br />
              <em>Dinheiro de verdade.</em>
            </h2>
            <p className="sol-p">
              O Giro X é uma <strong>comunidade de arbitragem online</strong> — não é curso, não é mentoria cara, não é grupo de promoção pra você economizar.
            </p>
            <p className="sol-p">
              A gente usa <strong>bots proprietários</strong> pra achar promoções nos maiores marketplaces antes do mercado. Você compra barato, revende caro. Simples assim.
            </p>

            <div className="how-it-works">
              <div className="how-step"><span className="how-n">1</span>Bot acha promoção</div>
              <span className="how-arrow">→</span>
              <div className="how-step"><span className="how-n">2</span>Você compra</div>
              <span className="how-arrow">→</span>
              <div className="how-step"><span className="how-n">3</span>Revende com margem</div>
            </div>

            <div className="sol-mech">
              <span className="mech-tag">Por que funciona</span>
              <p style={{margin:0, color:"var(--text-soft)", fontSize:"15px", lineHeight:1.55}}>
                Marketplaces têm flutuações de preço constantes. <em>Quem tem informação primeiro</em>, lucra. O Giro X é essa informação — organizada, validada e pronta pra agir.
              </p>
            </div>
          </div>

          <div className="sol-card">
            <div className="sol-card-hd">
              <span className="sol-card-hd-title">Giro X VIP</span>
              <span className="sol-card-hd-tag">
                <span className="sol-pulse" />
                Ativo agora
              </span>
            </div>
            <div className="sol-features">
              {VIP_FEATURES.map((f, i) =>
              <div className="sol-feat" key={i}>
                  <span className="sol-feat-n">{f.n}</span>
                  <div>
                    <div className="sol-feat-t">
                      {f.t}
                      {f.badge && <span className="sol-feat-badge">{f.badge}</span>}
                    </div>
                    <div className="sol-feat-d">{f.d}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="sol-card-foot">
              <div className="sol-foot-stat">
                <span className="sol-foot-num">+500</span>
                <span className="sol-foot-lbl">membros ativos</span>
              </div>
              <div className="sol-foot-stat">
                <span className="sol-foot-num">+R$ 1M</span>
                <span className="sol-foot-lbl">vendidos pelos membros</span>
              </div>
              <a href="#oferta" className="sol-foot-cta">Ver oferta →</a>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

// ─── BENEFITS ───────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section className="section benefits" id="beneficios">
      <div className="container">
        <SectionLabel n="03" label="O que você ganha" />
        <h2 className="h2">
          Tudo que você precisa.<br />
          <span className="muted">Nada que não precisa.</span>
        </h2>
        <div className="ben-grid">
          {BENEFITS.map((b, i) =>
          <article className="ben-card" key={i}>
              <span className="ben-n">{b.n}</span>
              <h3 className="ben-t">{b.t}</h3>
              <p className="ben-d">{b.d}</p>
            </article>
          )}
        </div>
      </div>
    </section>);
}

// ─── LIVE FEED ──────────────────────────────────────────────────────────
function LiveFeed() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % FEED_ITEMS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const visible = useMemo(() => {
    const out = [];
    for (let i = 0; i < 4; i++) out.push(FEED_ITEMS[(idx + i) % FEED_ITEMS.length]);
    return out;
  }, [idx]);

  return (
    <section className="section feed">
      <div className="container">
        <div className="feed-grid">
          <div className="feed-side">
            <SectionLabel n="04" label="Amostra real do feed" />
            <h2 className="h2">
              Assim chega<br />
              <em>uma oportunidade.</em>
            </h2>
            <p className="feed-p">
              Cada item vem com canal, ticket, margem estimada e contexto,
              pra você decidir em minutos se entra ou passa.
            </p>
            <div className="feed-legend">
              <span className="legend-pulse"><span /></span>
              <span>Simulação, atualiza a cada 2,6s</span>
            </div>
          </div>
          <div className="feed-card">
            <div className="feed-hd">
              <span className="feed-title">#oportunidades-do-dia</span>
              <span className="feed-meta">terça, 14:{(28 + idx).toString().padStart(2, "0")}</span>
            </div>
            <div className="feed-list">
              {visible.map((it, i) =>
              <div className={`feed-row ${i === 0 ? "new" : ""}`} key={`${idx}-${i}`}>
                  <div className="feed-row-top">
                    <span className="tag">{it.tag}</span>
                    <span className="feed-margin">{it.margin}</span>
                  </div>
                  <div className="feed-prod">{it.title}</div>
                  <div className="feed-note">{it.note}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);
}

// ─── SOCIAL PROOF ───────────────────────────────────────────────────────
function SocialProof() {
  return (
    <section className="section proof">
      <div className="container">
        <SectionLabel n="05" label="Prova social" />
        <div className="proof-top">
          <div className="proof-big">+500</div>
          <div className="proof-big-lbl">pessoas já estão no Giro X</div>
        </div>
        <div className="proof-grid">
          {[
          { focus: "Arbitragem", h: "Comprei na Shopee, revendi no ML, +R$ 4,8K em 22 dias", body: "Print real do produto postado no grupo + comprovante de venda no ML.", who: "[depoimento 1, a inserir]" },
          { focus: "Método", h: "Do zero ao primeiro pedido em 9 dias", body: "História de quem começou sem nunca ter vendido online e seguiu o método em vídeo.", who: "[depoimento 2, a inserir]" },
          { focus: "Networking", h: "Discord destravou um fornecedor que mudou meu mês", body: "Como uma troca no Discord abriu um canal que rendeu margem alta por semanas.", who: "[depoimento 3, a inserir]" }].
          map((p, i) =>
          <article className="proof-card" key={i}>
              <div className="proof-focus">Foco · {p.focus}</div>
              <div className="proof-h">{p.h}</div>
              <div className="proof-shot" aria-hidden="true">
                <div className="proof-shot-lbl">print de oportunidade aproveitada</div>
              </div>
              <p className="proof-body">{p.body}</p>
              <div className="proof-who">{p.who}</div>
            </article>
          )}
        </div>
      </div>
    </section>);
}

// ─── OFFER ──────────────────────────────────────────────────────────────
function Offer({ cta }) {
  return (
    <section className="section offer" id="oferta">
      <div className="container">
        <SectionLabel n="06" label="A oferta" />
        <div className="offer-grid">
          <div className="offer-copy">
            <h2 className="h2">
              Veja o que você acessa<br />
              <em>dentro do Giro X VIP.</em>
            </h2>
            <p className="offer-p">
              Quer sentir antes de decidir? Entre no grupo gratuito e veja uma amostra
              do que entregamos todos os dias. Quando estiver pronto, o VIP está aqui.
            </p>
            <a href="https://chat.whatsapp.com/JUnHqSttJbnHzRxoiTS7U1" target="_blank" rel="noopener" className="btn btn-ghost">Ver grupo gratuito <Arrow /></a>
          </div>
          <div className="offer-card">
            <div className="offer-card-hd">
              <div>
                <div className="offer-tier">Comunidade VIP</div>
                <div className="offer-tag">Acesso completo, sem fidelidade</div>
              </div>
              <div className="offer-price">
                <span className="offer-price-old">de R$ 150</span>
                <div className="offer-price-now">
                  <span className="offer-currency">R$</span>
                  <span className="offer-amount">49,99</span>
                  <span className="offer-period">/mês</span>
                </div>
              </div>
            </div>
            <ul className="offer-list">
              {[
              "Monitor 24/7 de promoções no WhatsApp e Discord",
              "Bots proprietários varrendo Shopee, ML, Amazon e mais",
              "Método em vídeo, do zero ao avançado",
              "Comunidade de networking com quem vive de arbitragem",
              "Suporte 24h direto com o time"].
              map((l, i) =>
              <li key={i}><span className="li-tick"><Tick /></span>{l}</li>
              )}
              <li className="bonus"><span className="li-tick bonus-tick">+</span><span><strong>Bônus fundador</strong>: preço travado em R$ 49,99 enquanto for assinante</span></li>
            </ul>
            <a href="https://pay.kiwify.com.br/r1NHjyp" target="_blank" rel="noopener" className="btn btn-primary btn-lg btn-full">{cta.primary} <Arrow size={16} /></a>
            <p className="offer-fine">{cta.sub} · Cartão · Pix · Boleto</p>
          </div>
        </div>
      </div>
    </section>);
}

// ─── OBJECTIONS ─────────────────────────────────────────────────────────
function Objections() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section obj">
      <div className="container">
        <SectionLabel n="07" label="Quebra de objeções" />
        <h2 className="h2">
          Tudo bem ter dúvida.<br />
          <span className="muted">A gente trata uma por uma.</span>
        </h2>
        <div className="obj-list">
          {OBJECTIONS.map((o, i) =>
          <div className={`obj-item ${open === i ? "open" : ""}`} key={i}>
              <button className="obj-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="obj-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="obj-q-text">{o.q}</span>
                <span className="obj-toggle">{open === i ? "−" : "+"}</span>
              </button>
              <div className="obj-a-wrap">
                <p className="obj-a">{o.a}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ─── GUARANTEE + URGENCY ────────────────────────────────────────────────
function GuaranteeUrgency() {
  return (
    <section className="section gu">
      <div className="container gu-grid">
        <div className="gu-card guarantee">
          <div className="gu-tag">Garantia</div>
          <div className="gu-big">7 dias.<br />Sem perguntas.</div>
          <p className="gu-p">
            Entrou, explorou tudo e sentiu que não é pra você? Pede o reembolso
            dentro do prazo. Devolvo 100%, sem burocracia.
          </p>
          <div className="gu-foot">
            <em>O risco é todo meu.</em>
            <span>A oportunidade é toda sua.</span>
          </div>
        </div>
        <div className="gu-card urgency">
          <div className="gu-tag urgency-tag">Vagas de fundador</div>
          <div className="gu-big">
            Só <span className="big-num">30</span> vagas a<br />
            <em>R$ 49,99/mês.</em>
          </div>
          <p className="gu-p">
            As primeiras 30 vagas entram pagando R$ 49,99/mês, preço travado enquanto
            forem assinantes. Depois que essas vagas fecharem, o valor sobe para R$ 150/mês.
          </p>
          <div className="urgency-bar">
            <div className="urgency-fill" style={{ width: "60%" }} />
            <div className="urgency-meta"><strong>12</strong> de 30 vagas restantes</div>
          </div>
        </div>
      </div>
    </section>);
}

// ─── FAQ ────────────────────────────────────────────────────────────────
function FAQList() {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-side">
            <SectionLabel n="08" label="Perguntas frequentes" />
            <h2 className="h2">Antes de entrar,<br /><em>tira a dúvida.</em></h2>
            <p className="faq-p">Se faltar alguma, manda no grupo gratuito que a gente responde.</p>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((f, i) =>
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="faq-toggle">{open === i ? "−" : "+"}</span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{f.a}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);
}

// ─── FINAL CTA ──────────────────────────────────────────────────────────
function FinalCTA({ cta }) {
  return (
    <section className="section final">
      <div className="container final-inner">
        <div className="final-eyebrow">
          <span className="dot" /> O giro certo muda o jogo
        </div>
        <h2 className="display final-h">
          Você chegou até aqui<br />
          porque <em>algo te trouxe.</em>
        </h2>
        <p className="final-p">
          O Giro X não promete atalho. Promete arbitragem com bot, método ensinado,
          comunidade que vive disso, e suporte na hora.
        </p>
        <p className="final-q"><em>A pergunta é:</em> você vai dar o seu giro?</p>
        <a href="https://pay.kiwify.com.br/r1NHjyp" target="_blank" rel="noopener" className="btn btn-primary btn-xl">{cta.primary} <Arrow size={18} /></a>

        <div className="ps-block">
          <div className="ps">
            <span className="ps-tag">PS</span>
            Ainda em dúvida? Entra no grupo gratuito primeiro, sente a comunidade. O VIP fica aqui esperando.
          </div>
          <div className="ps">
            <span className="ps-tag">PPS</span>
            Só 30 vagas com preço travado em R$ 49,99. Depois sobe pra R$ 150. Quem age primeiro, paga menos pra sempre.
          </div>
        </div>
      </div>
    </section>);
}

// ─── FOOTER ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="logo logo-img logo-footer">
            <img className="logo-word-img" src="assets/girox-wordmark.png" alt="Girox" style={{height:"48px"}} />
          </div>
          <p className="footer-tag">Inteligência de mercado para quem vende online.</p>
        </div>
        <div className="lgpd">
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>
              Ao se inscrever, você concorda com nossa <a href="#">Política de Privacidade</a> e
              com o tratamento dos seus dados conforme a LGPD.
            </span>
          </label>
        </div>
        <div className="footer-bot">
          <span>© 2026 Giro X · CNPJ 00.000.000/0001-00</span>
          <span className="footer-links">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="#">Contato</a>
          </span>
        </div>
      </div>
    </footer>);
}

// ─── HELPERS ────────────────────────────────────────────────────────────
function SectionLabel({ n, label }) {
  return (
    <div className="section-label">
      <span className="section-n">{n}</span>
      <span className="section-line" />
      <span className="section-name">{label}</span>
    </div>);
}

function Tick() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);
}

function shadeHex(hex, amt) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adj = (v) => Math.max(0, Math.min(255, Math.round(v + 255 * amt)));
  const to = (v) => adj(v).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

// ─── APP ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "A",
  "cta": "A",
  "accent": "#ffc940",
  "motion": true
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentDeep = useMemo(() => shadeHex(t.accent, -0.18), [t.accent]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-deep", accentDeep);
  }, [t.accent, accentDeep]);

  const headline = HEADLINES[t.headline] || HEADLINES.A;
  const cta = CTAS[t.cta] || CTAS.A;

  return (
    <div className="page">
      <Nav />
      <Hero headline={headline} cta={cta} motion={t.motion} />
      <PainPoints />
      <Solution />
      <Benefits />
      <SocialProof />
      <Offer cta={cta} />
      <Objections />
      <GuaranteeUrgency />
      <FAQList />
      <FinalCTA cta={cta} />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Mensagem" />
        <TweakRadio
          label="Headline"
          value={t.headline}
          options={["A", "B", "C"]}
          onChange={(v) => setTweak("headline", v)} />
        <div className="twk-hint">
          {t.headline === "A" && "Ângulo: oportunidade"}
          {t.headline === "B" && "Ângulo: movimento"}
          {t.headline === "C" && "Ângulo: pertencimento"}
        </div>
        <TweakRadio
          label="CTA"
          value={t.cta}
          options={["A", "B"]}
          onChange={(v) => setTweak("cta", v)} />
        <div className="twk-hint">
          {t.cta === "A" ? "Ação direta" : "Atitude, preço"}
        </div>
        <TweakSection label="Visual" />
        <TweakColor
          label="Acento"
          value={t.accent}
          options={["#ffc940", "#ffa530", "#d4ff3a", "#5b8cff"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle
          label="Animação"
          value={t.motion}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </div>);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
