**About JS **
**Wichtige Daten und Dateien (abgesehen von Frameworks):**
../index.html
Enthält die einzelnen Seiten des Programms (Seiten / Popups / Felder) und die Definitionen des Material Components for the Web frameworks

../sw.js  
- Enthält den ServiceWorker  

../manifest.json
- Enthält das Manifest  

handler.js  
- Enthält jquery-events auf Seiten-ID's, Elemente etc...  

functions.js   
- Enthält Funktionen, welche der handler ausführt.  

snackbar.js  
- Enthält Funktionen rund um die Snackbar  

data/data_config.js  
- enthält Konfigdateien, globale Variablen welche die Konfig der Applikation (URIS etc...), des aktuellen Users und der Anwendung enthält.

data/data_consistency.js  
- überprüft, ob eine Datenbank Inhalte enthält und lädt sonst die Inhalte aus data_sample.js in die Datenbank und erstelle passende Indexes.

data/data_sample.js  
- Enthält Beispielsobjekte und Daten in den in data_structure.js festgelegten Serialisierungen.

data/data_structure.js  
- Enthält Serialisierungen der Objekte zum Import / Export:
- Enthält die Demodaten

DB/DB.js  
- Enthält die PouchDB's und Funktionen zum einfachen Zugriff darauf

leaflet/iiif_init.js  
- Enthält erweiterte Funktionen um den IIIF-Viewer

leaflet/map_init.js  
- Enthält erweiterte Funktionen um die Karte
