function PageWrapper({ children }) {
  return (
    <div className="animate-fade-in-up">
      {children}
    </div>
  );
}

export default PageWrapper;