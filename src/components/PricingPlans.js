import Button from './Button';

const PricingPlans = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$99',
            period: '/month',
            features: [
                'Up to 20 leads per month',
                'Basic lead filtering',
                'Chat support with customers',
                'Email notifications',
                'Business profile listing',
            ],
            buttonText: 'Get Started',
            buttonVariant: 'secondary',
            popular: false,
        },
        {
            name: 'Professional',
            price: '$249',
            period: '/month',
            features: [
                'Up to 75 leads per month',
                'Advanced lead filtering',
                'Priority chat support',
                'SMS & email notifications',
                'Featured profile placement',
                'Analytics dashboard',
            ],
            buttonText: 'Get Started',
            buttonVariant: 'primary',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: '$599',
            period: '/month',
            features: [
                'limited leads',
                'Custom lead preferences',
                'Dedicated account manager',
                'All notification channels',
                'Top profile placement',
                'Advanced analytics & reporting',
                'API access',
            ],
            buttonText: 'Contact Sales',
            buttonVariant: 'secondary',
            popular: false,
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
            <div className="container mx-auto px-4">

                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto mt-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                                    <span className="text-gray-500 ml-2">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.popular ? 'blue' : plan.buttonVariant}
                                className="w-full"
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>

                
            </div>
        </section>
    );
};

export default PricingPlans;
