You can find a comprehensive documentation about this boilerplate here:
https://start.4geeksacademy.com/starters/full-stack


psql -U gitpod -c 'DROP DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example && pipenv run init && pipenv run migrate && pipenv run upgrade