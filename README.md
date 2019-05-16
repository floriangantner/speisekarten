**Gastrograntler**

Speisekarten App  
Cod1ng da V1nc1 Süd 2019  

![Bild des Gastrograntler Intro-Screens](screens/gastrograntler_intro.PNG)

Installationsanleitung:  
Gastrograntler läuft zurzeit nur offline, da uns die Kapazitäten für einen Serverbetrieb (> 10 GB Speicherplatz für die Bilder) fehlen.  

Für ein zufriedenstellendes Benutzerlebnis ist ein lokaler IIIF-Server zur Anzeige der Bilder notwendig.  

IIIF-Server:  
- Cantaloupe 4.0.3 (https://cantaloupe-project.github.io/) installieren und Installationsanleitung befolgen  
- Ordner aus der Monacensia mit den Dateien (https://download.codingdavinci.de/index.php/s/GTZZHDKqqpzKnsR?path=%2F) downloaden, die Verzeichnisstruktur beibehalten und in den bei der Cantaloupe-Config festgelegten Bilderpfad legen  
- Optional: unter js/data/data_config.js config.iiifserver den Aufrufpfad (Url/port/Ordner/) zum IIIF-Server ändern. Defaultmäßig ist dieser http://localhost:8182/iiif/v2/  

(Optional: CouchDB)  
Ein Sync der lokal gespeicherte Browserdaten mit einer zentralen Datenbank kann mit einer lokalen oder einer serverseitgen CouchDB geschehen.  
- Apache CouchDB 2.3.1 (http://couchdb.apache.org/) installieren  
- Datenbanken in der CouchDB zum Sync anlegen. Die Liste der Datenbank kürzel befinden sich unter js/DB/DB.js  
- Optional: unter js/data/data_config.js config.couchDB den Aufrufpfad (Url/port/Ordner/) zur CouchDB-Server ändern. Defaultmäßig ist dieser http://localhost:5984/  


**Ausführen: **     
index.html aufrufen.

Einige Browser (Chrome) brauchen den Aufruf von einen Webserver für Funktionalitäten des ServiceWorkers (Add to Homescreen, Push Notifications):  
- python -m http.server,
- dann localhost:8000

Screens:
Suchfunktion in der Liste der Wirtshäuser:
![Suchfunktion in der Liste der Wirtshäuser](screens/pubs-list-search.PNG)

Detailansicht des Wirtshaus Augustiner:
![Detailansicht des Wirtshaus Augustiner](screens/pubs-detail.PNG)

Detailansicht der Speisekarten des Wirtshaus Augustiner:
![Detailansicht der Speisekarten des Wirtshaus Augustiner](screens/pubs-menu-list.PNG)

Detailansicht einer eingezoomten Speisekartenseite:
![Detailansicht einer eingezoomten Speisekartenseite](screens/pubs-menupage-detail.PNG)

Auswählen einer Kategorie nach dem Zeichnen einer Fläche
![Auswählen einer Kategorie nach dem Zeichnen einer Fläche](screens/pubs-menupage-anno-select.PNG)

Info-Dialog zu Kategorie ausfüllen
![Info-Dialog zu Kategorie ausfüllen](screens/pubs-menupage-add-category.PNG)

Info-Dialog zu Gericht ausfüllen
![Info-Dialog zu Gericht ausfüllen](screens/pubs-dishes-add.PNG)

Anzeige der Info aus einer Annotation
![Anzeige der Info aus einer Annotation](screens/pubs-menupage-showinfo.PNG)

Stadtplan mit ausgewähltem Wirtshaus
![Stadtplan mit ausgewähltem Wirtshaus](screens/map-info.PNG)

Deine Bewertungen und Annotationen
![Deine Bewertungen und Annotationen](screens/your-ratings.PNG)

Alle Gerichte eines Gasthauses anzeigen
![Alle Gerichte eines Gasthauses anzeigen](screens/pubs-list-detail.PNG)

Bewertung zu einem Gericht hinterlassen
![Bewertung zu einem Gericht hinterlassen](screens/pubs-dish-rating.PNG)

Bewertungen zu einem Gericht anzeigen
![Bewertung zu einem Gericht anzeigen](screens/pubs-dishes-rating-show.PNG)

Offenes Menü:
![Offenes Menü](screens/menu.PNG)
