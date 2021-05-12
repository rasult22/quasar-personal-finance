 // Streams 

 /*
    Streams - used to process (read and write) data piece by piece (chunks),
    without completing the whole read or write operation, and therefore without
    keeping all the data in memory. 

    ** Streams are instances of the "EventEmitter" class **
    
    4 fudamental types of streams are:
      1. Readable streams *important  (we can read/consume data )
        --- https requiests
        --- fs read streams
        Events:
          @on-data
          @on-end
        Functions: 
          pipe() - passing data between streams 
          read()

      2. Writable streams *important (we can write data)
        --- http responses
        --- fs read streams
        Events:
          @on-drain
          @on-finish
        Functions: 
          write()
          end()
      3. Duplex streams (readable and writable)
        --- (net module) web socket

      4. Transform streams (transform data as it is written or read)
        --- zlib  Gzip creation
 */

const fs = require('fs')
const { ServerResponse } = require('http')
const server = require('http').createServer()


server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('some-data.txt', (err, data) => {
  //   if(err) {
  //     console.log(err)
  //   }
  //   res.end(data)
  // })

  // Solution 2
  // const readable = fs.createReadStream('some-dat2a.txt')

  // readable.on('data', (chunk) => {
  //   res.write(chunk)
  // })

  // readable.on('end',() => {
  //   res.end()
  // })

  // readable.on('error', err => {
  //   console.log(err),
  //   res.statusCode = 500;
  //   res.end('FIle not found!')
  // })

  // Solution 3 
  const readable = fs.createReadStream('some-data.txt')
  readable.pipe(res)
  // readableSource.pipe(writableDestination)
})


server.listen(4000, '127.0.0.1', () => {
  console.log('Listening...a')
})

