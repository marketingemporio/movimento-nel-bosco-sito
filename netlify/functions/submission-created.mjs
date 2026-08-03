// Netlify "submission-created" event function.
// Si attiva da sola a OGNI invio di un modulo Netlify del sito e smista in base al modulo:
//   1) "ordine-abbonamento" -> invia la MAIL DI CONFERMA ordine (Resend)
//   2) "avvisami-eventi"    -> aggiunge il contatto a una LISTA BREVO (avvisi sulle date)
//   3) "prova-gratuita"     -> mail di conferma a chi compila + copia alla scuola (Resend)
//
// === VARIABILI D'AMBIENTE (Netlify -> Site settings -> Environment variables) ===
// Per la conferma ordini (Resend):
//      RESEND_API_KEY = la tua chiave Resend
//      MAIL_FROM      = "Movimento nel Bosco <info@movimentonelbosco.it>"
//      MAIL_BCC       = (facoltativo) tua email per ricevere copia degli ordini
//      MAIL_PROVA     = (facoltativo) dove arriva la copia delle richieste di prova
//                       (default: paola@movimentonelbosco.it)
// Per gli avvisi eventi (Brevo):
//      BREVO_API_KEY  = chiave API di Brevo (Brevo -> impostazioni -> SMTP & API -> API Keys)
//      BREVO_LIST_ID  = numero della lista Brevo in cui salvare gli iscritti agli avvisi
//
// Se mancano le chiavi la funzione esce pulita: l'invio resta comunque salvato
// su Netlify Forms (e ti arriva la notifica configurata lì).

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const payload = body.payload || {};
    const formName = payload.form_name || '';
    const d = payload.data || {};

    if (formName === 'avvisami-eventi') {
      return await aggiungiContattoBrevo(d);
    }
    if (formName === 'ordine-abbonamento') {
      return await inviaConfermaOrdine(d);
    }
    if (formName === 'prova-gratuita') {
      return await inviaRichiestaProva(d);
    }
    // Qualsiasi altro modulo: non facciamo nulla (resta comunque salvato su Netlify).
    return { statusCode: 200, body: 'ignored' };
  } catch (err) {
    return { statusCode: 200, body: 'error: ' + err.message };
  }
};

// === Modulo "avvisami-eventi" -> aggiunge/aggiorna il contatto su Brevo ===
async function aggiungiContattoBrevo(d) {
  const apiKey = process.env.BREVO_API_KEY;
  const email = d.email;
  if (!apiKey || !email) {
    // Niente chiave o niente email: esci pulito, l'iscrizione è comunque salvata su Netlify.
    return { statusCode: 200, body: 'no-send' };
  }

  const listId = process.env.BREVO_LIST_ID;
  const listIds = listId ? [Number(listId)] : undefined;

  // 1° tentativo: salva email + nome + evento (richiede gli attributi NOME ed EVENTO su Brevo).
  let res = await brevoUpsert(apiKey, {
    email,
    attributes: { NOME: d.nome || '', EVENTO: d.evento || '' },
    listIds,
    updateEnabled: true // se il contatto esiste già, lo aggiorna invece di dare errore
  });

  // Rete di sicurezza: se gli attributi non esistono ancora su Brevo (errore 400),
  // riprova salvando almeno l'email nella lista, così non si perde l'iscritto.
  if (res.status === 400) {
    res = await brevoUpsert(apiKey, { email, listIds, updateEnabled: true });
  }

  // Brevo risponde 201 (creato) o 204 (aggiornato): entrambi vanno bene.
  return { statusCode: res.ok ? 200 : 502, body: res.ok ? 'brevo-ok' : 'brevo-error' };
}

