import json
import requests
import time
import csv


def remove_clutter(name):
    if 'tussen' in name:
            name = name[0:name.index('tussen')-1]
    return name

f = open('/Users/jorensjongers/planvelo/boordtabel.csv', 'r')
csvreader = csv.reader(f, dialect='unix')

rows = []
for row in csvreader:
    rows.append(row[0].split(";"))

project_index = rows[2].index('Project')
year_index = rows[2].index('Svz- werken')

i = 1

data = {}
for row in rows:
    try:
        if row[year_index] != '':
            int(row[year_index])
            name = remove_clutter(row[project_index])
            data[i] = [name, row[year_index]]
    except IndexError:
        pass
    except ValueError:
        pass
    i += 1



features = []

for project in data:
    street_name = data[project][0]
    req = 'https://nominatim.openstreetmap.org/search?q='+ street_name + ',brussels&format=json'
    response = json.loads(requests.get(req).content.decode('utf-8'))
    print(len(response))
    i = 0
    coordinates = []
    while i < len(response):    
        if  response[i]['osm_type'] == "way":
            coordinates.append([response[i]['lon'], response[i]['lat']])
        i += 1
    print(coordinates)

    if len(coordinates) > 0:
        featureDict = {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": coordinates
        },
        "properties": {
            "name": street_name,
            "construction_year": data[project][1]
        }
        }

        features.append(featureDict)

# create output dict
output = {}
output["type"] = "FeatureCollection"
output["features"] = features

with open('output.json', 'w') as fp:
    json.dump(output, fp)