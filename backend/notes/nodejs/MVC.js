/*

  MVC architecture

  M - Model (Business Logic, data) 
  V - VIEW (Presentation Logic)
  C - Controller (Application Logic, handle request, interact with model)





  Application LOGIC: 
    Code that is only concerned about the application's implementation, 
    not the underlying business problem we're trying to solve.

    Concerned about managing requests and responses;

    About the app's more technical aspects

    Serves as a bridge between model and view layers


  Bussiness LOGIC: a
    Code that actually solves the business problem
    we set out to solve.
    
    Directy related to business rules, how the business works, and
    business needs;

    Examples:
      Creating new tours in the database;
      Checking if user's password is correct;
      Validating user input data;
      Ensuring only users who bought a tour can review it


  

  
  FAT MODELS/THIN CONTROLLERS:  
    Offload as much logic as possible into the models, 
    and keep the controllers as simple and lean as possible
*/