// json-server --watch db.json --routes routes.json

const baseURL = "http://localhost:3000/movies/2"
const movieCard = document.querySelector('.movie-card')
const movieTitle = document.querySelector('#movie-title')
const movieImage = document.querySelector('#movie-image')
const movieLikes = document.querySelector('#like-count')
const movieReviews = document.querySelector('.reviews')
const likeButton = document.querySelector('#like-button')
const commentForm = document.querySelector('#new-review')


fetch(baseURL)
  .then(response => response.json())
  .then(movie => {
    movieTitle.textContent = movie.title
    movieImage.src = movie.image
    movieLikes.textContent = movie.likes
    movie.reviews.forEach(review => {
      const li = document.createElement('li')

      li.textContent = review.content 

      movieReviews.append(li)
    })

    likeButton.addEventListener('click', (event) => {
        // let newLikeCount = parseInt(movieLikes.textContent) + 1

        // movieLikes.textContent = newLikeCount
        movie.likes++
        movieLikes.textContent = movie.likes

        fetch(baseURL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            likes: movie.likes
          })
        })
    })

    commentForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const content = formData.get('content')

      const li = document.createElement('li')
      li.textContent = content
      movieReviews.append(li)

      fetch('/reviews', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          movieId: movie.id,
          content
        })
      })
    })

  })

  
