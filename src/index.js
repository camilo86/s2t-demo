require('dotenv').config();
const speech = require('@google-cloud/speech')
const fs = require('fs')
const path = require('path')

const client = new speech.SpeechClient()

// Path to sound file
const fileName = path.join(__dirname, 'sounds', 'Recording.flac');
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64')

const audio = {
  content: audioBytes
}


const config = {
  encoding: 'FLAC',
  sampleRateHertz: 48000,
  languageCode: 'en-US'
}


const request = {
  audio,
  config
}

async function main() {
  const x = await client.recognize(request);
  console.log(x)
  return;

  const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n')

  console.log(`Transacription: ${transcription}`)
}

main()
  .then(() => console.log(' DONE.'))
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
