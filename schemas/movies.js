const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string', //mensajes error personalizados
    required_error: 'Movie title is required'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  year: z.number().int().positive().min(1900).max(2024), //validaciones encadenadas
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.0),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  })
})

function validateMovie(input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input) //partial() solo valida las propiedades q estan en el esquema
}

module.exports = {
  validateMovie,
  validatePartialMovie
}