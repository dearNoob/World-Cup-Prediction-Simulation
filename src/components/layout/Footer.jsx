/**
 * Footer — Common footer component displaying tournament dates and disclaimer.
 */
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-fifa-border/60 bg-fifa-dark/50 py-6 text-center select-none text-xs text-fifa-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-gray-400">FIFA World Cup 2026</span>
          <span className="mx-2">|</span>
          <span>June 11 – July 19, 2026</span>
        </div>
        <div className="max-w-md text-center sm:text-right text-[10px] leading-relaxed">
          This application is a fan-made predictor simulation and is not affiliated with, endorsed by, or associated with FIFA or any official soccer federations.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
