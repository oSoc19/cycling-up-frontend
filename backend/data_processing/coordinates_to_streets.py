import json
import requests
import time

f = open('/Users/jorensjongers/planvelo/bike_infra.geojson')
x =  f.read()

bike_infra = json.loads(x)

result = dict()
start = time.time()
#for i in range(0, len(y['features'])):

for i in range(0, 20):

    index = int(len(bike_infra['features'][i]['geometry']['coordinates'][0])/2)
    coordinates = bike_infra['features'][i]['geometry']['coordinates'][0][index]
    lon = str(coordinates[0])
    lat = str(coordinates[1])
    req = "https://nominatim.openstreetmap.org/reverse?lat="+lat+"&lon="+lon+"&format=json"
    response = requests.get(req)
    response = json.loads(response.content)
    street_name = 'null'
    if 'road' in response['address'].keys():
        street_name = response['address']['road']

    result.update({bike_infra['features'][i]['properties']['gid'] : street_name})

print(time.time()-start)

with open('result.json', 'w') as outfile:  
    json.dump(result, outfile)
