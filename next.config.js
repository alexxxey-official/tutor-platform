// next.config.js
/**
 * Next.js configuration with rewrites to preserve legacy lesson URLs.
 * Legacy URLs (ending with .html) are redirected to the new React pages
 * under /lessons/<subject>/<lesson> while keeping the original path
 * visible to the user (permanent redirect).
 */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/legacy-lessons/english/english_passive_voice.html',
        destination: '/lessons/english/passive-voice',
      },
      // Add more rewrites for other legacy lessons if needed
    ];
  },
  // Optional: enable strict mode and future Webpack features
  reactStrictMode: true,
  swcMinify: true,
};
