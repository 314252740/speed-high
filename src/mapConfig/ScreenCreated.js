import Fog from './Fog.js'
import ScreenComposite from './ScreenComposite.js'
import ScreenMessage from './ScreenMessage.js'
import ScreenSpeed from './ScreenSpeed.js'
import ScreenVideo from './ScreenVideo.js'
import PoliceCar from './policeCar.js'
export default function screenCreated (type, content) {
  switch (type) {
    case 'screenComposite' : return ScreenComposite.constructor(content)
    case 'screenMessage' : return ScreenMessage.constructor(content)
    case 'screenSpeed' :return ScreenSpeed.constructor(content) // return new ScreenSpeed(content).Dom
    case 'camera' : return new ScreenVideo(content).Dom
    case 'trafficAccident' : return Fog.constructor(content)
    case 'maintenance' : return Fog.constructor(content)
    case 'policeCar' : return PoliceCar.constructor(content)
    case 'fog' : return Fog.constructor(content)
    default : return null
  }
}
