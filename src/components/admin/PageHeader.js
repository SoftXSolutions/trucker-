const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
