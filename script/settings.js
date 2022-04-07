const BIOME_COUNT = 2
const SOUND_COUNT = 5

const RENDER_SIZE = 4096
let visualisationSize = RENDER_SIZE / 2 - 5

const TOTAL_TIME = 20
const FPS = 60

const MARGINS = [44, 56, 68, 80]

// Timers for UI in ms
/**
 * Constant for how long the message should be displayed in ms
 */
const MESSAGE_TIME = 10000
/**
 * Constant for how long the tutorial should be displayed in ms
 */
const TUTORIAL_TIME = 10000

// Sounds per biome
let sounds = []

/**
 * Paths to forest audio sources
 */
const FOREST = ["forest/ambient_forest_v1.wav", "forest/eulemur_mongoz_v1.wav", "forest/gorilla_gorilla_v1.wav", "forest/mitu_mitu_v1.wav", "forest/pongo_pygmaeus_v1.wav"]

/**
 * Paths to desert audio sources
 */
const DESERT = ["forest/ambient_forest_v1.wav", "desert/diceros_bicornis_v1.wav", "desert/gyps_africanus_v1.wav", "desert/oryx_dammah_v1.wav", "desert/saiga_tatarica_v1.wav"]

//const PATHS = [FOREST, SHRUBLAND, SAVANNA, DESERT, GRASSLAND];
const PATHS = [FOREST, DESERT]

// Animal names per biome
/**
 * Constant of forest animal names
 */
const FOREST_NAMES = ["Mongoose Lemur", "Western Gorilla", "Alagoas Curassow", "Bornean Orangutan"]
/**
 * Constant of desert animal names
 */
const DESERT_NAMES = ["Black Rhinoceros", "White-backed Vulture", "Scimitar-horned Oryx", "Saiga Antelope"]

const NAMES = [FOREST_NAMES, DESERT_NAMES]
const SCENE_NAMES = ["rain forest", "shrublands", "savanna", "desert", "grass fields"]