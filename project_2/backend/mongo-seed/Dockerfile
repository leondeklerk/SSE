FROM mongo

COPY . /mongo-seed

CMD mongoimport --host $MONGO_HOST --db $MONGO_DB --collection questions --type json --file /mongo-seed/questions.json --jsonArray --username $USERNAME --password $PASSWORD --authenticationDatabase admin ; mongoimport --host $MONGO_HOST --db $MONGO_DB --collection categories --type json --file /mongo-seed/categories.json --jsonArray --username $USERNAME --password $PASSWORD --authenticationDatabase admin


