const svgs = require.context('./', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)


requireAll(svgs)

// import HOME from './home.svg'

// const HOME = require('./home.svg')