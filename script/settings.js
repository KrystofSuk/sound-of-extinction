const BIOME_COUNT = 2
const SOUND_COUNT = 5

const RENDER_SIZE = 4096
let visualisationSize = RENDER_SIZE / 2 - 5

const TOTAL_TIME = 20
const FPS = 60

const MARGINS = [44, 56, 68, 80]

// Timers for UI in ms
const MESSAGE_TIME = 10000
const TUTORIAL_TIME = 10000

// Sounds per biome
let sounds = []
const FOREST = ["forest/ambient_forest_v1.wav", "forest/eulemur_mongoz_v1.wav", "forest/gorilla_gorilla_v1.wav", "forest/mitu_mitu_v1.wav", "forest/pongo_pygmaeus_v1.wav"]
const DESERT = ["forest/ambient_forest_v1.wav", "desert/diceros_bicornis_v1.wav", "desert/gyps_africanus_v1.wav", "desert/oryx_dammah_v1.wav", "desert/saiga_tatarica_v1.wav"]

//const PATHS = [FOREST, SHRUBLAND, SAVANNA, DESERT, GRASSLAND];
const PATHS = [FOREST, DESERT]

// Animal names per biome
const FOREST_NAMES = ["Mongoose Lemur", "Western Gorilla", "Alagoas Curassow", "Bornean Orangutan"]
const DESERT_NAMES = ["Black Rhinoceros", "White-backed Vulture", "Scimitar-horned Oryx", "Saiga Antelope"]

const NAMES = [FOREST_NAMES, DESERT_NAMES]
const SCENE_NAMES = ["rain forest", "shrublands", "savanna", "desert", "grass fields"]