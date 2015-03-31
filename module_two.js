function MyModule() {
  this.randomNumber = Math.random();
}

MyModule.prototype = {

  foo: function() {
    return "bar";
  },

  greet: function(name) {
    console.log("Hello,", name);
  },

  number: function() {
    return this.randomNumber;
  },

  inspect: function() {
    return "MyModule(secret-number)";
  }

};

module.exports = MyModule;
