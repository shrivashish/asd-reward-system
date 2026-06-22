module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Target legacy WebKit (iPad 2 / iOS 9 Safari) and old Chrome.
        // This forces down-compilation of optional chaining, nullish
        // coalescing, async/await, etc., which otherwise crash these engines.
        targets: { safari: '9', ios: '9', chrome: '63' },
        // Inject only the core-js polyfills actually used by the code.
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
