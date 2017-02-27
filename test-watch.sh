# development database

# To create a local user with the username and password as spesified here.
# sudo su postgres
##(login as the postgres user)
# createuser test --pwprompt
# createdb test
## (create a user in the postgres database with user test it ask you about what password to use. type in test.
export PG_URL="postgres://test:test@localhost:5432/test"
export DEBUG="*,-babel,-ava,-express:*,-retry-as-promised,-body-parser:*,-morgan,-superagent"
npm run test:watch
