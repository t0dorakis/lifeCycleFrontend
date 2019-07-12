import sheepBaby from '../../assets/sheepBaby.jpeg'
import preBirth from '../../assets/preBirth.jpg'
import cowBreeding from '../../assets/cowBreeding.jpg'
import housePigs from '../../assets/hausschweine.jpg'
import muscleCow from '../../assets/muscle_cow.jpg'
import batteryChicken from '../../assets/batteryChicken.jpg'
import prisonCow from '../../assets/prison_cow.jpg'
import pigSlaughter from '../../assets/schweine_schlachten.jpg'
import hanging_pigs from '../../assets/hanging_pigs.jpg'

const pictureArray = [
    preBirth,
    sheepBaby,
    cowBreeding,
    housePigs,
    muscleCow,
    batteryChicken,
    prisonCow,
    pigSlaughter,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
    hanging_pigs,
]

export const getPictureForAge = (age) => {
    return pictureArray[age]
}