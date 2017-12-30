import pictureone from '../assets/one.jpg'
import picturefive from '../assets/five.jpg'
import pictureseven from '../assets/seven.jpg'
import picturefiftyfive from '../assets/fiftyfive.jpg'
import picturefortyfour from '../assets/fortyfour.jpg'
import picturesixtythree from '../assets/sixtythree.jpg'
import picturethirtyseven from '../assets/thirtyseven.jpg'
import picturetwentyfour from '../assets/twentyfour.jpg'
import pictureeight from '../assets/eight.jpg'
import picturesixtynine from '../assets/sixtynine.jpg'
import picturethirtyfour from '../assets/thirtyfour.jpg'
import picturethree from '../assets/three.jpg'
import picturetwentyone from '../assets/twentyone.jpg'

const pics = [
    pictureone,
    picturefive,
    pictureseven,
    picturefiftyfive,
    picturefortyfour,
    picturesixtythree,
    picturethirtyseven,
    picturetwentyfour,
    pictureeight,
    picturesixtynine,
    picturethirtyfour,
    picturethree,
    picturetwentyone
]

const randomPic = () => pics[Math.floor(Math.random()*pics.length)]

export default randomPic