// Piccola scorciatoia per chiamare l'API "crea/aggiorna contatto" di Brevo.
function brevoUpsert(apiKey, payload) {
  return fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

// Piccolo escape per non rompere l'HTML della mail con i dati del form.
function esc(s) {
  return String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// === Modulo "prova-gratuita" -> conferma a chi compila + copia alla scuola (Resend) ===
async function inviaRichiestaProva(d) {
  const nome = d.nome || '';
  const email = d.email;
  const telefono = d.telefono || '';
  const disciplina = d.disciplina || '';
  const messaggio = d.messaggio || '';

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) {
    // Niente chiave o niente email: esci pulito, la richiesta è comunque salvata su Netlify Forms.
    return { statusCode: 200, body: 'no-send' };
  }

  const from = process.env.MAIL_FROM || 'Movimento nel Bosco <onboarding@resend.dev>';
  const scuola = process.env.MAIL_PROVA || 'paola@movimentonelbosco.it';

  // 1) Conferma a chi ha compilato
  const htmlCliente = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#2b1a2e">
      <h2 style="color:#4a1463">Grazie ${esc(nome) || 'e benvenuto'}! 🌿</h2>
      <p>Abbiamo ricevuto la tua richiesta per una lezione di prova${disciplina ? ` di <strong>${esc(disciplina)}</strong>` : ''}.</p>
      <p>Ti scriviamo a breve per proporti giorno e orario. La prima lezione è gratuita e senza impegno.</p>
      ${messaggio ? `<p style="color:#6e1e8e">Il tuo messaggio: “${esc(messaggio)}”</p>` : ''}
      <p style="color:#6e1e8e">A presto,<br>Movimento nel Bosco — Mompiano (Brescia)</p>
    </div>`;

  // 2) Copia alla scuola, con reply-to su chi ha scritto (così basta "Rispondi")
  const htmlScuola = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#2b1a2e">
      <h2 style="color:#4a1463">Nuova richiesta di prova</h2>
      <p><strong>Nome:</strong> ${esc(nome) || '—'}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${telefono ? `<p><strong>Telefono:</strong> ${esc(telefono)}</p>` : ''}
      <p><strong>Corso:</strong> ${esc(disciplina) || '—'}</p>
      ${messaggio ? `<p><strong>Messaggio:</strong> ${esc(messaggio)}</p>` : ''}
    </div>`;

  const inviaMail = (to, subject, html, replyTo) => fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, reply_to: replyTo })
  });

  const r1 = await inviaMail(email, 'Richiesta di prova ricevuta — Movimento nel Bosco', htmlCliente);
  const r2 = await inviaMail(scuola, `Nuova richiesta di prova — ${nome || email}`, htmlScuola, email);

  const ok = r1.ok && r2.ok;
  return { statusCode: ok ? 200 : 502, body: ok ? 'sent' : 'send-error' };
}

// === Modulo "ordine-abbonamento" -> mail di conferma ordine (Resend) ===
async function inviaConfermaOrdine(d) {
  const cliente = d.nome || 'cliente';
  const email = d.email;
  const abbonamento = d.abbonamento || '';
  const prezzo = d.prezzo || '';
  const metodo = d.metodo_pagamento || '';

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) {
    // Niente chiave o niente email: esci pulito, l'ordine è comunque salvato.
    return { statusCode: 200, body: 'no-send' };
  }

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#2b1a2e">
      <h2 style="color:#4a1463">Grazie ${cliente}! 🌿</h2>
      <p>Abbiamo ricevuto il tuo ordine per <strong>${abbonamento}</strong> (${prezzo}).</p>
      <p>Metodo scelto: <strong>${metodo}</strong>.</p>
      <p>${metodo.startsWith('Bonifico')
        ? 'A breve ti inviamo i dati per il bonifico: appena lo ricevi attiviamo l\'abbonamento.'
        : 'Puoi pagare direttamente in sede alla tua prima lezione.'}</p>
      <p>Una volta confermato il pagamento ricevi le credenziali per l'app di prenotazione.</p>
      <p style="color:#6e1e8e">A presto,<br>Movimento nel Bosco — Mompiano (Brescia)</p>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Movimento nel Bosco <onboarding@resend.dev>',
      to: [email],
      bcc: process.env.MAIL_BCC ? [process.env.MAIL_BCC] : undefined,
      subject: 'Ordine ricevuto — Movimento nel Bosco',
      html
    })
  });

  return { statusCode: res.ok ? 200 : 502, body: res.ok ? 'sent' : 'send-error' };
}
