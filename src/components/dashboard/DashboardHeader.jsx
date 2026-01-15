import React from 'react';
import { Bell } from 'lucide-react';
import { auth } from '../../services/firebase';

const DashboardHeader = () => {
    const user = auth.currentUser;
    const email = user?.email || 'Traveler';
    const nameDisplay = email.split('@')[0];
    const avatarUrl = `https://ui-avatars.com/api/?name=${nameDisplay}&background=random`;

    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Where to next, {nameDisplay}?</h1>
                <p className="text-gray-500 mt-1">Plan your next adventure with AI-powered precision and safety.</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-sm border border-gray-100 transition-colors">
                    <Bell size={20} />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-sm border border-gray-100 transition-colors">
                    <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
