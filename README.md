# koa-rest-api
A simple koajs REST API with MongoDB

1. npm install
2. npm start

3. Try to authenticate with the plain text username "user" and password "pwd" (in next phases these must come from database)

curl -X POST \
  http://localhost:3000/auth \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"username": "user", "password": "pwd"}'
  
  4. take the token from the last stage and use it in all other requests as authorization header. Like the below cURL request:
  
  curl -X GET \
  http://localhost:3000/people \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzMTc0MDA2MX0.1GW3VUqBIt3du97JdQXAJOo0HxHO6ef2SD7tOPENC2U' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  
  5. to add a new person use (obviously first replace your token):
  
  curl -X POST \
  http://localhost:3000/people \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzMTc0MDA2MX0.1GW3VUqBIt3du97JdQXAJOo0HxHO6ef2SD7tOPENC2U' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"name": "Arash", "email": "arash.layeghi@gmail.com"}'
  
  6. you can get the person id from the 4th cURL command and use it for geting, updating or deleting that person:
  
  #Getting a person: (replace the person id in the query string)
  
   curl -X GET \
  http://localhost:3000/people/5b4c809dd0fce04044ab2768 \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzMTc0MDA2MX0.1GW3VUqBIt3du97JdQXAJOo0HxHO6ef2SD7tOPENC2U' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  
  #Updating a person: (replace the person id in the query string)
  
   curl -X PUT \
  http://localhost:3000/people/5b4c809dd0fce04044ab2768 \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzMTc0MDA2MX0.1GW3VUqBIt3du97JdQXAJOo0HxHO6ef2SD7tOPENC2U' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"name": "Artin", "email": "artin19@gmail.com"}'
  
  
  
  #Deleting a person: (replace the person id in the query string)
  
     curl -X DELETE \
  http://localhost:3000/people/5b4c809dd0fce04044ab2768 \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzMTc0MDA2MX0.1GW3VUqBIt3du97JdQXAJOo0HxHO6ef2SD7tOPENC2U' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  
  
  
  
