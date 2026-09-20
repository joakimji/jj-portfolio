# Joakim Jilderby — MyPortfolio

En fristående, responsiv onepager med bildgalleri och större bildvisning. Den fungerar utan installation, internet, externa typsnitt eller JavaScript-bibliotek.

## Visa sidan

Packa upp hela zip-filen och öppna **index.html** i en modern webbläsare. Behåll filerna och mappen `bilder` tillsammans. Klicka på en bild för större visning. Bläddra med pilarna, tangentbordet eller en svepning på mobilen. Stäng med krysset eller Escape.

## Byt till dina bilder

1. Lägg bilderna i mappen **bilder**, bredvid `index.html`. JPG, JPEG, PNG, WebP, AVIF och GIF stöds.
2. Ta bort de exempelbilder som du inte vill ha kvar.
3. Kör **python uppdatera.py** från sidans mapp (på vissa datorer: `python3 uppdatera.py`). Detta kräver Python 3.
4. Öppna eller ladda om `index.html`.

Skriptet hittar bildfiler direkt i mappen, sorterar dem på filnamn och uppdaterar `bilder.js`. Använd gärna `01-`, `02-` och så vidare för önskad ordning. Befintliga bildtexter bevaras för oförändrade filnamn. Titlar för nya bilder hämtas från filnamnen.

En statisk webbsida kan inte själv lista en lokal mapp. Därför finns uppdateringsskriptet. Om du inte vill använda Python kan du ändra listan i **bilder.js** för hand. Använd dubbla citattecken runt alla nycklar och texter och undvik komma efter sista posten.

Du kan också ersätta befintliga bildfiler med egna filer med exakt samma filnamn. Ändra då titlar, alternativtexter och `example` till `false` i `bilder.js`.

## Ändra innehåll och stil

- **index.html**: namn, introduktion, presentation och sidfot.
- **style.css**: färger, typsnitt, storlekar och mellanrum.
- **bilder.js**: sökväg (`src`), titel (`title`), kategori (`category`), beskrivande alternativtext (`alt`) och om det är en exempelbild (`example`).
- **app.js**: galleri och bildvisning.

Den lilla texten om exempelbilder försvinner när ingen bild längre har `example: true`. Presentationen är en föreslagen text som du kan anpassa. Inga kontaktuppgifter eller externa tjänster har lagts till.

För publicering på ett vanligt webbhotell: ladda upp `index.html`, `style.css`, `app.js`, `bilder.js` och hela mappen `bilder`. Inget byggsteg eller serverprogram krävs. Kör uppdateringsskriptet lokalt efter att nya bilder lagts till och ladda sedan upp även den uppdaterade `bilder.js`.

## Exempelbilder

De fyra bilderna är AI-genererade för denna skiss och föreställer en fjord, arkitektur, en skog och en kust. De är inte Joakims egna fotografier eller dokumentation av bestämda platser. Genereringsbeskrivningarna finns i `bildprompter.txt`.
