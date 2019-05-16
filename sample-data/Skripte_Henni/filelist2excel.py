from os import listdir
from os.path import isfile, join
import xlsxwriter

workbook = xlsxwriter.Workbook('imgIDs.xlsx')
worksheet = workbook.add_worksheet()

mypath = "C:/Users/Henni/Dropbox/CDV/portraits/"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

worksheet.write_column("A1", onlyfiles)

workbook.close()