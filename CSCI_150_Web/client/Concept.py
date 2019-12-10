import requests
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import style

targetDate = "2019/11/19"
URL = "http://108.211.45.253:60005/frontend/find/" + targetDate

deviceID = 'e00fce681c2671fc7b1680eb'
sensor = 'tempF'

deviceIDs = ['e00fce681c2671fc7b1680eb', 'e00fce686522d2441e1f693f', 'e00fce68b1b49ccf2e314c17']
sensors = ['tempF', 'tempC','HumidityL', 'HumidityT', 'GMoistureP']

PARAMS = {'deviceID' : deviceID,
          'sensor' : sensor}

def datacollect(i):
    r = requests.get(URL,PARAMS)
    data = r.json()

    sensorValues = [point['value'] for point in data]
    timestamp = [point['gatheredAt'] for point in data]
    ax1.clear()
    # [i+1 for i in range(len(sensorValues))]
    ax1.plot([i+1 for i in range(len(sensorValues))],sensorValues)

style.use('fivethirtyeight')
fig = plt.figure()
ax1 = fig.add_subplot(1,1,1)
ax2 = fig.add_subplot(1,1,1)
ax3 = fig.add_subplot(1,1,1)

ani = animation.FuncAnimation(fig, datacollect, interval=120000)
plt.show()
