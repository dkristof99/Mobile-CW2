let instance = new Vue({
    el: '#app',
    data: {
         lessons: {},
         showLessons: true,
         shoppingCart: [],
         booking: []
         },
    created: function () {
        fetch("https://mobile-cw2.herokuapp.com/collection/lessons").then(
            function (response) {
                response.json().then(
                    function (json) {
                        instance.lessons = json;
                    });
            })
    },
    methods: {
addToCart(lesson, cart, booking) {
    if (lesson.space > 0) {
        lesson.space -= 1
        cart.push({lesson_id: lesson._id, topic: lesson.topic,location: lesson.location,price: lesson.price});
    }
},

addInformation(booking) {
    booking.push({name: booking.name, phone: booking.phone, lesson_id: this.shoppingCart[0].lesson_id, space: 1});
},

showCheckout() {
    this.showLessons = this.showLessons ? false : true;
},

submitForm(newObject, id, update) {        
            //set the url to the server and route
            fetch('https://mobile-cw2.herokuapp.com/collection/orders', {
                method: 'POST', //set the HTTP method as 'POST'
                headers: {
                    'Content-Type': 'application/json', //set datatype as JSON
                },
                body: JSON.stringify(newObject),
            })
                .then(response => response.json())

            fetch('https://mobile-cw2.herokuapp.com/collection/lessons/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            })
            .then(response => response.json())
},

remove(index) {
    this.$delete(this.shoppingCart, index)
}
},
computed: {
cartItemCount: function () {
    return this.shoppingCart.length;
},

canCheckOut: function () {
    return this.cartItemCount >= 1;
},

canBook() {
    return this.booking.name != "" &&
    this.booking.phone != "";
}

}
});

/*             const newObject = {
                "id": 1010,
                "topic": "Maths",
                "price": 90,
                "location": "Glasgow",
                "space": 5
            };

            //set the url to the server and route
            fetch('https://mobile-cw2.herokuapp.com/collection/lessons', {
                method: 'POST', //set the HTTP method as 'POST'
                headers: {
                    'Content-Type': 'application/json', //set datatype as JSON
                },
                body: JSON.stringify(newObject),
            })
                .then(response => response.json())
                .then(responseJSON => {
                    document.getElementById('response').innerText = JSON.stringify(responseJSON);
                })
                .catch((error) => {
                    document.getElementById('error').innerText = error;
                }); */
