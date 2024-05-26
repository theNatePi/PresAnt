import googlemaps
from datetime import datetime
from api_key import API_KEY

gmaps = googlemaps.Client(key=API_KEY)

geocode_result = gmaps.geocode('ICS 174, Irvine, CA')
# geocode_result = [{'address_components': [{'long_name': 'Aldrich Park', 'short_name': 'Aldrich Park', 'types': ['establishment', 'park', 'point_of_interest']}, {'long_name': 'Irvine', 'short_name': 'Irvine', 'types': ['locality', 'political']}, {'long_name': 'Orange County', 'short_name': 'Orange County', 'types': ['administrative_area_level_2', 'political']}, {'long_name': 'California', 'short_name': 'CA', 'types': ['administrative_area_level_1', 'political']}, {'long_name': 'United States', 'short_name': 'US', 'types': ['country', 'political']}, {'long_name': '92697', 'short_name': '92697', 'types': ['postal_code']}], 'formatted_address': 'Aldrich Park, Irvine, CA 92697, USA', 'geometry': {'location': {'lat': 33.6460519, 'lng': -117.8427446}, 'location_type': 'GEOMETRIC_CENTER', 'viewport': {'northeast': {'lat': 33.64684443029149, 'lng': -117.8404171197085}, 'southwest': {'lat': 33.6441464697085, 'lng': -117.8431150802915}}}, 'place_id': 'ChIJjzHYJg7e3IARPSQtfCuwD5U', 'plus_code': {'compound_code': 'J5W4+CW Irvine, CA', 'global_code': '8554J5W4+CW'}, 'types': ['establishment', 'park', 'point_of_interest']}]
print(geocode_result[0]['geometry']['location'])
