import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * NotFoundPage — 404 fallback page.
 */
const NotFoundPage = () => {
  return (
    <PageWrapper className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
      <div className="text-7xl md:text-8xl font-black tracking-widest text-fifa-border">
        404
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-fifa-muted max-w-sm">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
      </div>
      <Link
        to="/"
        className="btn-primary mt-4 flex items-center justify-center gap-2 text-sm font-bold"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
    </PageWrapper>
  );
};

export default NotFoundPage;
