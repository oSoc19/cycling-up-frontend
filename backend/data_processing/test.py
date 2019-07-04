import json
import requests
import time

f = open('/Users/jorensjongers/planvelo/bike_infra.geojson')
x =  f.read()

y = json.loads(x)
result = []

#for i in range(0, len(y['features'])):

start = time.time()
index = int(len(y['features'][50]['geometry']['coordinates'][0])/2)
coordinates = y['features'][50]['geometry']['coordinates'][0][index]
print(coordinates)
lon = str(coordinates[0])
lat = str(coordinates[1])
req = "https://nominatim.openstreetmap.org/reverse?lat="+lat+"&lon="+lon+"&format=json"
response = requests.get(req)
print(response.content)
response = json.loads(response.content)
if 'road' in response['address'].keys():
    result.append(response['address']['road'])
else:
    result.append('')

