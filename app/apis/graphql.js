const { makeExecutableSchema } = require("graphql-tools");
const { accountInfo, accountVerify } = require("./account");

// Adding Type Definitions
const typeDefinition = `
   type Query  {
      user(email: String): User
      users: [User]
      userVerify(email: String, uid: String): String
   }

   type User {
       email: String
       name: String
       avatar: String
       intro: Intro
       keywords: String
       friends: [User]
   }

   type Intro {
      headline: String
      countryRegion: String
      homeCountryRegion: String
      locationCity: String
      contactInfo: String
      about: String
      MBTI: String
      interests: [String]
      experiences: [String]
   }
`;

// Adding resolver
const resolverObject = {
  Query: {
    user: async (parent, args) => {return await accountInfo(args.email)},
    users: async (parent, args) => {return await accountInfo()},
    userVerify: async(parent, args) => {return await accountVerify(args.email, args.uid)}
  },
};

const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverObject,
});

module.exports.schema = schema;
