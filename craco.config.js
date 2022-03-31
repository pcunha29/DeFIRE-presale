const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: {
            //   "@primary-color": "#2D3266",
            //   "@text-color": "#ecf4ff",
            // },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
