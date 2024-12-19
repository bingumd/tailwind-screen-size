const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
	// Generate screen sizes from 0 to 95, in steps of 5
	const screenSizes = Array.from({ length: 20 }, (_, i) => i * 5).reduce(
		(sizes, value) => ({ ...sizes, [value]: value }),
		{}
	)

	// Map utility class names to CSS properties
	const props = {
		'w-screen': 'width',
		'h-screen': 'height',
		'max-w-screen': 'max-width',
		'min-w-screen': 'min-width',
		'max-h-screen': 'max-height',
		'min-h-screen': 'min-height',
	}

	// Generate utilities for each property
	Object.entries(props).forEach(([className, cssProperty]) => {
		matchUtilities(
			{
				[className]: value => ({
					[cssProperty]: `${value}${cssProperty.includes('width') ? 'vw' : 'vh'}`,
				}),
			},
			{ values: { ...screenSizes, ...theme('screenSize', {}) } }
		)
	})
})
