import { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Standard page container for consistent mobile viewing experience
 * - Max width: 448px (28rem) - optimal for mobile devices
 * - Centered with auto margins
 * - Full height minus header (48px)
 * - No rounded corners on container
 */
const PageContainer = ({ children, className = '' }: PageContainerProps) => (
  <div className="min-h-screen bg-background flex flex-col">
    <main className={`flex-1 w-full max-w-md mx-auto px-6 ${className}`}>
      {children}
    </main>
  </div>
);

export default PageContainer;
