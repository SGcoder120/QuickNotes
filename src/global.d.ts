// Allow importing CSS and other static assets as side-effect modules.
// This prevents TypeScript errors like "Cannot find module or type declarations for side-effect import" (ts(2882)).

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.ico';

// If you want stronger types for CSS modules, replace the above with:
// declare module '*.module.css' { const classes: { [key: string]: string }; export default classes }
