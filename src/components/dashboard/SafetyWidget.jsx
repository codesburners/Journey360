import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SafetyWidget = () => {
    return (
        <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
            {/* Background decoration */}
            <ShieldCheck className="absolute -right-6 -bottom-6 text-blue-500/30 w-40 h-40 transform rotate-12" />

            <div className="relative z-10 max-w-lg">
                <h3 className="text-xl font-bold mb-2">Safety First Guarantee</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                    Our AI cross-references global travel advisories in real-time to ensure your adventure is as safe as it is exciting.
                </p>
            </div>
        </div>
    );
};

export default SafetyWidget;
