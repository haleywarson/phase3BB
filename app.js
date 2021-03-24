const baseURL = "http://localhost:3000/movies/3";

const movieCard = document.querySelector('.movie-card')
const image = document.querySelector("#movie-image");
const title = document.querySelector("#movie-title");
const likes = document.querySelector("#like-count");
const likesButton = document.querySelector("#like-button");
const reviewsUL = document.querySelector(".reviews")
const reviewsForm = document.querySelector("#new-review")


fetch(baseURL)
.then(response => response.json())
.then(movie => {
    image.src = movie.image
    title.textContent = movie.title
    likes.textContent = movie.likes
    movie.reviews.forEach(review => {
        const li = document.createElement('li')
        li.textContent = review.content
        reviewsUL.append(li)
    })

    likesButton.addEventListener('click', (event) => {
        movie.likes++
        likes.textContent = movie.likes

        fetch(baseURL, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                "likes": movie.likes,
            }),
        })
    })

    reviewsForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newContent = formData.get('content')
        
        const li = document.createElement('li')
        li.textContent = newContent
        reviewsUL.append(li)

        fetch('./commentsURL', //build and burn missing comments url {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                id: movie.id,
                content: newContent,
            }),
        })
    })
})