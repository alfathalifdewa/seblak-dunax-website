$(document).ready(function () {
    var totalProducts = 3;

    // Function to display products
    function displayProducts(data) {
        // Iterate through each product in the data
        $.each(data.products.slice(0, totalProducts), function(index, product) {
            // Create HTML for each product
            var card = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.nama}">
                        <div class="card-body">
                            <h5 class="card-title">${product.nama}</h5>
                            <p class="card-text">Price: ${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
            // Append the card to the container
            $('#productCards').append(card);
        });
    }

    // Initial display of products (showing 6 products)
    $.ajax({
        url: 'https://api.npoint.io/1db3c7baa3cd21b7491c', // Endpoint URL
        dataType: 'json',
        success: function(response) {
            displayProducts(response);
            // Hide the 'Show More' button if all products are already displayed
            if (totalProducts >= response.product.length) {
                $(".text-center button").hide();
            }
        }
    });

    // Show more button functionality
    $(".text-center button").click(function() {
        // Show all products when 'Show More' button is clicked
        totalProducts = Infinity;
        $('#productCards').empty(); // Clear existing products
        $.ajax({
            url: 'https://api.npoint.io/1db3c7baa3cd21b7491c', // Endpoint URL
            dataType: 'json',
            success: function(response) {
                displayProducts(response);
                $(".text-center button").hide(); // Hide the 'Show More' button after displaying all products
            }
        });
    });


    $(window).on('load', function() {
        var $container = $('.portfolioContainer');
        var $filter = $('#filter');
        $container.isotope({
            filter: '*',
            layoutMode: 'masonry',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
    });

    var navLinks = $('.navbar-nav .nav-link');
    // Tambahkan event click listener untuk setiap tautan
    navLinks.click(function () {
        // Hapus kelas 'active' dari semua tautan
        navLinks.removeClass('active');
        // Tambahkan kelas 'active' ke tautan yang diklik
        $(this).addClass('active');
    });

    // Tambahkan event scroll listener
    $(window).on('scroll', function() {
        // Dapatkan posisi scroll saat ini
        var scrollPos = $(document).scrollTop();

        // Loop melalui setiap bagian
        $('section').each(function() {
            var top = $(this).offset().top - 100; // Sesuaikan dengan tinggi navigasi
            var bottom = top + $(this).outerHeight();

        // Periksa apakah posisi scroll saat ini berada dalam kisaran bagian
            if (scrollPos >= top && scrollPos <= bottom) {
                // Dapatkan ID bagian yang sesuai
                var id = $(this).attr('id');
                // Hapus kelas 'active' dari semua tautan
                navLinks.removeClass('active');
                // Tambahkan kelas 'active' ke tautan yang sesuai dengan bagian saat ini
                $('.navbar-nav').find('[href="#' + id + '"]').addClass('active');
            }
        });
    });
});