// Netlify "submission-created" event function.
// Si attiva da solo quando arriva un ordine dal form Netlify "ordine-abbonamento"
// e invia la MAIL DI CONFERMA al cliente.
//
// === DA ATTIVARE (una volta sola) ===
// 1. Crea un account su Resend (https://resend.com) — piano gratuito ok.
// 2. Verifica il dominio mittente (es. movimentonelbosco.it) su Resend.
// 3. Su Netlify → Site settings → Environment variables, aggiungi:
//      RESEND_API_KEY   = la tua chiave Resend
//      MAIL_FROM        = "Movimento nel Bosco <info@movimentonelbosco.it>"
//      MAIL_BCC         = (facoltativo) tua email per ricevere copia degli ordini
// Senza RESEND_API_KEY la funzione non fa nulla (l'ordine resta comunque salvato
// su Netlify Forms e ti arriva la notifica configurata lì).

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const payload = body.payload || {};
    if (payload.form_name && payload.form_name !== 'ordine-abbonamento') {
      return { statusCode: 200, body: 'ignored' };
    }

    const d = payload.data || {};
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
  } catch (err) {
    return { statusCode: 200, body: 'error: ' + err.message };
  }
};
