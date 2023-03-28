const dotenv = require("dotenv");
const path = require("path");
const { Seeder } = require("mongo-seeding");

dotenv.config();

const dbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:6000/${process.env.MONGODB_DATABASE_NAME}?authSource=admin`;

const config = {
  database: dbUrl,
  dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath("./scripts/data", {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
  .import(collections)
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log("Error", err);
  });
