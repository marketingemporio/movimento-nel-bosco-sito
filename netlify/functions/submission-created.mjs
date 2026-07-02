// Netlify "submission-created" event function.
// Si attiva da sola a OGNI invio di un modulo Netlify del sito e smista in base al modulo:
//   1) "ordine-abbonamento" -> invia la MAIL DI CONFERMA ordine (Resend)
//   2) "avvisami-eventi"    -> aggiunge il contatto a una LISTA BREVO (avvisi sulle date)
//
// === VARIABILI D'AMBIENTE (Netlify -> Site settings -> Environment variables) ===
// Per la conferma ordini (Resend):
//      RESEND_API_KEY = la tua chiave Resend
//      MAIL_FROM      = "Movimento nel Bosco <info@movimentonelbosco.it>"
//      MAIL_BCC       = (facoltativo) tua email per ricevere copia degli ordini
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
