module.exports = {
    mount: {
        public: "/",
        src: "/dist"
    },
    plugins: [
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-webpack',
    ],
    devOptions: {
        port: 8080,
        open: "default"
    },
    buildOptions: {
        out: "_build"
    },
    optimize: {
        bundle: true,
        minify: true,
        sourcemap: false
    }
};