
#   ___          __  __               ______
#  / __|___ ___ / _|/ _|___ _ _ _  _ / /__ /
# | (_ / -_) _ \  _|  _/ -_) '_| || < < |_ \
#  \___\___\___/_| |_| \___|_|  \_, |\_\___/
#                               |__/        

from flask import Flask
from flask import Response
app = Flask("__main__")




import requests
import json
import random

@app.route('/findLocation/<memLoc>')
def findLocation(memLoc):
    landmarks = []
    #finds the gps of the memorable location selected
    gpsPeram = {"key":"AIzaSyBHM2X5kAA6KaPtneKQOiWG7Md9HRji3Yo","address":memLoc}
    locGps = requests.get("https://maps.googleapis.com/maps/api/geocode/json", gpsPeram)

    for item in json.loads(locGps.content)["results"]:
        lng = item['geometry']['location']['lng']
        lat = item['geometry']['location']['lat']
        print(lng)
        print(lat)

    #finds the local landmarks of the area selected
    locPeram = {"prox":(str(lat)+","+str(lng)+","+"100")}
    location = requests.get("https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=Acnn7UyoEwk9Ni98Q02C&app_code=yYO8QP0ClWl9Qynr0PCWOw&mode=retrieveLandmarks", locPeram)
    
    
    for view in json.loads(location.content)["Response"]["View"]:
        for landmark in view["Result"]:
            landmarkList = []
            
            rightlandlat = landmark['Location']['DisplayPosition']["Latitude"]
            rightlandlng = landmark['Location']['DisplayPosition']["Longitude"]
            print(rightlandlat)
            print(rightlandlng)
            


            #finds the nearest road for the landmark
            nearPerams = {"key":"AIzaSyBHM2X5kAA6KaPtneKQOiWG7Md9HRji3Yo", "points":str(rightlandlat)+","+str(rightlandlng)}
            nearRoad = requests.get("https://roads.googleapis.com/v1/nearestRoads", nearPerams)

            print(nearRoad.content)
            try:
                
                point = json.loads(nearRoad.content)["snappedPoints"][0]
                roadLat = point["location"]["latitude"]
                roadLng = point["location"]["longitude"]
                landmarkList.append(landmark['Location']['Name'])
                


                        
                      
                landmarkList.append(roadLat)
                landmarkList.append(roadLng)
                landmarks.append(landmarkList)
                print(landmark['Location']['Name'])
                print("there is a road")
                print(roadLat)
                print(roadLng)
            except:
                landmarkList.append(landmark['Location']['Name'])
                print("no Roads In Sight")

    try:
            
        landmarkIndex = random.randint(0,len(landmarks)-1)
        print(landmarkIndex)

        locPicOnePeram = {"location":str(landmarks[landmarkIndex][1])+","+str(landmarks[landmarkIndex][2]), "size":"1000000x300"}
        locPicOne = requests.get("https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI", locPicOnePeram)
        return Response(locPicOne, mimetype='image/jpeg')
    except:
        return "no image available"
        

  #  locPicTwoPeram = {"location":randomLocTwo, "size":"500x500"}
 #   locPicTwo = requests.get("https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI", locPicTwoPeram)



   



if __name__ == "__main__":
    app.run(host='0.0.0.0')
