/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add a resolve alias for the module with incorrect case
        config.resolve.alias["@tsparticles/React"] = "@tsparticles/react";

        // Add module resolution configuration
        if (!config.resolve.fallback) {
            config.resolve.fallback = {};
        }

        // Make the resolver case-insensitive
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            {
                apply: (resolver) => {
                    resolver.hooks.resolve.tapAsync(
                        "CaseInsensitiveResolver",
                        (request, resolveContext, callback) => {
                            if (
                                request.request &&
                                request.request.includes("@tsparticles/React")
                            ) {
                                const newRequest = Object.assign({}, request, {
                                    request: request.request.replace(
                                        "@tsparticles/React",
                                        "@tsparticles/react"
                                    ),
                                });
                                resolver.doResolve(
                                    resolver.hooks.resolve,
                                    newRequest,
                                    null,
                                    resolveContext,
                                    callback
                                );
                            } else {
                                callback();
                            }
                        }
                    );
                },
            },
        ];

        return config;
    },
    // Add transpilation for tsparticles packages
    transpilePackages: [
        "@tsparticles/react",
        "@tsparticles/engine",
        "@tsparticles/slim",
    ],

    // Add image domains configuration
    images: {
        domains: ["img.clerk.com", "images.clerk.dev"],
    },
};

module.exports = nextConfig;
