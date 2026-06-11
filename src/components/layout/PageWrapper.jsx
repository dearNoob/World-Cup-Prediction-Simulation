/**
 * PageWrapper — Standard layout container wrapping page content.
 * Applies responsive spacing and entry transition animations.
 *
 * @param {React.ReactNode} children  - Page contents
 * @param {string}          className - Extra style classes
 */
const PageWrapper = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 w-full px-4 sm:px-6 lg:px-10 py-8 md:py-10 animate-slide-up ${className}`}>
      {children}
    </main>
  );
};

export default PageWrapper;
