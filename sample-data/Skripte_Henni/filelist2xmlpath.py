from os import listdir
from os.path import isfile, join
import xlsxwriter

workbook = xlsxwriter.Workbook('XMLpath.xlsx')
worksheet = workbook.add_worksheet()

mypath = "C:/Users/Henni/Dropbox/CDV/DM/dm_digiporta_xml-190221/Auswahl/"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
liste = []
for filename in onlyfiles:
    liste.append("http://www.digiporta.net/opendata/dm/xml/"+filename)

worksheet.write_column("A1", liste)

workbook.close()