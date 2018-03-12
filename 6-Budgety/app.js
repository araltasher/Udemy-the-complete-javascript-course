//  BUDGET CONTROLLER
const budgetController = (function () {
    //  some code
})();



//  UI CONTROLLER
const UIController = (function () {
    //  Some code for later
})();


//  //  GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    function ctrlAddItem() {
        /*  
            1.  Get the input data
            2.  Add the item to the budget controller
            3.  Add the item to the UI
            4.  Calculate the budget
            5.  Display the budget on the UI
        */
       console.log('It works');
    }


    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);