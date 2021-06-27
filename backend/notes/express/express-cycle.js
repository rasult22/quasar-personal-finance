
// The request-response cycle of Express framework
/* 
  INCOMING REQUEST
    Express creates:
      REQUEST OBJECT
      RESPONSE OBJECT
    
    Express generates those object to send back
    a meaningful response.

    In order to process that data Express uses MIDDLEWARES 

    Middleware is a function executed between. In the middle
    of receiving the request and sending the response.
    
    "EVERYTING IS MIDDLEWARE" (even routes)

    All the middleware together used in our app is called
    middleware Stack.

    Order of middleware stack is defined by the order they are
    defined in the code.

    All the requests are going through middleware chain (pipeline)


  RESPONSE
    Send response :D
*/


