<h2><img src="assets/logo/app_72x72.png">Gastrograntler</h2>



Speisekarten App  
Cod1ng da V1nc1 Süd 2019

*Warnhinweis : Zurzeit (16.5 13:09) kommt es noch zu Änderungen der Inhalte. Gerade werden die Texte noch redigiert. Abgesehen davon ist die Anwendung aber schon funktionstüchtig*

<img src="screens/gastrograntler_intro.PNG" width="33%">

Installationsanleitung:  
Gastrograntler läuft zurzeit nur offline, da uns die Kapazitäten für einen Serverbetrieb (> 10 GB Speicherplatz für die Bilder) fehlen.  

**Ausführen: **     
index.html aufrufen.

Für ein zufriedenstellendes Benutzererlebnis ist daher ein lokaler IIIF-Server zur Anzeige der Bilder notwendig.  

<img src="docs/Architektur.png" width="33%">


IIIF-Server:  
- Cantaloupe 4.0.3 (https://cantaloupe-project.github.io/) installieren und Installationsanleitung befolgen  
- Ordner aus der Monacensia mit den Dateien (https://download.codingdavinci.de/index.php/s/GTZZHDKqqpzKnsR?path=%2F) downloaden, die Verzeichnisstruktur beibehalten und in den bei der Cantaloupe-Config festgelegten Bilderpfad legen  
- Optional: unter js/data/data_config.js config.iiifserver den Aufrufpfad (Url/port/Ordner/) zum IIIF-Server ändern. Defaultmäßig ist dieser http://localhost:8182/iiif/v2/  

(Optional: CouchDB)  
Ein Sync der lokal gespeicherte Browserdaten mit einer zentralen Datenbank kann mit einer lokalen oder einer serverseitgen CouchDB geschehen.  
- Apache CouchDB 2.3.1 (http://couchdb.apache.org/) installieren  
- Datenbanken in der CouchDB zum Sync anlegen. Die Liste der Datenbank kürzel befinden sich unter js/DB/DB.js  
- Optional: unter js/data/data_config.js config.couchDB den Aufrufpfad (Url/port/Ordner/) zur CouchDB-Server ändern. Defaultmäßig ist dieser http://localhost:5984/  



Einige Browser (Chrome) brauchen den Aufruf von einen Webserver für Funktionalitäten des ServiceWorkers (Add to Homescreen, Push Notifications):  
- python -m http.server,  
- dann localhost:8000  


Screens:
<p>
Suchfunktion in der Liste der Wirtshäuser:
<img src="screens/pubs-list-search.PNG" width="33%">
</p><p>
Detailansicht des Wirtshaus Augustiner:
<img src="screens/pubs-detail.PNG" width="33%">  
</p><p>
Detailansicht der Speisekarten des Wirtshaus Augustiner:
<img src="screens/pubs-menu-list.PNG" width="33%">  
</p><p>
Detailansicht einer eingezoomten Speisekartenseite:
<img src="screens/pubs-menupage-detail.PNG" width="33%">  
</p><p>
Auswählen einer Kategorie nach dem Zeichnen einer Fläche
<img src="screens/pubs-menupage-anno-select.PNG" width="33%">  
</p><p>
Info-Dialog zu Kategorie ausfüllen
<img src="screens/pubs-menupage-add-category.PNG" width="33%">  
</p><p>
Info-Dialog zu Gericht ausfüllen
<img src="screens/pubs-dishes-add.PNG" width="33%">  
</p><p>
Anzeige der Info aus einer Annotation
<img src="screens/pubs-menupage-showinfo.PNG" width="33%">  
</p><p>
Stadtplan mit ausgewähltem Wirtshaus
<img src="screens/map-info.PNG" width="33%">  
</p><p>
Deine Bewertungen und Annotationen
<img src="screens/your-ratings.PNG" width="33%">  
</p><p>
Alle Gerichte eines Gasthauses anzeigen
<img src="screens/pubs-list-detail.PNG" width="33%">  
</p><p>
Bewertung zu einem Gericht hinterlassen
<img src="screens/pubs-dish-rating.PNG" width="33%">  
</p><p>
Bewertungen zu einem Gericht anzeigen
<img src="screens/pubs-dishes-rating-show.PNG" width="33%">  
</p><p>
Offenes Menü:
<img src="screens/menu.PNG" width="33%">  
</p>
