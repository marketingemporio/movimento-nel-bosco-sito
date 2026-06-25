# PAGINE — mappa contenuti & immagini

> Da dove arriva il contenuto di ogni pagina e quali immagini reali usa.
> **Fonte testi**: export GemPages in `Pagine gempages/` (ZIP → `1_<id>.json`). **Fonte prezzi**: prodotti Shopify di Emporio (API).
> **Immagini**: CDN Shopify, base `https://cdn.shopify.com/s/files/1/0562/4512/5328/files/`.

## Inventario pagine (12 in scope)

| File sito | Pagina origine (handle Shopify) | Prodotto Shopify collegato |
|---|---|---|
| `index.html` (HOME) | `corsi-yoga-pilates-meditazione` (hub) | — |
| `yoga.html` | `corso-yoga` | `yoga-abbonamento` |
| `pilates.html` | `classi-pilates` | `abbonamento-pilates` |
| `gravidanza.html` | `yoga-gravidanza` | `abbonamento-yoga-gravidanza` |
| `mamma-e-bimbo.html` | `yoga-mamma-bimbo` | `abbonamento-yoga-mamma-e-bimbo` |
| `meditazione.html` | `meditazione` (Sessioni di Meditazione) | `abbonamento-meditazione-e-chakra` |
| `orari.html` | `orari-corsi` | — |
| `abbonamenti.html` | `abbonamenti` | tutti i prodotti "Corsi" |
| `regolamento.html` | `regolamento-corsi` | — |
| `prenota.html` | `prenota-lezione` | — (→ app) |
| `laura-albertini.html` | `laura-albertini` | — |
| `camilla-rossini.html` | `camilla-rossini` | — |

## Prodotti abbonamento (prezzi reali Shopify)
- **Yoga** (`yoga-abbonamento`): 1=17€, 4=64€, 12=167€, Open=275€ (include Pilates), Lezione privata=45€, Estivo 5=75€, Estivo 10=145€
- **Pilates** (`abbonamento-pilates`): 1=17€, 4=64€, 12=167€, Open=275€ (include Yoga), Estivo 5/10
- **Yoga in Gravidanza** (`abbonamento-yoga-gravidanza`): 1=17€, 4=64€, 8=124€, 12=167€
- **Mamma e Bimbo** (`abbonamento-yoga-mamma-e-bimbo`): 1=17€, 4=55€
- **Meditazione e Chakra** (`abbonamento-meditazione-e-chakra`): percorso 7=120€, singola=20€
- Altri esistenti: Yoga Annuale (425/450€), Yoga Private (5=210€/10=400€), Gravidanza/Yoga Dolce "Brescia Musei" (150€)

## Immagini usate per pagina (nomi file CDN)
- **index**: hero `gempages_...c4e7099f...jpg` · card `...0c95a512...jpg`/`Camilla_pilates_2.jpg`/`...ac3679d9...png`/`pregnant-woman-practicing-yoga.jpg`/`...806cd946...jpg` · aromaterapia `...7bddd503...png` · insegnanti `Camilla_Rossini.jpg` · Emporio `...7e4ef32a...jpg`
- **yoga**: hero `...2327a3e9...jpg` · rituale `...ea2c0925...jpg` · oli `essential_oils.jpg` · eventi `...51f6c4eb...png` (Ronchi), `...79127057...png` (Sale Marasino), `...0d1c8140...png` (Colombè), `peschi_calina_temp.jpg` (Calina), `giardino_di_manipura.jpg` (Manipura)
- **pilates**: hero `Camilla_pilates_2.jpg` · Camilla `Camilla_Rossini.jpg` · attrezzi `pilates_corpo_libero_*.png`, `pilates_pesetti.png`, `pilates_elastico.png`, `pilates_pattine.png`, `pilates_softball.png` · posa `Camilla_pilates_posa.png`
- **gravidanza**: hero `...b87659c6...jpg` · sezione dolce `...57f3543d...jpg`
- **mamma-e-bimbo**: hero `yoga_mammabimbo_banner.jpg` · sezione `mamma_bimbo_yoga.jpg`
- **meditazione**: hero `MeditazioneChakra.jpg` · 7° chakra `Campo_lavanda.jpg` · Camilla `Consulenza_con_Camilla.jpg`
- **orari**: hero `...0c95a512...jpg` · **palinsesto** `orari_complessivi_2026.png` (+ `orari_complessivi_2026_vericale.png` su mobile)
- **abbonamenti**: hero `...0c95a512...jpg` · `Calendario_Corsi_Documento_A4.jpg`
- **regolamento**: hero `essential_oils.jpg`
- **prenota**: hero `...0c95a512...jpg`
- **laura-albertini**: hero `...6c16e229...jpg` · aromaterapia `essential_oils.jpg`
- **camilla-rossini**: hero `Camilla_banner.jpg` · card `Camilla_pilates_posa.png`/`floriterapia.png`/`Meditazione_Camilla.jpg` · chi sono `Camilla_in_negozio_*.jpg`

## Note di contenuto (fedeltà / scelte)
- **Yoga** cita due insegnanti (Laura Albertini e Laura Mantratzi) e un'offerta **"Yoga Over 60"** + sezione **Eventi Yoga**.
- **Meditazione/Gravidanza/Pilates/Eventi** sono testi fedeli all'export; alcuni riferimenti a date (es. percorso Chakra 15 mag–26 giu) sono ciclici → verificare l'anno.
- I **PNG decorativi** di GemPages (divisori/sfondi grafici, non foto) sono stati omessi di proposito.
- Recensioni Google (Elisa Novali, Silvia Lilith, Chiara M.) riusate su più pagine come nell'originale.
