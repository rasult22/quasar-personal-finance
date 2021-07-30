/*
Data modeling - process of taking unstructured data generated by a real world scenario
and then structure it into a logical data model in a database

The most important place to build the application

Steps: 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. Types of relationships between data
  a) One to one   ---------->     MOVIE ----> "NAME"     - (one movie can only have one name)
  b) One to many  ---------->      
    一。One to few   ----------->     MOVIE -> -> -> "AWARD, AWARD, AWARD"    - (cannot win hundrend of awards)
    二。One to many ----------->      MOVIE -> * 100/1k "REVIEW * 100/1k"      - (many relationships)
    三。One to ton  ------------>     MOVIE -> * 1kk's  "LOG"       - (can grow to the infinity)
  
  c) Many to many -------------->    MOVIE (-><--><--><--><-) * many "ACTOR"      -(movie can have a many actors, and actors can have many movies)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2. Referencing VS. Embedding

   REFERENCED / NORMALIZED : separated
   + Perfomance: it's easer to query each document on its own
   - We need 2 queries to get data from referenced document 

   EMBEDDED / DENORMALIZED
   + Perfomance: we can get all the information in one query
   - Impossible to query the embedded document on its own

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3. When to embed and when to reference? A practical frame work

  Combine three criteria to take decition:
    1. Relationship type (how two datasets are related to each other)
    2. Data access patterns (how often data is read and written. Read/Write ratio)
    3. Data closeness (how much the data is related, how we want to query)
  
  EMBEDDING:                   _______________________________________________________________________
  1. RELATIONSHIP TYPE:       | ONE TO FEW,  ONE TO MANY                                              |
  2. DATA ACCESS PATTERNS:    | Data is mosly read. Data doesnt change quickly. High read/write ratio.|
  3. DATA CLOSENESS:          | Datasets really belong together                                       |
                              |_______________________________________________________________________|
  REFERENCING:                |                                                                       |
  1. RELATIONSHIP TYPE:       | ONE TO MANY, ONE TO TON, MANY TO MANY                                 |
  2. DATA ACCESS PATTERNS:    | Data is updated a lot. Low read/write ratio.                          |
  3. DATA CLOSENESS:          | We frequently need to query both datasets on their own.               |
                              -------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4. Types of referencing:
   a) CHILD REFERENCING - we keep references to the related child documents in a parent document (usually stored in an array)   -- ONE TO FEW
   b) PARENT REFERENCING - in each child document we keep a reference to the parent element    -------       ONE TO MANY,  ONE TO TON
   c) TWO-WAY REFERENCING -    stuffs are connected in both directions            ----- MANY TO MANY
------------------------------------------------------------------------------------------------------------------------------------------------------------------------



                                                                            SUMMARY
****************************************************************************************************************************************************************************************************
**************************************** STRUCTURE YOUR DATA TO MATCH THE WAYS THAT YOUR APPLICATION QUERIES AND UPDATES DATA **********************************************************************
********* IDETIFY THE QUESTIONS THAT ARISE FROM YOUR APPLICATION'S USE CASES FIRST, AND THEN MODEL YOUR DATA SO THAT THE QUESTIONS CAN GET ANSWERED IN THE MOST EFFICIENT WAY **********************
***************************** ALWAYS FAVOR EMBEDDING, UNLESS THERE'S A GOOD REASON NOT TO EMBED. ESPECIALLY ON 1:FEW AND 1:MANY RELATIONSHIPS*******************************************************
************************************ A 1:TON OR A MANY:MANY RELATIONSHIPS IS USUALLY A GOOD REASON TO REFERENCE INSTEAD OF EMBEDDING ***************************************************************
**************************** USE EMBEDDING WHEN DATA IS MOSTLY READ BUT RARELY UPDATED, AND WHEN TWO DATASETS BELONG INTRINSICALLY TOGETHER ********************************************************
******* DON'T ALLOW ARRAYS TO GROW INDEFINITELY. THEREFORE, IF YOU NEED TO NORMALIZE, USE CHILD REFERENCING FOR 1:MANY RELATIONSHIPS, AND PARENT REFERENCING FOR 1:TON RELATIONSHIPS ***************
************************************************************** USE TWO-WAY REFERENCING FOR MANY:MANY RELATIONSHIPS *********************************************************************************
****************************************************************************************************************************************************************************************************

*/