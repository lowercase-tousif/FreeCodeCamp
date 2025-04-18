require("dotenv").config();

const mongoose = require("mongoose");

//connecting to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let document = new Person({
    name: "Tousif",
    age: 21,
    favoriteFoods: ["mango", "litchi"],
  });

  document.save(function (err, data) {
    if (err) {
      return done(err);
    }
    console.log(data);
    done(null, data);
  });
};

var arrayOfPeople = [
  {
    name: "Karim",
    age: 22,
    favoriteFoods: ["jackfruit", "apple"],
  },
  {
    name: "Rahim",
    age: 23,
    favoriteFoods: ["guava", "pineapple"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  // let document = new Person.create();

  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      return console.log(err);
    }
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find(
    {
      name: personName,
    },
    function (err, data) {
      if (err) {
        return done(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const findOneByFood = (food, done) => {
  Person.findOne(
    {
      favoriteFoods: food,
    },
    function (err, data) {
      if (err) {
        return done(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const findPersonById = (personId, done) => {
  Person.findById(
    {
      _id: personId,
    },
    function (err, data) {
      if (err) {
        return done(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Person.findOneAndUpdate(
  //   {
  //     _id: personId,
  //   },
  //   {
  //     $push: { favoriteFoods: foodToAdd },
  //   },
  //   { new: true, runValidators: true },
  //   function (err, data) {
  //     if (err) {
  //       return done(err);
  //     }
  //     console.log(data);
  //     done(null, data);
  //   }
  // );

  Person.findById(
    {
      _id: personId,
    },
    (err, data) => {
      if (err) {
        return done(err);
      }
      if (!data) {
        console.log(new Error("Person not found"));
      }

      console.log("Person found");
      console.log(data);

      // Pushing the food to the favoriteFoods array
      data.favoriteFoods.push(foodToAdd);

      // Marking it modified
      data.markModified("favoriteFoods");

      // saving the updated document
      data.save((err, updatedPerson) => {
        if (err) {
          return done(err);
        }
        console.log(updatedPerson);
        done(null, updatedPerson);
      });
    }
  );
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {
      name: personName,
    },
    {
      age: ageToSet,
    },
    {
      new: true,
    },

    (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndDelete(
    {
      _id: personId,
    },
    (err, data) => {
      if (err) {
        return done(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
    {
      name: nameToRemove,
    },
    (err, data) => {
      if (err) {
        return done(err);
      }
      console.log(data);
      done(null, data);
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
    favoriteFoods: foodToSearch,
  })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      done(err, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
