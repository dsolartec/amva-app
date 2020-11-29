#this script loads json files and generates sound events
#coding=utf-8
# to get the json file:
# https://webservices.metropol.gov.co/SIMAPI/api/EnClicla/ObtenerPrestamos?FechaIni=20201117&FechaFin=20201118

import json
from datetime import datetime, date, time
#import time

with open('20201121.json') as f:
  data = json.load(f)

def subtraction(listA, listB):
	#print listA, listB
	hora=listA[0]-listB[0]
	minuto=listA[1]-listB[1]
	segundo=listA[2]-listB[2]

	diferencia= abs((hora*60)+minuto)
	return diferencia


lista_estaciones=[]
for event in data:
	lista_estaciones.append(event['descripcionPrestamo'])
	event['descripcionDevolucion'] 
	lista_estaciones.append(event['descripcionDevolucion'])

lista_estaciones=list(set(lista_estaciones))
print lista_estaciones

out_dict={}
for event in data:
	pm=0
	#print event
	end=event['fechaDevolucion']#[11:-5]
	end=end[11:].split(":")
	if end[0]!="":
		#print end[2][-4:]
		if end[2][-4:]=="p.m.":
			pm=12
		#print end[0]
		end[0]=int(end[0])+pm # convert to 24h
		end[1]=int(end[1])
		end[2]=int(end[2][:-5])
		#end.append(pm)
	
	beginning=event['fechaPrestamo']
	beginning=beginning[11:].split(":")
	if beginning[0]!="":
		#print beginning[2][-4:]
		if beginning[2][-4:]=="p.m.":
			pm=12
		#print beginning[0]
		beginning[0]=int(beginning[0])+pm # convert to 24h
		beginning[1]=int(beginning[1])
		beginning[2]=int(beginning[2][:-5])
		#beginning.appbeginning(pm)
	
	
	tipo= str(type(beginning[0])), str(type(end[0]))
	
	

	if "<type 'unicode'>" not in tipo:
	
		diff=subtraction(end,beginning)
		#duration = datetime.combine(date.min, end) - datetime.combine(date.min, beginning)
		#print event['descripcionPrestamo'], event['descripcionDevolucion'], diff
		mins=beginning[0]*60+beginning[1]
		if mins in out_dict:
			out_dict[mins]=out_dict[mins]+(lista_estaciones.index(event['descripcionPrestamo']), lista_estaciones.index(event['descripcionDevolucion']), diff)

		else:
			out_dict[mins]=lista_estaciones.index(event['descripcionPrestamo']), lista_estaciones.index(event['descripcionDevolucion']), diff


		#print beginning[:2], lista_estaciones.index(event['descripcionPrestamo']), lista_estaciones.index(event['descripcionDevolucion']), diff

# crear el archivo para las visualizaciones tipo1
# fileout = open("20201121.txt", "w")
# for key in out_dict:
# 	print key, out_dict[key]
# 	line=" ".join(str(x) for x in out_dict[key])
# 	fileout.write(str(key)+", "+str(line)+";"+"\n")
# 	#print >>fileout, key+',',str(line)+';'

# fileout.close()

##################################################
# crear el archivo para las visualizaciones tipo2
################## histogramas ###################
##################################################

fileout = open("20201121-histo.txt", "w")
for key in out_dict:
	print key, out_dict[key]
	print key, "salida", out_dict[key][0::3]
	print key, "llegada", out_dict[key][1::3]
	line=" ".join(str(x) for x in out_dict[key][0::3]) 
	fileout.write(str(key)+"s"+", "+str(line)+";"+"\n")
	line=" ".join(str(x) for x in out_dict[key][1::3]) 
	fileout.write(str(key)+"l"+", "+str(line)+";"+"\n")

fileout.close()
