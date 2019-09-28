#device ID -- 50ff6f065067545626430587
#access token -- 895043e69c01b80b464cdd995e913efa4b25c3a3
#curl "https://api.particle.io/v1/devices/50ff6f065067545626430587/temp?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3"

import requests
import json
r = requests.get("https://api.particle.io/v1/devices/50ff6f065067545626430587/temp?access_token=895043e69c01b80b464cdd995e913efa4b25c3a3")
webresult = json.loads(r.text)
print(webresult)
print('\n')
print(webresult['result'])
