const StatCard = ({ title, value, subtitle, icon, iconBg, trend }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}>
                    {icon}
                </div>
            </div>
            {(subtitle || trend) && (
                <div className="flex items-center gap-2">
                    {trend && (
                        <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {trend.value}
                        </span>
                    )}
                    {subtitle && <span className="text-sm text-gray-600">{subtitle}</span>}
                </div>
            )}
        </div>
    );
};

export default StatCard;
