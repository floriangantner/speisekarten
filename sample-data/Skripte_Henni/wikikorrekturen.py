import xlsxwriter
import wikipedia

wikipedia.set_lang("de")
workbook = xlsxwriter.Workbook('korrekturen.xlsx')
worksheet = workbook.add_worksheet()
personen = ["Anna Amalia von Braunschweig-Wolfenbüttel","Eugène Chevreul","Emil Dietrich (Bauingenieur)","Adolph Ferdinand Duflos","Elisabetta Fiorini Mazzanti","Francesco Fontana (Astronom)","Georg Hartmann (Mathematiker)","Wilhelm Jordan (Geodät)","Hermann Kopp (Chemiker)","Alfred Kuhn (Chemiker)","Émilie du Châtelet","Franz Pichler (Ingenieur)","Johann Georg Pickel","Franz Prášil","Philipp Jakob Sachs von Löwenheim","Siemens (Unternehmerfamilie)","Rudolf Spitaler (Klimatologe)","Johannes Thiele (Chemiker)","Nikolai Wladimirowitsch Timofejew-Ressowsk","Georg Schlesinger (Hochschullehrer)","Wilhelm Eduard Weber"]
row=0
col=0

for id in personen:
    rowcontent = [id]
    try:
    #try to load the wikipedia page
        rowcontent.append(wikipedia.summary(id))
    except wikipedia.exceptions.DisambiguationError:
    #if a "PageError" was raised, ignore it and continue to next link
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    except wikipedia.exceptions.PageError:
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    worksheet.write_row(row, col, tuple(rowcontent))
    row+=1
    


wikipedia.set_lang("it")
personen = ["Vincenzo Diamare"]

for id in personen:
    rowcontent = [id]
    try:
    #try to load the wikipedia page
        rowcontent.append(wikipedia.summary(id))
    except wikipedia.exceptions.DisambiguationError:
    #if a "PageError" was raised, ignore it and continue to next link
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    except wikipedia.exceptions.PageError:
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    worksheet.write_row(row, col, tuple(rowcontent))
    row+=1
    

wikipedia.set_lang("fr")
personen = ["Frédéric Kirschleger"]

for id in personen:
    rowcontent = [id]
    try:
    #try to load the wikipedia page
        rowcontent.append(wikipedia.summary(id))
    except wikipedia.exceptions.DisambiguationError:
    #if a "PageError" was raised, ignore it and continue to next link
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    except wikipedia.exceptions.PageError:
        worksheet.write_row(row, col, tuple(rowcontent))
        continue
    worksheet.write_row(row, col, tuple(rowcontent))
    row+=1
    
    
workbook.close()