FROM mongo

COPY . /mongo-seed

CMD mongoimport --host $MONGO_HOST --db $MONGO_DB --collection questions --type json --file /mongo-seed/data.json --jsonArray --username $USERNAME --password $PASSWORD --authenticationDatabase admin


