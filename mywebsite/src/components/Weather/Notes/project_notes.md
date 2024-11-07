# OpenWeather API Calls

1. Direct Geocoding:

- `get (lat, lon) ` by:
    1. Zip Code
    2. City Name

2. Reverse Geocoding:

- `get City Name` by:
    1. (lat, lon)

`Limit` Parameter allows you to specify how many you'll see in the response

# Fields in API Response:
`name` 
- Name of the found location
`local_names`
- `local_names.[language code]` Name of the found location in different languages. The list of names can be different for different locations.
- `local_names.ascii` Internal field
- `local_names.feature_name` Internal field
- `lat` Geographical coordinates of the found location (latitude)
- `lon` Geographical coordinates of the found location (longitude)
- `country` Country of the found location
- `state` (where available) State of the found location
