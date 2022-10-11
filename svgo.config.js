module.exports = {
    plugins: [
        {
          name: 'removeTitle',
          active: true,
        },
        {
          name: 'convertColors',
          active: true,
        },
        {
          name: 'convertPathData',
          active: true,
        },
        {
          name: 'removeComments',
          active: true,
        },
        {
          name: 'removeDesc',
          active: true,
        },
        {
          name: 'removeUselessDefs',
          active: true,
        },
        {
          name: 'removeEmptyAttrs',
          active: true,
        },
        {
          name: 'removeHiddenElems',
          active: true,
        },
        {
          name: 'removeEmptyText',
          active: true,
        },
        {
          name: 'removeUselessStrokeAndFill',
          active: true,
        },
        {
          name: 'moveElemsAttrsToGroup',
          active: true,
        },
        {
          name: 'removeStyleElement',
          active: true,
        },
        {
          name: 'cleanupEnableBackground',
          active: true,
        },
        {
          name: 'removeAttrs',
          params: { attrs: '(stroke|fill|filter)'},
        },
      ],
}