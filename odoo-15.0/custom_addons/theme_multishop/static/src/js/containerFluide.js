

// Get the container element
    var main = document.querySelector('#wrap');
    var containerElement = main.querySelector('.container');
    var containerRow = containerElement.querySelector('.row');

// Replace the 'container' class with 'container-fluid'
    containerElement.classList.remove('container');
    containerElement.classList.add('container-fluid');
    containerRow.classList.add('px-xl-5');

    if (document.querySelector('#products_grid_before')) {
        var products_grid = document.querySelector('#products_grid_before');

        products_grid.classList.remove('col-lg-3');
        products_grid.classList.add('col-lg-2');
    }



