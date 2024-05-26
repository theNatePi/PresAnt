import googlemaps
from datetime import datetime
from apikey import API_KEY

gmaps = googlemaps.Client(key=API_KEY)
def getGeocodeData(lec_building):
    loc_string = lec_building + ", Irvine, CA"
    geocode_result = gmaps.geocode(loc_string)
    return geocode_result[0]['geometry']['location']
