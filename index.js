/**
 * Name: _your name here_
 * Date: _add date here_
 * Section: CSE 154 _your section here_
 *
 * -- your description of what this file does here --
 * Do not keep comments from this template in any work you submit (functions included under "Helper
 * functions" are an exception, you may keep the function names/comments of id/qs/qsa/gen)
 */
 "use strict";


 (function() {

    // MODULE GLOBAL VARIABLES, CONSTANTS, AND HELPER FUNCTIONS CAN BE PLACED HERE

    /**
    * Add a function that will be called when the window is loaded.
    */
    window.addEventListener("load", init);

    /**
    * CHANGE: Describe what your init function does here.
    */
    function init() {
      // THIS IS THE CODE THAT WILL BE EXECUTED ONCE THE WEBPAGE LOADS
      id("test").addEventListener("click", getRecipe);
      getIngredients();
    }

    function getIngredients() {
        console.log('hi');

        fetch('http://localhost:4000/getIngredients')
            .then(response => response.json())
            .then(data => showIngredients(data));
    }

    function showIngredients(data) {
        let ingredientsList = id("ingredientsList");

        for (let i = 0; i < data.length; i++) {
            let option = gen("option");
            option.value = data[i];
            option.textContent = data[i];
            ingredientsList.appendChild(option);
        }

        $('.js-example-basic-multiple').select2();
        
    }

    function getRecipe() {

        let values = $('.js-example-basic-multiple').val();

        let ingredientsParams = "";
        for (let i = 0; i < values.length - 1; i++) {
            ingredientsParams += "ingred" + (i + 1) + "=" + values[i] + "&";
        }
        ingredientsParams += "ingred" + values.length + "=" + values[values.length - 1];

        fetch('http://localhost:4000/getRecipes?' + ingredientsParams)
            .then(response => response.json())
            .then(data => displayRecipes(data));
    }

    function displayRecipes(data) {
        let recipeContainer = id("recipes");
        recipeContainer.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let currentRecipe = data[i];

            let container = gen("div");
            recipeContainer.appendChild(container);

            let name = gen("h2");
            name.textContent = currentRecipe["Name"];
            container.appendChild(name);

            let description = gen("p");
            description.textContent = currentRecipe["Description"];
            container.appendChild(description);

            let minutes = gen("p");
            minutes.textContent = "Time to Make: " + currentRecipe["Minutes"];
            container.appendChild(minutes);

            let ingredients = currentRecipe["Ingredients"];
            let ingredientsList = gen("ul");
            container.appendChild(ingredientsList);

            for (let j = 0; j < ingredients.length; j++) {
                let listItem = gen("li");
                listItem.textContent = ingredients[j];
                ingredientsList.appendChild(listItem);
            }

            let steps = currentRecipe["Steps"];
            let stepsList = gen("ol");
            container.appendChild(stepsList);

            for (let j = 0; j < steps.length; j++) {
                let listItem = gen("li");
                listItem.textContent = steps[j];
                stepsList.appendChild(listItem);
            }
        }
    }

    /**
    * Make sure to always add a descriptive comment above
    * every function detailing what it's purpose is
    * @param {variabletype} someVariable This is a description of someVariable, including, perhaps, preconditions.
    * @returns {returntype} A description of what this function is actually returning
    */
    function exampleFunction2(someVariable) {
      /* SOME CODE */
      return something;
    }

    /** ------------------------------ Helper Functions  ------------------------------ */
    /**
    * Note: You may use these in your code, but remember that your code should not have
    * unused functions. Remove this comment in your own code.
    */

    /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
    function id(idName) {
      return document.getElementById(idName);
    }

    /**
    * Returns the first element that matches the given CSS selector.
    * @param {string} selector - CSS query selector.
    * @returns {object} The first DOM object matching the query.
    */
    function qs(selector) {
      return document.querySelector(selector);
    }

    /**
    * Returns the array of elements that match the given CSS selector.
    * @param {string} selector - CSS query selector
    * @returns {object[]} array of DOM objects matching the query.
    */
    function qsa(selector) {
      return document.querySelectorAll(selector);
    }

    /**
    * Returns a new element with the given tag name.
    * @param {string} tagName - HTML tag name for new DOM element.
    * @returns {object} New DOM object for given HTML tag.
    */
    function gen(tagName) {
      return document.createElement(tagName);
    }

 })();